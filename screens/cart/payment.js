import React from 'react';

import {
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import { Divider, Button, Snackbar, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fa from 'react-native-vector-icons/FontAwesome5';
import { CheckBox } from 'react-native-elements';

import { Modalize } from 'react-native-modalize';

import LinearGradient from 'react-native-linear-gradient';

import Auth from "../../constants/context/auth";
import cartContext from "../../constants/context/cartContext";
import UserContext from '../../constants/context/userContext';
import { client, GET_CARDS, CHECKOUT } from "../../constants/graphql";

import stripe from 'tipsi-stripe'

import Axios from "axios";

import {SHIP_ENGINE,STRIPE_KEY} from "@env";

stripe.setOptions({
  publishableKey: STRIPE_KEY,
  androidPayMode: 'test', // Android only
})

const { width, height } = Dimensions.get('window');
import theme from '../../constants/theme';
const { COLORS, FONTS, SIZES } = theme;

import { useIsFocused } from "@react-navigation/native";

export default function Payment({ navigation, route }) {
  const isFocused = useIsFocused();
  const modalizeRef = React.createRef();
  const couponCode = route.params.couponCode;
  const { cart } = React.useContext(cartContext);
  const { user } = React.useContext(UserContext);
  const discount = route.params.discount;
  const total = route.params.total;
  const grandTotal = route.params.grandTotal;
  const deliveryPrice = route.params.deliveryPrice;
  const address = route.params.address;
  const [checked, setChecked] = React.useState(-1);
  const [payment, setPayment] = React.useState({ type: "", details: {} });
  const [visible, setVisible] = React.useState(false);
  const [clientSecret, setClientSecret] = React.useState();
  const [error, setError] = React.useState({ status: false, message: "" });

  const { token } = React.useContext(Auth);
  const [cards, setCards] = React.useState([]);
  const getCards = async () => {
    client.setHeader('authorization', `Bearer ${token}`);
    const cards = await client.request(GET_CARDS);
    setCards(cards.getCards);
    setPayment(prev => ({ type: "card", details: cards.getCards[0] }))
  }
  React.useEffect(() => {
    if (isFocused) {
      getCards();
    }
  }, [isFocused]);

  const originAddr = {
    name: "Vevibes",
    company_name: "Vevibes Ltd.",
    phone: "+44 7535 675120",
    address_line1: "197 Cooksey Lane",
    city_locality: "Birmingham",
    state_province: "West Midlands",
    postal_code: "B449QX",
    country_code: "GB",
    address_residential_indicator: "no"
  }

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const [cvc, setCvc] = React.useState("");
  const [cvcErr, setCvcErr] = React.useState(false);

  const paymetnOptions = async (type, index) => {
    if (index === undefined) {
      setChecked(type);
      setPayment(prev => ({ type: type }))
    } else {
      setChecked(index);
      setPayment(prev => ({ type: type, details: cards[index] }))
      client.setHeader('authorization', `Bearer ${token}`);
      var args = {
        amount: grandTotal,
        currency: "GBP",
        paymentMethod: ["card"]
      }
      const data = await client.request(CHECKOUT, args);
      setClientSecret(data.checkout);
    }
  }


  const shipProduct = async (paymentIntentId) => {
    var weight = 0;
    for(var i = 0; i < cart.length; i++) {
      weight += parseFloat(cart[i].weightKG)
    }
    const temp = "yes";
    if (address.type === "Office") {
      temp = "no";
    }
    const body = {
      shipment: {
        service_code: "ups_ground",
        ship_to: {
          name: address.name,
          address_line1: address.line1,
          city_locality: address.city,
          state_province: address.state,
          postal_code: address.pin,
          country_code: address.countryCode,
          address_residential_indicator: temp
        },
        ship_from: {
          name: originAddr.name,
          company_name: originAddr.company_name,
          phone: originAddr.phone,
          address_line1: originAddr.address_line1,
          city_locality: originAddr.city_locality,
          state_province: originAddr.state_province,
          postal_code: originAddr.postal_code,
          country_code: originAddr.country_code,
          address_residential_indicator: originAddr.address_residential_indicator,
        },
        packages: [
          {
            weight: {
              value: weight,
              unit: "kilogram"
            }
          }
        ]
      }
    }

    const shipmentUrl = "https://api.shipengine.com/v1/shipments";
    const apikey = SHIP_ENGINE;
    try {
      // fetch data from a url endpoint
      const response = await Axios.post(shipmentUrl,JSON.stringify(body),{"API-Key" : apikey})
      const data = await response.json();
      const lableUrl = `https://api.shipengine.com/v1/labels/shipment/${data.shipments.shipment_id}`;
      const responseLable = await Axios.post(shipmentUrl,{"API-Key" : apikey});
      const lableData = await responseLable.json();

    } catch (error) {
      console.log(error.message); // catches both errors
    }
  }

  const handlePayment = async () => {
    if (checked === -1) {
      onToggleSnackBar();
      return;
    }
    let pay;
    if (payment.type === 'card') {
      if (cvc === undefined || cvc === "") {
        setCvcErr(true);
        return;
      } else {
        modalizeRef.current.close();
      }
      pay = payment.details
      try {
        const paymentMethod = await stripe.createPaymentMethod({
          card: {

            number: payment.details.number,
            expMonth: parseInt(payment.details.expires.split('/')[0]),
            expYear: parseInt(payment.details.expires.split('/')[1]),
            cvc: cvc,
          },
          billingDetails: {
            address: {
              city: address.city,
              country: address.countryCode,
              line1: address.line1,
              line2: address.line2,
              postalCode: address.pin,
              state: address.state,
            },
            email: user.email,
            name: user.name,
            phone: user.phone,
          },
        })
        const confirmPaymentIntent = await stripe.confirmPaymentIntent({
          clientSecret: clientSecret,
          paymentMethodId: paymentMethod.id
        })
        if (confirmPaymentIntent.status === "succeeded") {
          navigation.navigate("Sucess");
          shipProduct(confirmPaymentIntent.paymentIntentId);
        } else {
          navigation.navigate("Failure");
        }
      } catch (e) {
        setError({ status: true, message: e.message })
        return;
      }
    } else {
      pay = payment;
      const options = {
        total_price: grandTotal,
        currency_code: 'INR',
        shipping_address_required: false,
        billing_address_required: true,
        shipping_countries: ["GB"],
        line_items: [{
          currency_code: 'INR',
          description: `Payment for cart `,
          total_price: grandTotal,
          unit_price: total,
          quantity: '1',
        }],
      }

      try {
        const token = await stripe.paymentRequestWithAndroidPay(options);
        console.log(token);
        stripe.completeNativePayRequest();
      }
      catch (err) {
        console.log(err.message);
      }
    }


  }
  return (
    <View style={{ margin: 10, flex: 1 }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name="chevron-left"
              style={{
                ...FONTS.body1,
                color: COLORS.primary,
                fontWeight: 'bold',
              }}
              onPress={() => navigation.goBack()}
            />
            <Text
              style={{
                ...FONTS.body5,
                color: COLORS.primary,
                fontWeight: 'bold',
              }}>
              Payment Details
            </Text>
          </View>
          <Icon
            name="plus"
            style={{
              ...FONTS.body2,
              color: COLORS.white,
              fontWeight: 'bold',
              backgroundColor: COLORS.secondary,
              borderRadius: 10,
              paddingLeft: 10,
              paddingRight: 10,
            }}
            onPress={() => navigation.navigate('AddCard')}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            ...FONTS.body5,
            color: COLORS.primary,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Choose Payment Method
        </Text>
        <ScrollView>
          {cards.length !== 0 && <FlatList
            horizontal
            data={cards}
            keyExtractor={(item, index) => 'key' + index}
            decelerationRate={'normal'}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => {
              let bg = 'https://res.cloudinary.com/vevibes/image/upload/v1625114373/App%20Assets/Asset_8_czmfre.png';
              if (index % 2 === 0) {
                bg = 'https://res.cloudinary.com/vevibes/image/upload/v1625114756/App%20Assets/Asset_9_uulkmh.png'
              }
              if (index % 3 === 0) {
                bg = 'https://res.cloudinary.com/vevibes/image/upload/v1625114756/App%20Assets/Asset_10_vzmefn.png'
              }
              return (
                <ImageBackground
                  source={{
                    uri: bg,
                  }}
                  style={{
                    width: width / 2.6,
                    height: 220,
                    margin: 10,
                    resizeMode: 'cover',
                  }}
                  resizeMode="contain"
                >
                  <View
                    style={{
                      width: width / 2.5,
                      height: 220,
                      backgroundColor: 'transparent',
                      borderRadius: 10,
                    }}>
                    <CheckBox
                      right
                      checkedIcon={
                        <Icon
                          name="record-circle-outline"
                          style={{ ...FONTS.body2, color: COLORS.white }}
                        />
                      }
                      iconType="material"
                      uncheckedIcon={
                        <Icon
                          name="circle-outline"
                          style={{ ...FONTS.body2, color: COLORS.white }}
                        />
                      }
                      checked={checked === index}
                      onPress={() => { modalizeRef.current.open(); paymetnOptions('card', index); }}
                    />
                    <View style={{ marginTop: 0, margin: 15 }}>
                      <Fa name={`cc-${item.brand}`} style={{ fontSize: 40, color: COLORS.white }} />
                      <Text
                        style={{
                          ...FONTS.body3,
                          color: COLORS.white,
                          fontWeight: 'bold',
                          marginTop: 10,
                        }}>
                        {item.number.replace(/\w(?=\w{4})/g, "*")}
                      </Text>
                      <Text
                        style={{
                          ...FONTS.body2,
                          fontWeight: 'bold',
                          marginTop: 20,
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          ...FONTS.body4,
                          color: COLORS.white,
                        }}>
                        Expires {item.expires}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              );
            }}
          />}
          <View
            style={{
              width: width,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBox
                start
                checkedIcon={
                  <Icon
                    name="record-circle-outline"
                    style={{ ...FONTS.body2, color: COLORS.secondary }}
                  />
                }
                iconType="material"
                uncheckedIcon={
                  <Icon
                    name="circle-outline"
                    style={{ ...FONTS.body2, color: COLORS.gray }}
                  />
                }
                checked={checked === 'apple'}
                onPress={() => paymetnOptions('apple')}
                containerStyle={{ margin: 0, padding: 0 }}
              />
              <Fa name="apple-pay" style={{ fontSize: 50, color: COLORS.apple }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

              <CheckBox
                start
                checkedIcon={
                  <Icon
                    name="record-circle-outline"
                    style={{ ...FONTS.body2, color: COLORS.secondary }}
                  />
                }
                iconType="material"
                uncheckedIcon={
                  <Icon
                    name="circle-outline"
                    style={{ ...FONTS.body2, color: COLORS.gray }}
                  />
                }
                checked={checked === 'google'}
                onPress={() => paymetnOptions('google')}
                containerStyle={{ margin: 0, padding: 0 }}
              />
              <Image source={{ uri: "https://res.cloudinary.com/vevibes/image/upload/v1626859350/App%20Assets/google-pay-gpay-logo_i63odz.png" }}
                resizeMode="contain"
                style={{ width: 100, height: 40 }}
              />
            </View></View>
        </ScrollView>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{ ...FONTS.body5, color: COLORS.lightGray }}>
            Delivery Fees
          </Text>
          <Text
            style={{ ...FONTS.body5, color: COLORS.primary, fontWeight: 'bold' }}>
            £{deliveryPrice}
          </Text>
        </View>
        <Divider
          style={{
            backgroundColor: COLORS.lightGray,
            marginBottom: 10,
            marginTop: 10,
            height: 2,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{ ...FONTS.body5, color: COLORS.lightGray }}>
            Discount
          </Text>
          <Text
            style={{ ...FONTS.body5, color: COLORS.primary, fontWeight: 'bold' }}>
            £{discount}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{ ...FONTS.body5, color: COLORS.lightGray }}>
            Total Price
          </Text>
          <Text
            style={{ ...FONTS.body5, color: COLORS.primary, fontWeight: 'bold' }}>
            £{total}
          </Text>
        </View>
        <Divider
          style={{
            backgroundColor: COLORS.lightGray,
            marginBottom: 10,
            marginTop: 10,
            height: 2,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{ ...FONTS.body5, color: COLORS.primary }}>
            Grand Total
          </Text>
          <Text
            style={{
              ...FONTS.body5,
              color: COLORS.secondary,
              fontWeight: 'bold',
            }}>
            £{grandTotal}
          </Text>
        </View>
        <Button
          mode="flat"
          style={{
            backgroundColor: COLORS.secondary,
            padding: 10,
            marginTop: 20,
            borderRadius: 10,
          }}
          onPress={handlePayment}>
          <Text
            style={{ ...FONTS.body5, color: COLORS.white, fontWeight: 'bold' }}>
            Confirm Order
          </Text>
        </Button>
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={1000}
          action={{
            label: 'OK',
            onPress: () => {
              // Do something
            },
          }}
          theme={{
            colors: { accent: COLORS.white, onSurface: COLORS.error }
          }}
        >
          <Text style={{
            ...FONTS.h3,
            color: COLORS.white,
            backgroundColor: "transparent"
          }}>
            Please select a payment method!
          </Text>
        </Snackbar>
        <Snackbar
          visible={error.status}
          onDismiss={onDismissSnackBar}
          duration={1000}
          action={{
            label: 'OK',
            onPress: () => {
              setError({ status: false, message: "" })
            },
          }}
          theme={{
            colors: { accent: COLORS.white, onSurface: COLORS.error }
          }}
        >
          <Text style={{
            ...FONTS.h3,
            color: COLORS.white,
            backgroundColor: "transparent"
          }}>
            {error.message}
          </Text>
        </Snackbar>
      </View>
      {cards.length !== 0 && <Modalize ref={modalizeRef} modalHeight={400}>
        {payment.type === "card" && <View style={{ justifyContent: "center", alignItems: 'center', marginTop: 20 }}>
          <Text style={{ ...FONTS.body2, color: COLORS.primary, fontWeight: 'bold' }}>Please Verify your card</Text>
          <LinearGradient
            colors={["#0B8989", "#5AE0E0", "#0B8989"]}

            style={{
              width: width - 100,
              height: 180,
              margin: 10,
              borderRadius: 15,
            }}
          >
            <Image source={{ uri: "https://res.cloudinary.com/vevibes/image/upload/s--C45FDMP7--/v1626955223/App%20Assets/Asset_26_spyjqk.png" }}
              style={{
                width: width - 20,
                height: 180,
                resizeMode: 'cover',
                opacity: 0.1,
                position: 'absolute',
              }}
              resizeMode="cover"
            />
            <View style={{ padding: 15 }}>
              <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                <Fa name={`cc-${payment.details.brand}`} style={{ textAlign: "left", ...FONTS.body1, color: COLORS.white }} />
              </View>
              <Text style={{ ...FONTS.body3, color: COLORS.white }}>Card Number</Text>
              <Text style={{ ...FONTS.body2, color: COLORS.gray, fontWeight: 'bold' }}>{payment.details.number.replace(/\w(?=\w{4})/g, "*")}</Text>
              <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                <View>
                  <Text style={{ ...FONTS.body3, color: COLORS.white }}>Name</Text>
                  <Text style={{ ...FONTS.body3, color: COLORS.gray, fontWeight: 'bold' }}>{payment.details.name}</Text>
                </View>
                <View>
                  <Text style={{ ...FONTS.body3, color: COLORS.white }}>Expiry</Text>
                  <Text style={{ ...FONTS.body3, color: COLORS.gray, fontWeight: 'bold' }}>{payment.details.expires}</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
          <TextInput name="cvc" label="CVC*" mode="outlined" error={cvcErr} style={{ width: width - 100 }} maxLength={4} keyboardType="number-pad" onChangeText={text => setCvc(text)} />
          <Button
            mode="flat"
            style={{
              backgroundColor: COLORS.secondary,
              padding: 10,
              marginTop: 20,
              borderRadius: 10,
            }}
            onPress={handlePayment}>
            <Text
              style={{ ...FONTS.body5, color: COLORS.white, fontWeight: 'bold' }}>
              Proceed
            </Text>
          </Button>
        </View>}
      </Modalize>}
    </View>
  );
}
