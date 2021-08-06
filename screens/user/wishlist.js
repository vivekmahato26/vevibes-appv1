import React, { useState } from 'react';


import {
  View,
  ScrollView,
  FlatList,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  LogBox,
  TouchableWithoutFeedback
} from 'react-native';

import { useIsFocused } from "@react-navigation/native";

import { Button, Card, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Fa from "react-native-vector-icons/FontAwesome";

import { client, GET_WISHLIST, REMOVE_FROM_WISHLIST } from "../../constants/graphql";

import theme from '../../constants/theme';
const { COLORS, FONTS, SIZES } = theme;

import { noWishlist, noOrder, noCard } from '../../constants/images';

const { width, height } = Dimensions.get('window');

import Auth from "../../constants/context/auth";
import CartContext from "../../constants/context/cartContext";

export default function Wishlist({ navigation }) {
  const isFocused = useIsFocused();
  const { token } = React.useContext(Auth);
  const { cart, addProductToCart, removeProductFromCart } = React.useContext(CartContext);
  const [viewStyle, setViewStyle] = useState('th-large');
  const [data, setData] = useState([])

  const [cartUpdate, setCartUpdate] = React.useState(0);

  const addProductToCartHandler = product => {
    addProductToCart(product);
    setCartUpdate(cartUpdate + 1);
  };

  const removeProductFromCartHandler = productId => {
    removeProductFromCart(productId);
    setCartUpdate(cartUpdate + 1);
  };

  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    getWishlist();
  }, [isFocused]);
  const productDetails = (item) => {
    navigation.navigate('ProductDetails', {
      screen: "ProductDetails",
      product: item
    });
  };
  const changeViewStyle = () => {
    if (viewStyle === 'th-large') {
      setViewStyle('list-ul');
    } else {
      setViewStyle('th-large');
    }
  };
  const getWishlist = async () => {
    try {
      client.setHeader('authorization', `Bearer ${token}`);
      const wishlist = await client.request(GET_WISHLIST);
      const wishlistData = wishlist.getWishlist;
      setData(wishlistData);
    } catch (e) {
      console.log(e.message);
    }
    return;
  }
  const removeFromWishlist = async (arg) => {
    client.setHeader('authorization', `Bearer ${token}`)
    const remove = await client.request(REMOVE_FROM_WISHLIST, { productId: arg });
    getWishlist();
  }
  return (
    <>
      <View
        style={{
          padding: 10,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
          <Icon name="chevron-left" style={styles.icon} onPress={() => navigation.goBack()} />
          <Text
            style={{ ...FONTS.h3, color: COLORS.primary, fontWeight: 'bold' }}>
            Wishlist
          </Text>
        </View>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Fa
            name={viewStyle}
            onPress={changeViewStyle}
            style={styles.icon}
          />
        </View>
      </View>
      {data.length !== 0 && <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
        <View>
          {viewStyle === 'th-large' && (
            <FlatList
              horizontal={false}
              numColumns={2}
              data={data}
              keyExtractor={(item, index) => 'key' + index}
              pagingEnabled
              scrollEnabled
              decelerationRate={0}
              scrollEventThrottle={16}
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <Card style={styles.card} >
                    <Icon
                      name="heart"
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        ...FONTS.body2,
                        color: COLORS.error,
                        elevation: 1,
                        zIndex: 10,
                      }}
                      onPress={() => removeFromWishlist(item.id)}
                    />
                    <View
                      style={{
                        backgroundColor: COLORS.lightGray,
                        borderRadius: 25,
                        padding: 5,
                        marginRight: 0,
                      }}>

                      <Image
                        style={styles.cardImg}
                        source={{ uri: item.img[0] }}
                      />
                    </View>
                    <TouchableWithoutFeedback onPress={() => productDetails(item)}>
                      <View>
                        {item.weightKG && <Text
                          style={{
                            color: COLORS.primary,
                            ...FONTS.h3,
                            fontWeight: 'bold',
                            marginLeft: 0,
                          }}>
                          {item.weightKG} Kg
                        </Text>}
                        <Title
                          style={{
                            ...FONTS.body3,
                            color: COLORS.primary,
                            fontWeight: 'bold',
                          }}>
                          {item.name}
                        </Title>
                      </View>
                    </TouchableWithoutFeedback>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={styles.button}>
                        {cart.findIndex(
                          product => product.product.id === item.id
                        ) >= 0 ? (
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
                                onPress={() => removeProductFromCartHandler(item.id)}
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
                              {
                                cart[
                                  cart.findIndex(
                                    product => product.product.id === item.id
                                  )
                                ].quantity
                              }
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
                                onPress={() => addProductToCartHandler(item)}
                              />
                            </View>
                          </View>
                        ) : (
                          <Text
                            onPress={() => addProductToCartHandler(item)}
                            style={{
                              padding: 2,
                              color: COLORS.white,
                              ...FONTS.body3,
                              paddingLeft: 15,
                              paddingRight: 15,
                            }}>
                            Add
                          </Text>
                        )}
                      </View>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                        }}>
                        <Text style={item.salePrice ? styles.priceDisabled : styles.price}>£{item.price}</Text>
                        {item.salePrice && <Text style={styles.price}>£{item.salePrice}</Text>}
                      </View>
                    </View>
                  </Card>
                );
              }}
            />
          )}
          {viewStyle === 'list-ul' && (
            <FlatList
              horizontal={false}
              data={data}
              keyExtractor={(item, index) => 'key' + index}
              pagingEnabled
              scrollEnabled
              decelerationRate={0}
              scrollEventThrottle={16}
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <Card style={styles.cardList} onPress={() => productDetails(item)}>
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
                          name="heart"
                          style={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            ...FONTS.body2,
                            color: COLORS.error,
                            elevation: 1,
                            zIndex: 10,
                          }}
                          onPress={() => removeFromWishlist(item.id)}
                        />
                        <Image
                          style={styles.cardImgList}
                          source={{ uri: item.img[0] }}
                        />
                      </View>
                      <View>
                        {item.weightKG && <Text
                          style={{
                            color: COLORS.primary,
                            ...FONTS.h3,
                            fontWeight: 'bold',
                            marginLeft: 0,
                          }}>
                          {item.weightKG} Kg
                        </Text>}
                        <Title
                          style={{
                            ...FONTS.body3,
                            color: COLORS.primary,
                            fontWeight: 'bold',
                            maxWidth: width - 180
                          }}>
                          {item.name}
                        </Title>

                        <View
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={styles.button}>
                            {cart.findIndex(
                              product => product.product.id === item.id
                            ) >= 0 ? (
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
                                    onPress={() => removeProductFromCartHandler(item.id)}
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
                                  {
                                    cart[
                                      cart.findIndex(
                                        product => product.product.id === item.id
                                      )
                                    ].quantity
                                  }
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
                                    onPress={() => addProductToCartHandler(item)}
                                  />
                                </View>
                              </View>
                            ) : (
                              <Text
                                onPress={() => addProductToCartHandler(item)}
                                style={{
                                  padding: 2,
                                  color: COLORS.white,
                                  ...FONTS.body3,
                                  paddingLeft: 15,
                                  paddingRight: 15,
                                }}>
                                Add
                              </Text>
                            )}
                          </View>
                          <View
                            style={{
                              flex: 1,
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                            }}>
                            <Text style={item.salePrice ? styles.priceDisabled : styles.price}>£{item.price}</Text>
                            {item.salePrice && <Text style={styles.price}>£{item.salePrice}</Text>}
                          </View>
                        </View>
                      </View>
                    </View>
                  </Card>
                );
              }}
            />
          )}
        </View>
      </ScrollView>}
      {data.length === 0 && <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Image source={{ uri: noWishlist }} style={{ width: width - 40, height: 400 }} resizeMode="contain" />
      </View>}
      {data.length !== 0 && <Button mode="flat" style={{ backgroundColor: COLORS.secondary, elevation: 2 }} theme={{
        roundness: 0
      }} onPress={() => navigation.navigate("Cart", { screen: "Cart" })}>
        <Text style={{ color: COLORS.white, ...FONTS.body5, fontWeight: 'bold' }}>Go To Cart</Text>
      </Button>}
      {data.length === 0 && <Button mode="flat" style={{ backgroundColor: COLORS.secondary, elevation: 2 }} theme={{
        roundness: 0
      }} onPress={() => navigation.navigate("ProductHome", { screen: "ProductHome" })}>
        <Text style={{ color: COLORS.white, ...FONTS.body5, fontWeight: 'bold' }}>Continue Shopping</Text> 
      </Button>}
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
    borderRadius: 15,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    elevation: 2
  },
  cardList: {
    width: width - 20,
    margin: 10,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 15,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    elevation: 2
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
    ...FONTS.body4,
    color: COLORS.secondary,
    marginLeft: 5
  },
  priceDisabled: {
    ...FONTS.body4,
    color: COLORS.gray,
    textDecorationLine: 'line-through',
  },
});
