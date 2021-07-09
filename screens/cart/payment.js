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
import {Card, Divider, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fa from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');
import theme from '../../constants/theme';
const {COLORS, FONTS, SIZES} = theme;

export default function Payment({navigation}) {
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
  return (
    <View style={{margin: 10, flex: 1}}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="chevron-left"
              style={{
                ...FONTS.body1,
                color: COLORS.primary,
                fontWeight: 'bold',
              }}
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
      <View style={{flex: 1}}>
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
            renderItem={({item, index}) => {
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
                  }}>
                  <View
                    style={{
                      width: width / 2.5,
                      height: 250,
                      backgroundColor: 'transparent',
                      borderRadius: 10,
                    }}>
                    <Icon
                      name="checkbox-marked-circle"
                      style={{
                        textAlign: 'right',
                        margin: 10,
                        ...FONTS.body2,
                        color: COLORS.white,
                      }}
                    />
                    <View style={{marginTop: '10%', margin: 10}}>
                      <Image
                        source={{
                          uri: 'https://res.cloudinary.com/vevibes/image/upload/v1625118144/App%20Assets/Asset_11_mn4pea.png',
                        }}
                        style={{
                          width: 80,
                          height: 25,

                          resizeMode: 'cover',
                        }}
                      />
                      <Text
                        style={{
                          ...FONTS.body3,
                          color: COLORS.white,
                          fontWeight: 'bold',
                          marginTop: 20,
                        }}>
                        {item.number}
                      </Text>
                      <Text
                        style={{
                          ...FONTS.body2,
                          fontWeight: 'bold',
                          marginTop: 30,
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
            <Fa name="cc-paypal" style={{fontSize: 50, color: COLORS.paypal}} />
            <Fa name="apple-pay" style={{fontSize: 50, color: COLORS.apple}} />
            <Fa
              name="amazon-pay"
              style={{fontSize: 50, color: COLORS.amazon}}
            />
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
          <Text style={{...FONTS.body5, color: COLORS.lightGray}}>
            Delivery Fees
          </Text>
          <Text
            style={{...FONTS.body5, color: COLORS.primary, fontWeight: 'bold'}}>
            $05
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
          <Text style={{...FONTS.body5, color: COLORS.lightGray}}>
            Discount
          </Text>
          <Text
            style={{...FONTS.body5, color: COLORS.primary, fontWeight: 'bold'}}>
            $06
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...FONTS.body5, color: COLORS.lightGray}}>
            Total Price
          </Text>
          <Text
            style={{...FONTS.body5, color: COLORS.primary, fontWeight: 'bold'}}>
            $24
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
          <Text style={{...FONTS.body5, color: COLORS.primary}}>
            Grand Total
          </Text>
          <Text
            style={{
              ...FONTS.body5,
              color: COLORS.secondary,
              fontWeight: 'bold',
            }}>
            $23
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
          onPress={() => navigation.navigate('Failure')}>
          <Text
            style={{...FONTS.body5, color: COLORS.white, fontWeight: 'bold'}}>
            Confirm Order
          </Text>
        </Button>
      </View>
    </View>
  );
}
