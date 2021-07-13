import React, { useReducer } from 'react';

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
  LogBox,
  TouchableWithoutFeedback
} from 'react-native';
import { Button, Divider, Card, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../constants/theme';

import _ from "lodash";

import Fa from "react-native-vector-icons/FontAwesome";

import { ADD_PRODUCT, REMOVE_PRODUCT, shopReducer } from "../../constants/cart";

import { emptyCart } from '../../constants/images';

const { COLORS, FONTS, SIZES } = theme;

const { width, height } = Dimensions.get('window');

export default function Cart({ navigation, route }) {
  const cart = route.params.cart;
  const coupon = route.params.coupon;
  const discount = route.params.discount;
  const percent = route.params.percent;
  const minCartPrice = route.params.minCartPrice;
  const [cartData, dispatch] = useReducer(shopReducer, cart);
  const [total, setTotal] = React.useState(0);
  const [grandTotal, setGrandTotal] = React.useState(0);
  const [couponErr, setCouponErr] = React.useState();
  const [discountPrice, setDiscountPrice] = React.useState(0);
  const scrollX = new Animated.Value(0);

  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    var temp = 0;
    cartData.map((item) => {
      if (item.product.offerPrice) {
        temp = (temp + item.product.offerPrice * item.quantity)
      } else {
        temp = (temp + item.product.price * item.quantity)

      }
    })
    setTotal((prev) => temp);
    var tempGrandTotal = 0
    var tempDiscount = 0;
    if (discount) {

      if (total > minCartPrice) {
        if (percent) {
          tempDiscount = (total * discount / 100 + 5).toFixed(2);
          tempGrandTotal = (total - total * discount / 100 + 5).toFixed(2);
        } else {
          tempDiscount = discount;
          tempGrandTotal = total - discount;
        }
        setDiscountPrice(tempDiscount);
        setCouponErr((prev) => (false))
      } else {
        tempGrandTotal = total + 5;
        setCouponErr((prev) => (`Minimum cart value should be $${minCartPrice}`))
      }
    } else {
      tempGrandTotal = temp + 5;
    }
    setGrandTotal(tempGrandTotal);
  }, [discount, minCartPrice]);
  const productDetails = (item) => {
    navigation.navigate('ProductDetails', { screen: "ProductDetails", product: item });
  };
  // const removeFromCart = (item) => {
  //   var index = _.findIndex(cartData, function (o) {
  //     return o.item.id == item.product.id;
  //   });
  //   var tempCart = cartData;
  //   if (tempCart[index].quantity === 1) {
  //     tempCart = tempCart.splice(index, 1);
  //   } else {
  //     tempCart[index].quantity = tempCart[index].quantity - 1;
  //   }
  //   setCartData((prev) => (tempCart));
  // }

  // const addToCart = item => {
  //   var index = _.findIndex(cartData, function (o) {
  //     return o.item.id == item.product.id;
  //   });
  //   var tempCart = cartData;
  //   if (index === -1) {
  //     tempCart.push({
  //       item: item.item,
  //       quantity: 1,
  //     });
  //   } else {
  //     tempCart[index].quantity = tempCart[index].quantity + 1;
  //   }
  //   setCartData((prev) => {
  //     return tempCart;
  //   });
  // };
  const addProductToCart = product => {
    setTimeout(() => {
      dispatch({ type: ADD_PRODUCT, product: product });
    }, 400);
  };

  const removeProductFromCart = productId => {
    setTimeout(() => {
      dispatch({ type: REMOVE_PRODUCT, productId: productId });
    }, 400);
  };
  return (
    <>
      {cart.length !== 0 && (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Icon
                name="close-thick"
                style={{
                  ...FONTS.h3,
                  color: COLORS.primary,
                  fontWeight: 'bold',
                  marginRight: 5,
                }}
                onPress={() => navigation.navigate("ProductHome")}
              />
              <Text
                style={{ ...FONTS.h3, color: COLORS.primary, fontWeight: 'bold' }}>
                Cart
              </Text>
            </View>
            <Text style={{ ...FONTS.h3, color: COLORS.primary, fontWeight: 'bold' }}>
              Total {cart.length}
            </Text>
          </View>
          <View style={{ height: height / 2, flex: 1 }}>
            <FlatList
              data={cartData}
              keyExtractor={(item, index) => 'key' + index}
              decelerationRate={'normal'}
              scrollEventThrottle={16}
              renderItem={(product) => {
                const item = product.item;
                return (
                  <Card style={styles.cardList} >
                    <View
                      style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
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
                            right: 10,
                            ...FONTS.body2,
                            color: COLORS.primary,
                            elevation: 1
                          }}
                        />
                        <Image
                          style={styles.cardImgList}
                          source={{ uri: item.product.img[0] }}
                        />
                      </View>
                      <View style={{ width: width - 100 }}>
                        {item.product.weightKG && <Text
                          style={{
                            color: COLORS.primary,
                            ...FONTS.h3,
                            fontWeight: 'bold',
                            marginLeft: 0,
                          }}>
                          {item.product.weightKG}Kg
                        </Text>}
                        <TouchableWithoutFeedback onPress={() => productDetails(item.product)}>
                          <Title
                            style={{
                              ...FONTS.body3,
                              color: COLORS.primary,
                              fontWeight: 'bold',
                              width: width - 150
                            }}

                          >
                            {item.product.name}
                          </Title>
                        </TouchableWithoutFeedback>

                        <View
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            maxWidth: width - 200
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              backgroundColor: COLORS.secondary,
                              borderRadius: 50,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                backgroundColor: COLORS.secondaryDark,
                                borderRadius: 40,
                                flexBasis: 30,
                              }}>
                              <Fa
                                name="minus"
                                style={{
                                  color: COLORS.white,
                                  ...FONTS.body3,
                                  fontWeight: 'bold',
                                }}
                                onPress={() => removeProductFromCart(item.product.id)}
                              />
                            </View>
                            <Text
                              style={{
                                color: COLORS.white,
                                ...FONTS.body3,
                                marginLeft: 5,
                                marginRight: 5,
                                paddingBottom: 2,
                                paddingTop: 2,
                                fontWeight: 'bold',
                              }}>
                              {item.quantity}
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                backgroundColor: COLORS.secondaryDark,
                                borderRadius: 40,
                                flexBasis: 30,
                              }}>
                              <Fa
                                name="plus"
                                style={{
                                  color: COLORS.white,
                                  ...FONTS.body3,
                                  fontWeight: 'bold',
                                }}
                                onPress={() => addProductToCart(item)}
                              />
                            </View>
                          </View>
                          <View
                            style={{
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}>
                            <Text style={item.product.offerPrice ? styles.priceDisabled : styles.price}>£{item.product.price}</Text>
                            {item.product.offerPrice && <Text style={styles.price}>£{item.product.offerPrice}</Text>}
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
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Coupon')}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: "100%",
                  width: width - 20,
                  borderStyle: 'dashed',
                  borderRadius: 5,
                  borderWidth: 2,
                  margin: 10,
                  padding: 10,
                  backgroundColor: '#f7f7f7',
                  borderColor: COLORS.primary,
                }}>
                <Text
                  style={{ ...FONTS.h3, color: COLORS.primary, fontWeight: 'bold' }}>
                  Coupon Code
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {(coupon && !couponErr) ?
                    <><Text
                      style={{
                        ...FONTS.h3,
                        color: COLORS.secondary,
                        fontWeight: 'bold',
                      }}>
                      {coupon}
                    </Text>
                      <Icon
                        name="check-circle"
                        style={{
                          ...FONTS.h3,
                          color: COLORS.secondary,
                          fontWeight: 'bold',
                        }}
                      /></> : <Text style={{
                        ...FONTS.h3,
                        color: COLORS.secondary,
                        fontWeight: 'bold',
                      }}>Select Coupon</Text>}
                </View>
              </View>
            </TouchableWithoutFeedback>
            {couponErr && <Text style={{ margin: 10, color: 'red', marginTop: 0, textAlign: "center" }}>{couponErr}</Text>}
            <View style={{ margin: 10, marginTop: '20%' }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>
                  Delivery Fees
                </Text>
                <Text
                  style={{ ...FONTS.h3, color: COLORS.primary, fontWeight: 'bold' }}>
                  £05
                </Text>
              </View>
              <Divider style={{ height: 2, marginTop: 5, marginBottom: 5 }} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>Discount</Text>
                {!couponErr ? <Text
                  style={{ ...FONTS.h3, color: COLORS.primary, fontWeight: 'bold' }}>
                  {discountPrice}
                </Text> : <Text
                  style={{ ...FONTS.h3, color: COLORS.primary, fontWeight: 'bold' }}>
                  0
                </Text>}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>
                  Total Price
                </Text>
                <Text
                  style={{ ...FONTS.h3, color: COLORS.primary, fontWeight: 'bold' }}>
                  £{total}
                </Text>
              </View>
              <Divider style={{ height: 2, marginTop: 5, marginBottom: 5 }} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{ ...FONTS.h3, color: COLORS.primary, fontWeight: 'bold' }}>
                  Grand Total
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
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
                  color: COLORS.white,
                  borderRadius: 5,
                  marginTop: 15,
                }}
                onPress={() => { navigation.navigate("Address", { screen: 'Address', cart: cartData, discount: discountPrice, total: total, grandTotal: grandTotal, couponCode: !couponErr && coupon, deliveryPrice: 5 }) }}
              >
                <Text
                  style={{ ...FONTS.body2, color: COLORS.white, fontWeight: 'bold' }}>
                  CHECKOUT
                </Text>
              </Button>
            </View>
          </View>
        </View>)
      }
      {cart.length === 0 && (
        <View style={{ flex: 1, margin: 10 }}>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Icon name="close-thick" style={{ ...FONTS.body2, color: COLORS.primary, fontWeight: "bold", marginRight: 10 }} />
            <Text style={{ ...FONTS.body2, color: COLORS.primary, fontWeight: "bold" }}>Cart</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
            <Image source={{ uri: emptyCart }} style={{ width: width / 1.4, height: 300 }} resizeMode="contain" />
            <Text style={{ ...FONTS.body2, color: COLORS.primary, fontWeight: "bold", marginBottom: 10 }}>No items in your cart</Text>
            <Text style={{ ...FONTS.body5, color: COLORS.lightGray }}>Your faviorate items are</Text>
            <Text style={{ ...FONTS.body5, color: COLORS.lightGray }}>just a click away</Text>
            <Button style={{ backgroundColor: COLORS.secondary, borderRadius: 100, marginTop: 30 }} onPress={() => navigation.navigate("ProductHome")}>
              <Text style={{ ...FONTS.body2, color: COLORS.white }} >Start Shopping</Text>
            </Button>
          </View>
        </View>
      )}
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
