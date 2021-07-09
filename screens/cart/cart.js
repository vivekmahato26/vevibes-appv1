import React from 'react';

import {
  View,
  ScrollView,
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  Animated,
  TouchableHighlight,
  LogBox
} from 'react-native';
import {Button, Divider, Card, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../constants/theme';
const {COLORS, FONTS, SIZES} = theme;

const {width, height} = Dimensions.get('window');

export default function Cart({navigation,route}) {
  const cart = route.params.cart;
  const scrollX = new Animated.Value(0);
  const relatedProducts = [
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531481/App%20Assets/Asset_42_yownt0.png',
      title: ['Bakery & Cakes'],
    },
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531482/App%20Assets/Asset_48_drfe9y.png',
      title: ['Diary & Egg', 'Alternatives'],
    },
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531482/App%20Assets/Asset_47_yv1ybt.png',
      title: ['Plant Based', 'Alternatives'],
    },
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531482/App%20Assets/Asset_46_rnksjt.png',
      title: ['Snacks'],
    },
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531481/App%20Assets/Asset_45_jst8ad.png',
      title: ['Household'],
    },
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531482/App%20Assets/Asset_47_yv1ybt.png',
      title: ['Plant Based', 'Alternatives'],
    },
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531482/App%20Assets/Asset_46_rnksjt.png',
      title: ['Snacks'],
    },
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531481/App%20Assets/Asset_45_jst8ad.png',
      title: ['Household'],
    },
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531482/App%20Assets/Asset_47_yv1ybt.png',
      title: ['Plant Based', 'Alternatives'],
    },
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531482/App%20Assets/Asset_46_rnksjt.png',
      title: ['Snacks'],
    },
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531481/App%20Assets/Asset_45_jst8ad.png',
      title: ['Household'],
    },
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531482/App%20Assets/Asset_47_yv1ybt.png',
      title: ['Plant Based', 'Alternatives'],
    },
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531482/App%20Assets/Asset_46_rnksjt.png',
      title: ['Snacks'],
    },
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531481/App%20Assets/Asset_45_jst8ad.png',
      title: ['Household'],
    },
  ];
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  const productDetails = () => {
    navigation.navigate('ProductDetails');
  };
  console.log(cart);
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center',flex:1}}>
          <Icon
            name="close-thick"
            style={{
              ...FONTS.h3,
              color: COLORS.primary,
              fontWeight: 'bold',
              marginRight: 5,
            }}
            onPress={() => {
              navigation.navigate('ProductHome');
            }}
          />
          <Text
            style={{...FONTS.h3, color: COLORS.primary, fontWeight: 'bold'}}>
            Cart
          </Text>
        </View>
        <Text style={{...FONTS.h3, color: COLORS.primary, fontWeight: 'bold'}}>
          Total 2
        </Text>
      </View>
      <View style={{height: height / 2,flex:1}}>
          <FlatList
            data={relatedProducts}
            keyExtractor={(item, index) => 'key' + index}
            decelerationRate={'normal'}
            scrollEventThrottle={16}
            renderItem={({item}) => {
              return (
                <Card style={styles.cardList} onPress={productDetails}>
                  <View
                    style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                    <View
                      style={{
                        backgroundColor: COLORS.lightGray,
                        borderRadius: 25,
                        padding: 5,
                        marginRight: 10,
                      }}>
                      <Icon
                        name="heart-outline"
                        style={{
                          position: 'absolute',
                          top: 5,
                          right: 5,
                          ...FONTS.body3,
                          color: COLORS.primary,
                        }}
                      />
                      <Image
                        style={styles.cardImgList}
                        source={{uri: item.uri}}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          color: COLORS.primary,
                          ...FONTS.h3,
                          fontWeight: 'bold',
                          marginLeft: 0,
                        }}>
                        5 Kg
                      </Text>
                      <Title
                        style={{
                          ...FONTS.body3,
                          color: COLORS.primary,
                          fontWeight: 'bold',
                        }}>
                        {item.title[0]}
                      </Title>

                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Button style={styles.button} mode="contained">
                          Add
                        </Button>
                        <View
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={styles.priceDisabled}>£45</Text>
                          <Text style={styles.price}>£30</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </Card>
              );
            }}
          />
      </View>
      <View>
        <TouchableHighlight
          style={{
            width: width - 20,
            borderStyle: 'dashed',
            borderRadius: 5,
            borderWidth: 2,
            margin: 10,
            padding: 10,
            backgroundColor: '#f7f7f7',
            borderColor: COLORS.primary,
          }}
          onPress={() => navigation.navigate('Coupon')}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: "100%",
            }}>
            <Text
              style={{...FONTS.h3, color: COLORS.primary, fontWeight: 'bold'}}>
              Coupon Code
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.secondary,
                  fontWeight: 'bold',
                }}>
                VEGAN50
              </Text>
              <Icon
                name="check-circle"
                style={{
                  ...FONTS.h3,
                  color: COLORS.secondary,
                  fontWeight: 'bold',
                }}
              />
            </View>
          </View>
        </TouchableHighlight>
        <View style={{margin: 10, marginTop: '20%'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{...FONTS.h3, color: COLORS.lightGray}}>
              Delivery Fees
            </Text>
            <Text
              style={{...FONTS.h3, color: COLORS.primary, fontWeight: 'bold'}}>
              $05
            </Text>
          </View>
          <Divider style={{height: 2, marginTop: 5, marginBottom: 5}} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{...FONTS.h3, color: COLORS.lightGray}}>Discount</Text>
            <Text
              style={{...FONTS.h3, color: COLORS.primary, fontWeight: 'bold'}}>
              $06
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{...FONTS.h3, color: COLORS.lightGray}}>
              Total Price
            </Text>
            <Text
              style={{...FONTS.h3, color: COLORS.primary, fontWeight: 'bold'}}>
              $24
            </Text>
          </View>
          <Divider style={{height: 2, marginTop: 5, marginBottom: 5}} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{...FONTS.h3, color: COLORS.primary, fontWeight: 'bold'}}>
              Grand Total
            </Text>
            <Text
              style={{
                ...FONTS.h3,
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
              color: COLORS.white,
              borderRadius: 5,
              marginTop: 15,
            }}
            onPress={() =>{navigation.navigate("Address")}}
            >
            <Text
              style={{...FONTS.body2, color: COLORS.white, fontWeight: 'bold'}}>
              CHECKOUT
            </Text>
          </Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    ...FONTS.body2,
    color: COLORS.primary,
  },
  card: {
    width: width / 2 - 20,
    margin: 10,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 25,
    elevation: 5,
  },
  cardList: {
    width: width - 20,
    margin: 10,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 25,
  },
  cardImg: {
    width: width / 2 - 50,
    height: width / 2 - 50,
    borderRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  cardImgList: {
    width: width / 2 - 80,
    height: width / 2 - 80,
    borderRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  button: {
    backgroundColor: COLORS.secondary,
    color: COLORS.white,
    borderRadius: 40,
  },

  price: {
    ...FONTS.body3,
    color: COLORS.secondary,
  },
  priceDisabled: {
    ...FONTS.body3,
    color: COLORS.gray,
    textDecorationLine: 'line-through',
  },
});
