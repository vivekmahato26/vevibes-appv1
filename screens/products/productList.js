import React, { useState, useContext } from 'react';

import {
  View,
  ScrollView,
  FlatList,
  Text,
  Dimensions,
  Animated,
  StyleSheet,
  Image,
  LogBox,
  TouchableWithoutFeedback
} from 'react-native';
import { Card, Title, Snackbar, TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Fa from "react-native-vector-icons/FontAwesome";

import Auth from "../../constants/context/auth";
import CartContext from "../../constants/context/cartContext";

import theme from '../../constants/theme';
const { COLORS, FONTS, SIZES } = theme;

import { Modalize } from "react-native-modalize";
import Collapsible from 'react-native-collapsible';
import * as Animatable from 'react-native-animatable';

import { filter } from "../../constants/images";

import _ from "lodash";

import {
  client,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  GET_WISHLIST
} from '../../constants/graphql';

import { useIsFocused } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

export default function ProductList({ navigation, route }) {
  const isFocused = useIsFocused();
  const { authenticated, token } = useContext(Auth);
  const { cart, addProductToCart, removeProductFromCart } = React.useContext(CartContext);
  const productsArr = route.params.products;
  const scrollX = new Animated.Value(0);
  const [viewStyle, setViewStyle] = useState('th-large');
  const [cartUpdate, setCartUpdate] = React.useState(0);
  const [wishlistData, setWishlistData] = React.useState([]);
  const [visible, setVisible] = useState(false);
  const [snackText, setSnackText] = useState("");
  const [searchStyle, setSearchStyle] = useState({ width: 0, opacity: 0 });
  const filterModal = React.createRef();
  const [filterSorting, setFilterSorting] = useState(false);
  const [filterBrands, setFilterBrands] = useState(true);
  const [filterCategory, setFilterCategory] = useState(true);
  const [filterTags, setFilterTags] = useState(true);
  const [products, setProducts] = useState(productsArr);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const sortByPrice = (order) => {
    const temp = _.orderBy(products, ['price'], [order]);
    setProducts(temp);
  }

  const filterProducts = (key, filter) => {
    const temp = _.filter(productsArr, function (p) {
      return p[key] === filter;
    })
    setProducts(temp);
  }

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
  const toogleWishlist = async (id, flag) => {
    if (!authenticated) {
      navigation.navigate('Login');
    }
    else {
      if (flag === -1) {
        client.setHeader('authorization', `Bearer ${token}`);
        const addToWishlist = await client.request(ADD_TO_WISHLIST, { productId: id })
        getWishlist();
        setSnackText("Added from Wishlist!");
        onToggleSnackBar();
      } else {
        client.setHeader('authorization', `Bearer ${token}`);
        const removeFromWishlist = await client.request(REMOVE_FROM_WISHLIST, { productId: id })
        getWishlist();
        setSnackText("Removed to Wishlist!")
        onToggleSnackBar();
      }
    }
  }
  const getWishlist = async () => {
    try {
      client.setHeader('authorization', `Bearer ${token}`);
      const wishlist = await client.request(GET_WISHLIST);
      const wishlistData = wishlist.getWishlist;
      setWishlistData(wishlistData);
    } catch (e) {
      console.log(e.message);
    }
    return;
  }
  return (
    <>
      <ScrollView>
        <View
          style={{
            padding: 10,
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{ flex: 2, alignItems: 'center', flexDirection: 'row' }}>
            <Icon name="chevron-left" style={styles.icon} onPress={() => navigation.goBack()} />
            <Text
              style={{ ...FONTS.h3, color: COLORS.primary, fontWeight: 'bold' }}>
              Best Selling Items
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Icon
              name="magnify"
              style={[styles.icon, { padding: 5 }]}
              onPress={() => navigation.navigate("Search",{screen:"Search",productsArr:productsArr})}
            />
            <TouchableWithoutFeedback onPress={() => filterModal.current.open()}>
              <Image source={{ uri: filter }} style={{ width: 20, height: 20 }} resizeMode="contain"  />
            </TouchableWithoutFeedback>
            <Fa
              name={viewStyle}
              onPress={changeViewStyle}
              style={styles.icon}
            />
          </View>
        </View>
        <View>
          {viewStyle === 'th-large' && (
            <FlatList
              horizontal={false}
              numColumns={2}
              data={products}
              keyExtractor={(item, index) => 'key' + index}
              pagingEnabled
              scrollEnabled
              decelerationRate={0}
              scrollEventThrottle={16}
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                const wishlisted = wishlistData.findIndex((wishlist) => wishlist.id === item.id)
                return (
                  <Card style={styles.card} >
                    <Icon
                      name={wishlisted === -1 ? "heart-outline" : "heart"}
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        ...FONTS.body2,
                        color: COLORS.error,
                        elevation: 1,
                        zIndex: 10,
                      }}
                      onPress={() => toogleWishlist(item.id, wishlisted)}
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
              data={products}
              keyExtractor={(item, index) => 'key' + index}
              pagingEnabled
              scrollEnabled
              decelerationRate={0}
              scrollEventThrottle={16}
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                const wishlisted = wishlistData.findIndex((wishlist) => wishlist.id === item.id)
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
                          name={wishlisted === -1 ? "heart-outline" : "heart"}
                          style={{
                            position: 'absolute',
                            top: 5,
                            right: 5,
                            ...FONTS.body2,
                            color: COLORS.error,
                            elevation: 1,
                            zIndex: 10
                          }}
                          onPress={() => toogleWishlist(item.id, wishlisted)}
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
      </ScrollView>
      {cart.length !== 0 && <Button onPress={() => navigation.navigate('Cart', { screen: "Cart", cart: cart })} mode="contained" style={{ position: "absolute", bottom: 0, width: width, backgroundColor: COLORS.secondary }}>
        <Text style={{ ...FONTS.h3 }}>Go To Cart</Text>
      </Button>}
      <Modalize ref={filterModal} adjustToContentHeight={true} onClose={() => { setFilterTags(true); setFilterBrands(true); setFilterCategory(true); }}>
        <View style={{ flex: 1, margin: 10 }}>
          <ScrollView>
            <View>
              <Text onPress={() => setFilterSorting(!filterSorting)} style={{ ...FONTS.h3, color: COLORS.primary, fontWeight: 'bold', elevation: 2, backgroundColor: COLORS.lightGray, borderRadius: 5, marginBottom: 10, padding: 10 }}>Sorting</Text>
              <Collapsible collapsed={filterSorting}>
                <Text style={[styles.category, { textAlign: "center" }]} onPress={() => sortByPrice("desc")}>Prices: High to Low</Text>
                <Text style={[styles.category, { textAlign: "center" }]} onPress={() => sortByPrice("asc")}>Prices: Low to High</Text>
                <Text style={[styles.category, { textAlign: "center" }]} onPress={() => filterProducts("featured", true)}>Featured</Text>
                <Text style={[styles.category, { textAlign: "center" }]}>Newest Arrivals</Text>
              </Collapsible>
            </View>
            <View>
              <Text onPress={() => setFilterBrands(!filterBrands)} style={{ ...FONTS.h3, color: COLORS.primary, fontWeight: 'bold', elevation: 2, backgroundColor: COLORS.lightGray, borderRadius: 5, marginBottom: 10, padding: 10 }}>Brands</Text>
              <Collapsible collapsed={filterBrands}>
                <Animatable.View duration={1000}
                  easing="ease" style={{ flexDirection: 'row', alignItems: 'center', flexWrap: "wrap" }}>
                  <Text style={[styles.category]} onPress={() => filterProducts("brand", "")}>Bakery &amp; Cakes</Text>
                  <Text style={[styles.category]} onPress={() => filterProducts("brand", "")}>Cheese </Text>
                  <Text style={[styles.category]} onPress={() => filterProducts("brand", "")}>Cupboard Staples </Text>
                  <Text style={[styles.category]} onPress={() => filterProducts("brand", "")}>Dairy &amp; Egg Alternatives </Text>
                  <Text style={[styles.category]} onPress={() => filterProducts("brand", "")}>Drinks </Text>
                  <Text style={[styles.category]} onPress={() => filterProducts("brand", "")}>Pasta &amp; Noodles </Text>
                  <Text style={[styles.category]} onPress={() => filterProducts("brand", "")}>Plant Based Alternatives</Text>
                  <Text style={[styles.category]} onPress={() => filterProducts("brand", "")}>Ready To Cook</Text>
                  <Text style={[styles.category]} onPress={() => filterProducts("brand", "")}>Sauces </Text>
                  <Text style={[styles.category]} onPress={() => filterProducts("brand", "")}>Snacks </Text>
                  <Text style={[styles.category]} onPress={() => filterProducts("brand", "")}>Yogurt &amp; Deserts </Text>
                </Animatable.View>
              </Collapsible>
            </View>
            <View>
              <Text onPress={() => setFilterCategory(!filterCategory)} style={{ ...FONTS.h3, color: COLORS.primary, fontWeight: 'bold', elevation: 2, backgroundColor: COLORS.lightGray, borderRadius: 5, marginBottom: 10, padding: 10 }}>Category</Text>
              <Collapsible collapsed={filterCategory}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: "wrap" }}>
                  <Text style={[styles.category]} onPress={() => filterProducts("category", "Bakery & Cakes")}>Bakery &amp; Cakes</Text>
                  <Text style={[styles.category]} onPress={() => filterProducts("category", "Cheese")}>Cheese </Text>
                  <Text style={[styles.category]} onPress={() => filterProducts("category", "Cupboard Staples")}>Cupboard Staples </Text>
                  <Text style={[styles.category]} onPress={() => filterProducts("category", "Diary & Egg Alternatives")}>Dairy &amp; Egg Alternatives </Text>
                  <Text style={[styles.category]} onPress={() => filterProducts("category", "Drinks")}>Drinks </Text>
                  <Text style={[styles.category]} onPress={() => filterProducts("category", "Pasta & Noodles")}>Pasta &amp; Noodles </Text>
                  <Text style={[styles.category]} onPress={() => filterProducts("category", "Plant Based Alternatives")}>Plant Based Alternatives</Text>
                  <Text style={[styles.category]} onPress={() => filterProducts("category", "Ready To Cook")}>Ready To Cook</Text>
                  <Text style={[styles.category]} onPress={() => filterProducts("category", "Sauces")}>Sauces </Text>
                  <Text style={[styles.category]} onPress={() => filterProducts("category", "Snacks")}>Snacks </Text>
                  <Text style={[styles.category]} onPress={() => filterProducts("category", "Yogurt & Deserts")}>Yogurt &amp; Deserts </Text>
                </View>
              </Collapsible>
            </View>
            <View>
              <Text onPress={() => setFilterTags(!filterTags)} style={{ ...FONTS.h3, color: COLORS.primary, fontWeight: 'bold', elevation: 2, backgroundColor: COLORS.lightGray, borderRadius: 5, marginBottom: 10, padding: 10 }}>Popular Tags</Text>
              <Collapsible collapsed={filterTags}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: "wrap" }}>
                  <Text style={[styles.category]}>Bakery &amp; Cakes</Text>
                  <Text style={[styles.category]}>Cheese </Text>
                  <Text style={[styles.category]}>Cupboard Staples </Text>
                  <Text style={[styles.category]}>Dairy &amp; Egg Alternatives </Text>
                  <Text style={[styles.category]}>Drinks </Text>
                  <Text style={[styles.category]}>Pasta &amp; Noodles </Text>
                  <Text style={[styles.category]}>Plant Based Alternatives</Text>
                  <Text style={[styles.category]}>Ready To Cook</Text>
                  <Text style={[styles.category]}>Sauces </Text>
                  <Text style={[styles.category]}>Snacks </Text>
                  <Text style={[styles.category]}>Yogurt &amp; Deserts </Text>
                </View>
              </Collapsible>
            </View>
          </ScrollView>
        </View>
        <Button mode="contained" onPress={() => { filterModal.current.close(); setFilterTags(true); setFilterBrands(true); setFilterCategory(true); }} style={{ backgroundColor: COLORS.secondary }}>
          <Text>View Results</Text>
        </Button>
      </Modalize>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={200}
        theme={{
          colors: { accent: COLORS.white, onSurface: COLORS.error }
        }}
      >
        <View style={{ width: '100%', justifyContent: 'center' }}>
          <Text style={{
            ...FONTS.h3,
            color: COLORS.white,
            backgroundColor: "transparent",
            textAlign: 'center',
          }}>
            {snackText}
          </Text>
        </View>
      </Snackbar>
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
  category: {
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#f2f2f2",
    padding: 5,
    ...FONTS.body4,
    color: "black",
  }
});
