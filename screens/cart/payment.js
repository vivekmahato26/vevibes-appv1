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
import { Divider, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fa from 'react-native-vector-icons/FontAwesome5';
import { CheckBox } from 'react-native-elements';

import stripe from 'tipsi-stripe'

stripe.setOptions({
  publishableKey: 'pk_test_51IvlSmSHVA8HGx9rrFmbtDKlYvFSQtx77V579n9br5J9HJpIDCvhPz5dFAicfzksyvsBamEWoLYYarj2R6DoKnRP00mIJMNwOp',
  androidPayMode: 'test', // Android only
})

const { width, height } = Dimensions.get('window');
import theme from '../../constants/theme';
const { COLORS, FONTS, SIZES } = theme;

export default function Payment({ navigation, route }) {
  const couponCode = route.params.couponCode;
  const cart = route.params.cart;
  const discount = route.params.discount;
  const total = route.params.total;
  const grandTotal = route.params.grandTotal;
  const deliveryPrice = route.params.deliveryPrice;
  const address = route.params.address;
  const [checked, setChecked] = React.useState(-1);
  const [payment, setPayment] = React.useState({ type: "", details: {} });
  const data = [
    {
      type: 'cc-visa',
      number: '**** **** **** 3456',
      name: 'Ronnie',
      exp: '05/22',
      bg: 'https://res.cloudinary.com/vevibes/image/upload/v1625114373/App%20Assets/Asset_8_czmfre.png',
    },
    {
      type: 'cc-mastercard',
      number: '**** **** **** 3456',
      name: 'Ronnie',
      exp: '05/22',
      bg: 'https://res.cloudinary.com/vevibes/image/upload/v1625114756/App%20Assets/Asset_9_uulkmh.png',
    },
    {
      type: 'cc-amex',
      number: '**** **** **** 3456',
      name: 'Ronnie',
      exp: '05/22',
      bg: 'https://res.cloudinary.com/vevibes/image/upload/v1625114756/App%20Assets/Asset_10_vzmefn.png',
    },
    {
      type: 'cc-discover',
      number: '**** **** **** 3456',
      name: 'Ronnie',
      exp: '05/22',
      bg: 'https://res.cloudinary.com/vevibes/image/upload/v1625114373/App%20Assets/Asset_8_czmfre.png',
    },
    {
      type: 'cc-visa',
      number: '**** **** **** 3456',
      name: 'Ronnie',
      exp: '05/22',
      bg: 'https://res.cloudinary.com/vevibes/image/upload/v1625114756/App%20Assets/Asset_9_uulkmh.png',
    },
    {
      type: 'cc-visa',
      number: '**** **** **** 3456',
      name: 'Ronnie',
      exp: '05/22',
      bg: 'https://res.cloudinary.com/vevibes/image/upload/v1625114756/App%20Assets/Asset_10_vzmefn.png',
    },
  ];
  const paymetnOptions = (type, index) => {
    if (index === undefined) {
      setChecked(type);
      setPayment(prev => ({ type: type }))
    } else {
      setChecked(index);
      setPayment(prev => ({ type: type, details: data[index] }))
    }
  }

  const handlePayment = async () => {
    try {
      const paymentMethod = await stripe.createPaymentMethod({
        card : {
          number : '4000002500003155',
          cvc : '123',
          expMonth : 11,
          expYear : 2022
        },
        billingDetails: {
          address: {
            city: address.city,
            postalCode: address.zip,
            country: address.countryCode,
            line1: address.street,
            line2: address.locality,
            state: address.state,
          },
          name: address.name,
          phone: address.phone
        }
      })
    } catch (e) {
      console.log(e)
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
          <FlatList
            horizontal
            data={data}
            keyExtractor={(item, index) => 'key' + index}
            decelerationRate={'normal'}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => {
              return (
                <ImageBackground
                  source={{
                    uri: item.bg,
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
                      onPress={() => paymetnOptions('card', index)}
                    />
                    <View style={{ marginTop: '5%', margin: 10 }}>
                      <Image
                        source={{
                          uri: 'https://res.cloudinary.com/vevibes/image/upload/v1625118144/App%20Assets/Asset_11_mn4pea.png',
                        }}
                        style={{
                          width: 80,
                          height: 25,
                        }}
                        resizeMode="contain"
                      />
                      <Text
                        style={{
                          ...FONTS.body3,
                          color: COLORS.white,
                          fontWeight: 'bold',
                          marginTop: 10,
                        }}>
                        {item.number}
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
                        Expires {item.exp}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              );
            }}
          />
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
                checked={checked === 'paypal'}
                onPress={() => paymetnOptions('paypal')}
                containerStyle={{ margin: 0, padding: 0 }}
              />
              <Fa name="cc-paypal" style={{ fontSize: 50, color: COLORS.paypal }} />
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
                checked={checked === 'amazon'}
                onPress={() => paymetnOptions('amazon')}
                containerStyle={{ margin: 0, padding: 0 }}
              />
              <Fa
                name="amazon-pay"
                style={{ fontSize: 50, color: COLORS.amazon }}
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
          mode="contained"
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
      </View>
    </View>
  );
}
