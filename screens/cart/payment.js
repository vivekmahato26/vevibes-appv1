import React from 'react';

import {
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  ImageBackground,
  Image,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';
import { Divider, Button, Snackbar, TextInput,Modal, Portal, Provider ,ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fa from 'react-native-vector-icons/FontAwesome5';
import { CheckBox } from 'react-native-elements';

import { Modalize } from 'react-native-modalize';

import LinearGradient from 'react-native-linear-gradient';

import Auth from "../../constants/context/auth";
import cartContext from "../../constants/context/cartContext";
import UserContext from '../../constants/context/userContext';
import { client, GET_CARDS, CHECKOUT, CREATE_ORDER } from "../../constants/graphql";

import stripe from 'tipsi-stripe'

import { createShipment, createLable } from "../../constants/shipengine";

import { STRIPE_KEY } from "@env";

stripe.setOptions({
  publishableKey: STRIPE_KEY,
  androidPayMode: 'test', // Android only
})

const { width, height } = Dimensions.get('window');
import theme from '../../constants/theme';
const { COLORS, FONTS, SIZES } = theme;

import PushNotification from "react-native-push-notification";

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
  const deliveryOption = route.params.deliveryOption;
  const address = route.params.address;
  const [checked, setChecked] = React.useState(-1);
  const [payment, setPayment] = React.useState({
    type: "", details: {
      brand: "",
      id: "",
      name: "",
      number: "",
      expires: ""
    }
  });
  const [visible, setVisible] = React.useState(false);
  const [clientSecret, setClientSecret] = React.useState();
  const [error, setError] = React.useState({ status: false, message: "" });

  const { token } = React.useContext(Auth);
  const [cards, setCards] = React.useState([]);
  const getCards = async () => {
    client.setHeader('authorization', `Bearer ${token}`);
    const cards = await client.request(GET_CARDS);
    setCards(cards.getCards.res);
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
  const [loading,setLoading] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20,height: '100%'};

  const paymetnOptions = async (type, index) => {
    if (index === undefined) {
      setChecked(type);
      setPayment(prev => ({ type: type }))
    } else {
      setChecked(index);
      setPayment(prev => ({ type: type, details: cards[index] }))
      client.setHeader('authorization', `Bearer ${token}`);
      var args = {
        amount: Math.ceil(grandTotal * 100),
        currency: "GBP",
        paymentMethod: ["card"],
        description: "Payment for purchase made on  Vevibes"
      }
      const data = await client.request(CHECKOUT, args);
      setClientSecret(data.checkout);
    }
  }

  const createOrder = async (lable, shipmentArr, paymentIntentId) => {
    var tempShipment = [];
    for (var i = 0; i < shipmentArr.length; i++) {
      tempShipment.push({
        shipment_id: shipmentArr[i].shipment_id,
        carrier_id: shipmentArr[i].carrier_id,
        service_code: shipmentArr[i].service_code,
        ship_date: shipmentArr[i].ship_date,
        created_at: shipmentArr[i].created_at,
        modified_at: shipmentArr[i].modified_at,
        shipment_status: shipmentArr[i].shipment_status,
      });
    }
    var tempLable = [];
    for (var i = 0; i < lable.length; i++) {
      tempLable.push({
        label_id: lable[i].label_id,
        status: lable[i].status,
        ship_date: lable[i].ship_date,
        created_at: lable[i].created_at,
        shipment_cost: {
          currency: lable[i].shipment_cost.currency,
          amount: lable[i].shipment_cost.amount
        },
        tracking_number: lable[i].tracking_number,
        is_return_label: lable[i].is_return_label,
        voided: lable[i].voided,
        trackable: lable[i].trackable,
        carrier_code: lable[i].carrier_code,
        tracking_status: lable[i].tracking_status,
        pdf: lable[i].label_download.pdf,
        png: lable[i].label_download.png,
        charge_event: lable[i].charge_event
      })
    }
    const tempCart = [];
    for (let i = 0; i < cart.length; i++) {
      tempCart.push({ product: cart[i].product.id, quantity: cart[i].quantity })
    }
    const order = {
      cart: tempCart,
      lable: tempLable,
      shipment: tempShipment,
      payment: paymentIntentId,
      coupon: couponCode,
      cartValue: grandTotal,
      address: address.id,
      status: {
        updatedAt: new Date(),
        status: "Order Placed",
        statusCode: "01"
      },
      paymentStatus: "Paid"
    };
    const orderRequest = await client.request(CREATE_ORDER, { input: order });
    const orderId = orderRequest.createOrder;
    setLoading(false);
    navigation.navigate("Sucess",{screen: "Sucess",orderId: orderId});
  }


  const shipProduct = async (paymentIntentId) => {
    var weight = 0;
    for (var i = 0; i < cart.length; i++) {
      weight += parseFloat(cart[i].weightKG)
    }
    const shipment = await createShipment(address, weight, deliveryOption.serviceCode);
    const shipmentArr = shipment.shipments;
    const lable = []
    for (var i = 0; i < shipmentArr.length; i++) {
      const temp = await createLable(shipmentArr[i].shipment_id);
      lable.push(temp);
    }
    createOrder(lable, shipmentArr, paymentIntentId);
  }

  const handlePayment = async () => {
    setLoading(true);
    if (checked === -1) {
      onToggleSnackBar();
      return;
    }
    let pay;
    switch (payment.type) {
      case "card": if (cvc === undefined || cvc === "") {
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
          });
          console.log(confirmPaymentIntent);
          if (confirmPaymentIntent.status === "succeeded") {
            shipProduct(confirmPaymentIntent.paymentIntentId);
          } else {
            navigation.navigate("Failure");
          }
        } catch (e) {
          console.log(e);
          setError({ status: true, message: e.message })
          return;
        }
        break;
      case "google": pay = payment;
        const options = {
          total_price: grandTotal.toString(),
          currency_code: 'GBP',
          shipping_address_required: false,
          billing_address_required: true,
          shipping_countries: ["GB"],
          line_items: [{
            currency_code: 'GBP',
            description: `Payment for purchase made on  Vevibes`,
            total_price: grandTotal.toString(),
            unit_price: total.toString(),
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
        break;
      case 'bank': const params = {
        // mandatory
        accountNumber: '000123456789',
        countryCode: 'us',
        currency: 'usd',
        // optional
        routingNumber: '110000000', // 9 digits
        accountHolderName: 'Test holder name',
        accountHolderType: 'company', // "company" or "individual"
      }

        const token = await stripe.createTokenWithBankAccount(params)
        break;
    }
  }
  return (
    <Provider>
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
                  <TouchableWithoutFeedback onPress={() => { modalizeRef.current.open(); paymetnOptions('card', index); }}>

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
                  </TouchableWithoutFeedback>
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
            {Platform.OS === "ios" &&
              <TouchableWithoutFeedback onPress={() => paymetnOptions('apple')}>
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
              </TouchableWithoutFeedback>
            }
            {Platform.OS === "android" &&
              <TouchableWithoutFeedback onPress={() => paymetnOptions('google')}>
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
                </View>
              </TouchableWithoutFeedback>
            }
          </View>
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
            £{deliveryOption.rate}
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
            {payment.details && <View style={{ padding: 15 }}>
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
            </View>}
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
      <Portal>
        <Modal visible={loading} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <ActivityIndicator animating={true} color={COLORS.primary} size={45}/>
        </Modal>
      </Portal>
    </View>
    </Provider>
  );
}
