import React from 'react';

import {
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';
import { TextInput, Divider, Button } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Modalize } from 'react-native-modalize';
import DatePicker from 'react-native-date-picker';
import moment from "moment";

import UserContext from '../../constants/context/userContext';
import { GET_ADDRESS, client } from '../../constants/graphql';
import Auth from '../../constants/context/auth';

import Axios from "axios";
import _ from "lodash";

const { width, height } = Dimensions.get('window');
import theme from '../../constants/theme';
import { Image } from 'react-native-elements/dist/image/Image';
const { COLORS, FONTS, SIZES } = theme;

import { useIsFocused } from "@react-navigation/native";

import { getRateEstimates } from "../../constants/shipengine";

export default function Checkout({ navigation, route }) {
  const isFocused = useIsFocused();
  const { user } = React.useContext(UserContext);
  const { token } = React.useContext(Auth);
  const couponCode = route.params.couponCode;
  const cart = route.params.cart;
  const discount = route.params.discount;
  const total = route.params.total;
  const grandTotal = route.params.grandTotal;
  const [minDelivery, setMinDelivery] = React.useState({
    rate: "",
    estimatedDelivery: "",
    serviceCode: ""
  });
  const [addresses, setAddresses] = React.useState(user.address);
  const [address, setAddress] = React.useState(route.params.address);
  const day = moment().format("dddd");
  const formattedDate = moment().format("LL");
  const [date, setDate] = React.useState(`${day}, ${formattedDate}`);
  const [collection, setCollection] = React.useState(false);
  const [delivery, setDelivery] = React.useState(true);
  const addressRef = React.useRef(null);
  const dateRef = React.useRef(null);
  const [checked, setChecked] = React.useState(-1);
  const todayMoment = moment().format("L");
  const maxMoment = moment().add(60, 'days').calendar();
  const today = new Date(todayMoment);
  const maxDate = new Date(maxMoment);
  const [disabled, setDisabled] = React.useState(true);
  const [deliveryOptions, setDeliveryOptions] = React.useState([{
    rate: 0,
    estimatedDelivery: "",
    serviceCode: ""
  }]);
  const [cartValue, setCartValue] = React.useState(grandTotal);

  const getAddress = async () => {
    client.setHeader('authorization', `Bearer ${token}`);
    const address = await client.request(GET_ADDRESS);
    const addressData = address.getAddress.res;
    setAddresses(addressData);
    return;
  }

  const getRate = async () => {
    let weight = 0;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product.weightKG) {
        weight += cart[i].product.weightKG;
      }
    }
    const rates = await getRateEstimates(address, weight);
    const temp = [];
    rates.map(async (r, index) => {
      var rate = r.shipping_amount.amount;
      const url = `https://api.exchangerate.host/convert?from=USD&to=GBP&amount=${rate}`;
      const convertedRateData = await Axios.get(url);
      const convertedRate = convertedRateData.data.result;
      temp.push({
        rate: parseFloat(convertedRate.toFixed(2)),
        estimatedDelivery: r.carrier_delivery_days,
        serviceCode: r.service_code,
      })
      const min = _.minBy(temp, function (o) { return o.rate; });
      setCartValue(parseFloat((parseFloat(grandTotal) + min.rate).toFixed(2)))
      setMinDelivery(min);
      if(total >= 65) {
        setMinDelivery({rate: 0,
          estimatedDelivery: min.estimatedDelivery,
          serviceCode: min.serviceCode});
          setCartValue(grandTotal)
      }
    })
    setDeliveryOptions(temp);
    setDisabled(false);
  }

  React.useEffect(() => {
    getAddress();
    getRate();
  }, [isFocused])

  const dummyAddress = {
    name: "",
    pin: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    mobile: "",
    type: "",
    countryCode: "",
    country: ""
  }

  const handleAddressToggle = (arg) => {
    setChecked(arg);
    setAddress(addresses[arg]);
  }

  const handleDateChange = (arg) => {
    const day = moment(arg).format("dddd");
    const formattedDate = moment(arg).format("LL");
    setDate(`${day}, ${formattedDate}`);
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon
          name="chevron-left"
          style={{ ...FONTS.body1, color: COLORS.primary, fontWeight: 'bold' }}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{ ...FONTS.body5, color: COLORS.primary, fontWeight: 'bold' }}>
          Checkout Details
        </Text>
      </View>
      <ScrollView style={{ marginTop: 20 }}>
        <View
          style={{ borderBottomWidth: 2, borderBottomColor: COLORS.lightGray }}>
          <Text style={{ ...FONTS.body3, color: COLORS.lightGray }}>
            Delivery Date
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                ...FONTS.body5,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginTop: 10,
              }}>
              {date}
            </Text>
            <Icon
              name="chevron-right"
              style={{ ...FONTS.body2, color: COLORS.primary }}
              onPress={() => dateRef.current.open()}
            />
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: COLORS.lightGray,
            marginTop: 15,
          }}>
          <Text style={{ ...FONTS.body3, color: COLORS.lightGray }}>
            Delivery Address
          </Text>
          <Text
            style={{
              ...FONTS.body5,
              color: COLORS.primary,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            {address.type}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                ...FONTS.body5,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginTop: 10,
              }}>
              {address.line1}, {address.line2}
            </Text>
            <Icon
              name="chevron-right"
              style={{ ...FONTS.body2, color: COLORS.primary }}
              onPress={() => addressRef.current.open()}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            width: width - 20,
            marginTop: 15,
            justifyContent: 'center',
          }}>
          <TouchableWithoutFeedback onPress={() => {
            if (delivery) {
              setDelivery(false);
            }
            setCollection(true);
            return;
          }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: COLORS.white,
                borderColor: COLORS.gray,
                borderRadius: 10,
                width: width / 2 - 25,
                justifyContent: 'space-between',
                borderWidth: 2,
                marginRight: 10,
              }}>
              <Text style={{ ...FONTS.body3, color: COLORS.gray, marginLeft: 10 }}>
                Collection
              </Text>
              <CheckBox
                checkedIcon={
                  <Icon
                    name="record-circle-outline"
                    style={{ ...FONTS.body2, color: COLORS.secondary }}
                  />
                }
                iconRight={true}
                iconType="material"
                uncheckedIcon={
                  <Icon
                    name="circle-outline"
                    style={{ ...FONTS.body2, color: COLORS.gray }}
                  />
                }
                checked={collection}
                onPress={() => {
                  if (delivery) {
                    setDelivery(false);
                  }
                  setCollection(true);
                  return;
                }}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {
            if (collection) {
              setCollection(false);
            }
            setDelivery(true);
            return;
          }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: COLORS.white,
                borderWidth: 2,
                borderColor: COLORS.gray,
                borderRadius: 10,
                width: width / 2 - 25,
                justifyContent: 'space-between',
              }}>
              <Text style={{ ...FONTS.body3, color: COLORS.gray, marginLeft: 10 }}>
                Delivery
              </Text>
              <CheckBox
                checkedIcon={
                  <Icon
                    name="record-circle-outline"
                    style={{ ...FONTS.body2, color: COLORS.secondary }}
                  />
                }
                iconRight={true}
                iconType="material"
                uncheckedIcon={
                  <Icon
                    name="circle-outline"
                    style={{ ...FONTS.body2, color: COLORS.gray }}
                  />
                }
                checked={delivery}
                onPress={() => {
                  if (collection) {
                    setCollection(false);
                  }
                  setDelivery(true);
                  return;
                }}
              />
            </View></TouchableWithoutFeedback>
        </View>
        {couponCode && <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 20,
            borderColor: COLORS.secondary,
            borderStyle: 'dashed',
            padding: 20,
            borderWidth: 2,
            margin: 10,
            backgroundColor: '#f7f7f7',
          }}>
          <Text style={{ ...FONTS.body5, color: COLORS.primary }}>
            Coupon Code
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ ...FONTS.body5, color: COLORS.secondary }}>
              {couponCode}
            </Text>
            <Icon
              name="check-circle"
              style={{ ...FONTS.body5, color: COLORS.secondary, marginLeft: 5 }}
            />
          </View>
        </View>}
        {total < 65 && <View style={{ marginTop: 10 }}>
          {deliveryOptions && deliveryOptions.map((d) => {
            return (
              <TouchableWithoutFeedback onPress={() =>{ 
                setMinDelivery(d);
                setCartValue(parseFloat((parseFloat(grandTotal) + d.rate).toFixed(2)))
              }} key={d.rate}>
                <View style={{ backgroundColor: "#dedede",flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', padding: 5, borderWidth: 0.5, borderColor: COLORS.gray, marginTop: 5, borderRadius: 5 }}>
                  <Text style={{ ...FONTS.body3, color: COLORS.primary }}>{d.estimatedDelivery}</Text>
                  <Text style={{ ...FONTS.body3, color: COLORS.secondaryDark }}>??{d.rate}</Text>
                </View>
              </TouchableWithoutFeedback>

            )
          })}
        </View>}
      </ScrollView>
      <Modalize modalHeight={300} ref={addressRef}>
        {user.address.length === 0 ? (
          <View style={{ margin: 10 }}>
            <Text
              style={{
                ...FONTS.body2,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginTop: 20,
              }}>
              No address added yet
            </Text>
            <Text
              style={{
                ...FONTS.body5,
                marginTop: 15,
                marginBottom: 20,
                color: COLORS.lightGray,
              }}>
              Please add address and come back
            </Text>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: COLORS.lightGray,
                borderStyle: 'dashed',
                borderRadius: 20,
                height: 150,
              }}>
              <Image
                source={{
                  uri: 'https://res.cloudinary.com/vevibes/image/upload/v1625487955/App%20Assets/Asset_16_m7jkxe.png',
                }}
                style={{ width: 50, height: 80 }}
                resizeMode="contain"
                onPress={() => navigation.navigate('AddAddress')}
              />
            </View>
          </View>
        ) : (
          <View style={{ margin: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Text
                style={{
                  ...FONTS.body2,
                  color: COLORS.primary,
                  fontWeight: 'bold',
                }}>
                Choose Address
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  name="plus"
                  style={{
                    color: COLORS.white,
                    ...FONTS.h2,
                    backgroundColor: COLORS.secondary,
                    borderRadius: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    marginRight: 10,
                  }}
                  onPress={() => navigation.navigate('AddAddress', { screen: "AddAddresses", address: dummyAddress })}
                />
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.body2,
                    backgroundColor: COLORS.secondary,
                    borderRadius: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    marginRight: 10,
                    padding: 2,
                  }}
                  onPress={() => addressRef.current.close()}>
                  Done
                </Text>
              </View>
            </View>
            {addresses.map((item, index) => {
              return (
                <ScrollView
                  key={index + Math.random(index)}
                  style={{
                    width: width - 40,
                    borderStyle: 'solid',
                    borderRadius: 10,
                    borderWidth: 1.5,
                    margin: 10,
                    paddingBottom: 10,
                    backgroundColor: '#ffffff',
                    borderColor: COLORS.lightGray,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'baseline',
                      marginTop: 0,
                      paddingBottom: 10
                    }}>
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
                      checked={checked === index}
                      onPress={() => handleAddressToggle(index)}
                    />
                    <View style={{ width: width - 100 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            ...FONTS.body2,
                            color: COLORS.primary,
                            fontWeight: 'bold',
                          }}>
                          {item.name}
                        </Text>
                      </View>
                      <View>
                        <Text style={{ ...FONTS.body5, color: COLORS.lightGray }}>
                          {item.line1}, {item.line2}
                        </Text>
                        <Text style={{ ...FONTS.body5, color: COLORS.lightGray }}>
                          {item.city} {item.pin},
                        </Text>
                        <Text style={{ ...FONTS.body5, color: COLORS.lightGray }}>
                          {item.country}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={{ ...FONTS.body5, color: COLORS.primary }}>
                            Mobile:{' '}
                          </Text>
                          <Text
                            style={{ ...FONTS.body5, color: COLORS.lightGray }}>
                            {item.mobile}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              );
            })}
          </View>
        )}
      </Modalize>
      <Modalize modalHeight={300} ref={dateRef}>
        <View style={{ margin: 10, marginTop: 20, justifyContent: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <Text
              style={{
                ...FONTS.body2,
                color: COLORS.primary,
                fontWeight: 'bold',
              }}>
              Choose Date &amp; Time
            </Text>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.body2,
                backgroundColor: COLORS.secondary,
                borderRadius: 10,
                paddingLeft: 20,
                paddingRight: 20,
                marginRight: 10,
                padding: 2,
              }}
              onPress={() => dateRef.current.close()}>
              Done
            </Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: 'center' }}>
            <DatePicker
              minimumDate={today}
              maximumDate={maxDate}
              date={today}
              onDateChange={(e) => handleDateChange(e)}
              minuteInterval={10}
              textColor={COLORS.primary}
              dividerHeight={0}
              fadeToColor="none"
              mode="date"
            />
          </View>
        </View>
      </Modalize>
      <View style={{ margin: 10, flex: 0 }}>
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
            ??{minDelivery.rate}
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
            ??{discount}
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
            ??{total}
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
            ??{cartValue}
          </Text>
        </View>
        <Button
          mode="text"
          style={[{
            padding: 10,
            marginTop: 20,
            borderRadius: 10,
            zIndex: -1,
          },disabled ? styles.disabledButton: styles.activeButton]}
          onPress={() => navigation.navigate('Payment', {
            screen: "Payment",
            cart: cart,
            discount: discount,
            total: total,
            grandTotal: cartValue,
            couponCode: couponCode,
            deliveryOption: minDelivery,
            address: address,

          })} 
          disabled={disabled}
          >
          <Text
            style={{ ...FONTS.body5, color: COLORS.white, fontWeight: 'bold' }}>
            Confirm Order
          </Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  disabledButton: {
    backgroundColor: COLORS.lightGray,
  },
  activeButton: {
    backgroundColor: COLORS.secondary
  }
})