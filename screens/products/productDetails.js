import React from 'react';

import {
  View,
  ScrollView,
  FlatList,
  Text,
  Image,
  Animated,
  Dimensions,
  StyleSheet,
  LogBox,
  TouchableWithoutFeedback
} from 'react-native';
import { DataTable, Card, Title, Button } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fa from 'react-native-vector-icons/FontAwesome';

import CartContext from "../../constants/context/cartContext";
import Auth from "../../constants/context/auth";

import {
  client,
  GET_FEATURED_PRODUCTS,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  CHECK_WHISHLISTED
} from '../../constants/graphql';

import theme from '../../constants/theme';
const { COLORS, FONTS, SIZES } = theme;

const { width, height } = Dimensions.get('window');

export default function ProductDetails({ navigation, route }) {
  const product = route.params.product;
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  const [wishlisted, setWislisted] = React.useState(false);

  const { cart, addProductToCart, removeProductFromCart } = React.useContext(CartContext);
  const { token, authenticated } = React.useContext(Auth);

  const [cartUpdate, setCartUpdate] = React.useState(0);

  const addProductToCartHandler = product => {
    addProductToCart(product);
    setCartUpdate(cartUpdate + 1);
  };

  const removeProductFromCartHandler = productId => {
    removeProductFromCart(productId);
    setCartUpdate(cartUpdate + 1);
  };
  const data = [
    {
      url: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg',
    },
    {
      url: 'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg',
    },
    {
      url: 'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg',
    },
  ];
  const [featuredProducts, setFeaturedProducts] = React.useState([]);
  const getFeaturedProducts = async () => {
    const products = await client.request(GET_FEATURED_PRODUCTS);
    setFeaturedProducts(products.getFeaturedProducts);
  };
  React.useEffect(async () => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    scrollX.addListener(({ value }) => {
      if (Math.floor(value / SIZES.width) === data.length - 1) {
        setCompleted(true);
      }
    });

    client.setHeader('authorization', `Bearer ${token}`);
    const data = await client.request(CHECK_WHISHLISTED, { productId: product.id });
    if (data.checkWishlisted.__typename === "Sucess") {
      setWislisted(data.checkWishlisted.res);
    } else {
      navigation.navigate('Login');
    }
    getFeaturedProducts();
    return () => scrollX.removeListener();
  }, []);
  const productDetails = item => {
    navigation.navigate('ProductDetails', {
      screen: 'ProductsDetails',
      product: item,
    });
  };

  const handleWishlist = async () => {
    if (authenticated) {
      if(wishlisted) {
        const data = await client.request(REMOVE_FROM_WISHLIST,{productId: product.id});
        setWislisted(false);
      } else {
        const data = await client.request(ADD_TO_WISHLIST,{productId: product.id});
        setWislisted(true);
      }
    }
    else {
      navigation.navigate('Login');
    }
  }


  return (
    <>
      <ScrollView>
        <View>
          <FlatList
            horizontal
            data={product.img}
            keyExtractor={(item, index) => 'key' + index}
            pagingEnabled
            scrollEnabled
            decelerationRate={0}
            scrollEventThrottle={16}
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View style={{ padding: 10, flex: 1, alignItems: 'center' }}>
                  <Icon
                    name="chevron-left"
                    style={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      ...FONTS.h2,
                      color: COLORS.primary,
                    }}
                  />
                  <Image
                    source={{ uri: item }}
                    style={{ width: width - 20, height: 200, zIndex: -1 }}
                  />
                </View>
              );
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false },
            )}
          />
          <View style={styles.dotView}>
            {product.img.map((_, i) => {
              let opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });
              const dotSize = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [10, 10, 10],
                extrapolate: 'clamp',
              });

              const width = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [10, 35, 10],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  key={i}
                  style={{
                    opacity,
                    height: dotSize,
                    width: width,
                    backgroundColor: COLORS.secondary,
                    margin: 8,
                    borderRadius: 5,
                  }}
                />
              );
            })}
          </View>
          <View
            style={[
              styles.flexView,
              { justifyContent: 'space-between', padding: 10 },
            ]}>
            <View style={[styles.flexView, { justifyContent: 'flex-start' }]}>
              {product.cupon && (
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.secondary,
                    paddingLeft: 5,
                    paddingRight: 5,
                    borderColor: COLORS.secondary,
                    borderRadius: 5,
                    borderWidth: 1,
                  }}>
                  {product.cupon}
                </Text>
              )}
              {product.weightKG && (
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.secondary,
                    paddingLeft: 5,
                    fontWeight: 'bold',
                  }}>
                  {product.weightKG} Kg
                </Text>
              )}
            </View>
            <Icon
              name={wishlisted ? "heart" : "heart-outline"}
              style={{
                ...FONTS.h2,
                color: COLORS.error,
              }}
              onPress={handleWishlist}
            />
          </View>
          <View
            style={[
              styles.flexView,
              { justifyContent: 'space-between', padding: 10 },
            ]}>
            <Text style={styles.head}>{product.name}</Text>
            <View style={{ justifyContent: 'flex-end', alignItems: "flex-start", flexDirection: 'row' }}>
              <Text style={product.salePrice ? styles.priceDisabledHead : styles.priceHead}>£{product.price}</Text>
              {product.salePrice && <Text style={styles.priceHead}>£{product.salePrice}</Text>}
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <Text style={styles.head}>Description</Text>
            <Text style={{ ...FONTS.body3 }}>{product.description}</Text>
          </View>
          <View style={{ padding: 10 }}>
            <View style={[styles.flexView, { justifyContent: 'space-between' }]}>
              <Text style={styles.head}>Ingredients</Text>
              <Icon name="chevron-up" style={[styles.head2, { ...FONTS.h2 }]} />
            </View>
            <Animated.View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              {product.indregients.map((i, index) => {
                return (
                  <Text
                    key={index + Math.random(index)}
                    style={{
                      textTransform: 'capitalize',
                      ...FONTS.body3,
                      marginLeft: 10,
                    }}>
                    {i},
                  </Text>
                );
              })}
            </Animated.View>
          </View>
          <View style={{ padding: 10 }}>
            <View style={[styles.flexView, { justifyContent: 'space-between' }]}>
              <Text style={styles.head}>Nutrition Values</Text>
              <Icon name="chevron-up" style={[styles.head2, { ...FONTS.h2 }]} />
            </View>
            <Animated.View>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Nutritional Info</DataTable.Title>
                  <DataTable.Title>per 100g</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell>Energy</DataTable.Cell>
                  <DataTable.Cell>183 kJ / 44 Kcal</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Energy</DataTable.Cell>
                  <DataTable.Cell>183 kJ / 44 Kcal</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Energy</DataTable.Cell>
                  <DataTable.Cell>183 kJ / 44 Kcal</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Energy</DataTable.Cell>
                  <DataTable.Cell>183 kJ / 44 Kcal</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Energy</DataTable.Cell>
                  <DataTable.Cell>183 kJ / 44 Kcal</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Energy</DataTable.Cell>
                  <DataTable.Cell>183 kJ / 44 Kcal</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Energy</DataTable.Cell>
                  <DataTable.Cell>183 kJ / 44 Kcal</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </Animated.View>
          </View>
          <View style={{ padding: 10 }}>
            <View style={[styles.flexView, { justifyContent: 'space-between' }]}>
              <Text style={styles.head}>Delivery</Text>
              <Icon name="chevron-up" style={[styles.head2, { ...FONTS.h2 }]} />
            </View>
            <Animated.View>
              <Text>
                Lorem ipsum and companyLorem ipsum dolor sit amet, consectetuer
                adipiscing elit, sed diam nonummy nibh euismod tincid
              </Text>
            </Animated.View>
          </View>
          <View style={{ padding: 10 }}>
            <View style={[styles.flexView, { justifyContent: 'space-between' }]}>
              <Text style={styles.head}>Allergens</Text>
              <Icon name="chevron-up" style={[styles.head2, { ...FONTS.h2 }]} />
            </View>
            <Animated.View>
              <Text style={{ ...FONTS.body3 }}>{product.allergen}</Text>
            </Animated.View>
          </View>
          <View style={{ padding: 10 }}>
            <View style={[styles.flexView, { justifyContent: 'space-between' }]}>
              <Text style={styles.head}>Disclaimer</Text>
              <Icon name="chevron-up" style={[styles.head2, { ...FONTS.h2 }]} />
            </View>
            <Animated.View>
              <Text style={{ ...FONTS.body3 }}>
                {product.disclaimer}
              </Text>
            </Animated.View>
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <View style={[styles.flexView, { justifyContent: 'space-between' }]}>
            <Text style={styles.head}>Related Products</Text>
            <Text style={styles.head2}>See All</Text>
          </View>
          <FlatList
            horizontal
            data={featuredProducts}
            keyExtractor={(item, index) => 'key' + index}
            pagingEnabled
            scrollEnabled
            decelerationRate={0}
            scrollEventThrottle={16}
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <Card style={[styles.card]}>
                  <ScrollView>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        productDetails(item);
                      }}
                      containerStyle={{ flex: 1 }}>
                      <View>
                        <Card.Cover
                          style={styles.cardImg}
                          source={{ uri: item.img[0] }}
                        />
                        {item.weightKG && (
                          <Text
                            style={{
                              color: COLORS.primary,
                              ...FONTS.h3,
                              fontWeight: 'bold',
                              marginLeft: 0,
                            }}>
                            {item.weightKG} Kg
                          </Text>
                        )}
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
                  </ScrollView>
                  <View
                    style={{
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
                                ...FONTS.body4,
                                fontWeight: 'bold',
                              }}
                              onPress={() => removeProductFromCartHandler(item.id)}
                            />
                          </View>
                          <Text
                            style={{
                              color: COLORS.white,
                              ...FONTS.body4,
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
                                ...FONTS.body4,
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
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false },
            )}
          />
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                backgroundColor: '#f2f2f2',
                width: 40,
                borderRadius: 5,
              }}
              onPress={() => {
                navigation.navigate('Cart');
              }}>
              <Icon
                name="cart-outline"
                style={{
                  ...FONTS.h2,
                  color: COLORS.primary,
                  textAlign: 'center',
                }}
                onPress={() => {
                  navigation.navigate('Cart', { screen: "Cart", cart: cart });
                }}
              />
              {cart.length !== 0 && (
                <View
                  style={{
                    ...FONTS.h4,
                    color: COLORS.white,
                    position: 'absolute',
                    right: 2,
                    top: 2,
                    backgroundColor: 'red',
                    borderRadius: 100,
                    width: 10,
                    fontSize: 10,
                    height: 10,
                    textAlign: 'center',
                    textAlignVertical: 'top',
                  }}></View>
              )}
            </View>
            <Button
              style={[styles.button, { borderRadius: 5, width: width - 80 }]}
              mode="contained"
              onPress={() => {
                addProductToCartHandler(product);
                navigation.navigate('Cart', { screen: "Cart", cart: cart });
              }}>
              Buy
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  flexView: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  dotView: { flexDirection: 'row', justifyContent: 'center' },
  top: {
    zIndex: 10,
  },
  head: {
    color: COLORS.primary,
    ...FONTS.body2,
    fontWeight: 'bold',
    maxWidth: width / 1.3
  },
  head2: {
    color: COLORS.secondary,
    ...FONTS.body3,
    fontWeight: 'bold',
  },
  card: {
    width: width / 2 - 23,
    margin: 5,
    backgroundColor: COLORS.white,
    padding: 10,
    borderColor: COLORS.lightGray,
    borderWidth: 2,
    borderRadius: 10,
    elevation: 2
  },
  cardImg: {
    width: width / 2 - 60,
    height: width / 2 - 60,
    borderRadius: 10,
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
  priceHead: {
    ...FONTS.body3,
    color: COLORS.secondary,
    marginLeft: 5,
    fontWeight: "bold"
  },
  priceDisabledHead: {
    ...FONTS.body3,
    color: COLORS.gray,
    textDecorationLine: 'line-through',
    fontWeight: "bold"
  },
  cardView: {
    width: width - 20,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },

  textView: {
    position: 'absolute',
    bottom: 10,
    margin: 10,
    left: 5,
  },
  image: {
    width: width - 20,
    height: height / 3,
    borderRadius: 10,
  },
  itemTitle: {
    color: 'white',
    fontSize: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 5,
    fontWeight: 'bold',
    elevation: 5,
  },
  itemDescription: {
    color: 'white',
    fontSize: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
});
