import React, { useEffect, useReducer } from 'react';
import {
  View,
  Text,
  FlatList,
  Animated,
  ScrollView,
  StyleSheet,
  Dimensions,
  LogBox,
  BackHandler
} from 'react-native';
import {
  Button,
  Card,
  Title,
  Menu,
  Provider,
  Searchbar,
  TextInput,
  Divider,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import analytics from '@react-native-firebase/analytics';

import Fa from 'react-native-vector-icons/FontAwesome';

import _ from 'lodash';

import AuthContext from "../../constants/context/auth";
import CartContext from "../../constants/context/cartContext";

import ProductHeader from '../../components/productHeader';

import { Modalize } from 'react-native-modalize';

import {
  GET_PRODUCTS,
  client,
  GET_FEATURED_PRODUCTS,
} from '../../constants/graphql';
import axios from 'axios';

import { ALGOLIA_APP, ALGOLIA_SEARCH_KEY } from "@env";

import Carousal from '../../components/carousal/carousal';
import { Image } from 'react-native';
import theme from '../../constants/theme';
import { TouchableWithoutFeedback } from 'react-native';
const { COLORS, FONTS, SIZES } = theme;


const { width, height } = Dimensions.get('window');

import algoliasearch from "algoliasearch";
import Search from "../../components/search";

import { add_product_to_cart_event, remove_product_to_cart_event } from "../../constants/algolia";


export default function ProductHome({ route, navigation }) {
  const { location, setLocation } = React.useContext(AuthContext);
  const { cart, addProductToCart, removeProductFromCart } = React.useContext(CartContext);
  const modalizeRef = React.createRef();
  const addressRef = React.createRef();
  const scrollX = new Animated.Value(0);
  const [visible, setVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [productsData, setProductsData] = React.useState([]);
  const [featuredProducts, setFeaturedProducts] = React.useState([]);
  const [cartUpdate, setCartUpdate] = React.useState(0);
  const [predictions, setPredictions] = React.useState([]);
  const showSearch = React.createRef();
  const [searchResult, setSearchResult] = React.useState([]);

  const onChangeSearch = query => {
    setSearchQuery(query);
    showSearch.current.open();
    const client = algoliasearch(ALGOLIA_APP, ALGOLIA_SEARCH_KEY);
    const index = client.initIndex('Products');

    // only query string
    index.search(query, {
      clickAnalytics: true
    }).then(({ hits }) => {
      setSearchResult(hits);
      console.log(hits);
    });
  };

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const getProducts = async () => {
    const products = await client.request(GET_PRODUCTS);
    setProductsData(products.getProducts.res);
  };

  const getFeaturedProducts = async () => {
    const products = await client.request(GET_FEATURED_PRODUCTS);
    setFeaturedProducts(products.getFeaturedProducts.res);
  };

  const addProductToCartHandler = (product) => {
    addProductToCart(product);
    setCartUpdate(cartUpdate + 1);
    add_product_to_cart_event(product);
  };

  const removeProductFromCartHandler = productId => {
    removeProductFromCart(productId);
    setCartUpdate(cartUpdate + 1);
    remove_product_to_cart_event(productId);
  };

  const getLocation = async (arg) => {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyBkXZv_YS1-hZWuk30goMUvGf_d5aOsxHg&input=${arg}`
    axios
      .request({
        method: 'post',
        url: url,
      })
      .then((response) => {
        console.log(response.data);
        setPredictions(response.data.predictions);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }

  const dummyData = [
    {
      title: 'Anise Aroma Art Bazar',
      url: 'https://res.cloudinary.com/vevibes/image/upload/s--W8oWAPFG--/v1628758857/banners/banner_1_vmmamj.png',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      id: 1,
    },
    {
      title: 'Food inside a Bowl',
      url: 'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      id: 2,
    },
    {
      title: 'Vegatable Salad',
      url: 'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      id: 3,
    },
    {
      title: 'Vegatable Salad',
      url: 'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      id: 3,
    },
    {
      title: 'Anise Aroma Art Bazar',
      url: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      id: 1,
    },
    {
      title: 'Food inside a Bowl',
      url: 'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      id: 2,
    },
    {
      title: 'Vegatable Salad',
      url: 'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      id: 3,
    },
    {
      title: 'Anise Aroma Art Bazar',
      url: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      id: 1,
    },
    {
      title: 'Food inside a Bowl',
      url: 'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      id: 2,
    },
  ];

  const data = [
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531481/App%20Assets/Asset_42_yownt0.png',
      title: ['Bakery & Cakes'],
      head: "Bakery & Cakes", filter: "BC"
    },
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531481/App%20Assets/Asset_42_yownt0.png',
      title: ['Cheese'],
      head: "Cheese", filter: "CH"
    },
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531481/App%20Assets/Asset_42_yownt0.png',
      title: ['Cupboard',' Staples'],
      head: "Cupboard Staples", filter: "CS"
    },
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531482/App%20Assets/Asset_48_drfe9y.png',
      title: ['Diary & Egg', 'Alternatives'],
      head: "Diary & Egg Alternatives", filter: "DE"
    },
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531482/App%20Assets/Asset_48_drfe9y.png',
      title: ['Drinks'],
      head: "Drinks", filter: "DR"
    },
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531482/App%20Assets/Asset_48_drfe9y.png',
      title: ['Pasta & ','Noodles'],
      head: "Pasta & Noodles", filter: "PN"
    },
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531482/App%20Assets/Asset_48_drfe9y.png',
      title: ['Ready To','Cook'],
      head: "Ready To Cook", filter: "RC"
    },
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531482/App%20Assets/Asset_47_yv1ybt.png',
      title: ['Plant Based', 'Alternatives'],
      head: "Plant Based Alternatives", filter: "PB"
    },
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531482/App%20Assets/Asset_46_rnksjt.png',
      title: ['Sauces'],
      head: "Sauces", filter: "SA"
    },
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531482/App%20Assets/Asset_46_rnksjt.png',
      title: ['Snacks'],
      head: "Snacks", filter: "SN"
    },
    {
      uri: 'https://res.cloudinary.com/vevibes/image/upload/v1624531482/App%20Assets/Asset_46_rnksjt.png',
      title: ['Yogurt & Dairy'],
      head: "Yogurt & Deserts", filter: "YD"
    },
  ];

  const notification = [
    {
      title: 'Your Order no : 876909 from our store has been processed.',
      time: '22 min ago',
      img: '',
    },
    {
      title: 'Your Order no : 876909 from our store has been processed.',
      time: '22 min ago',
      img: '',
    },
    {
      title: 'Your Order no : 876909 from our store has been processed.',
      time: '22 min ago',
      img: '',
    },
    {
      title: 'Your Order no : 876909 from our store has been processed.',
      time: '22 min ago',
      img: '',
    },
    {
      title: 'Your Order no : 876909 from our store has been processed.',
      time: '22 min ago',
      img: '',
    },
    {
      title: 'Your Order no : 876909 from our store has been processed.',
      time: '22 min ago',
      img: '',
    },
    {
      title: 'Your Order no : 876909 from our store has been processed.',
      time: '22 min ago',
      img: '',
    },
    {
      title: 'Your Order no : 876909 from our store has been processed.',
      time: '22 min ago',
      img: '',
    },
    {
      title: 'Your Order no : 876909 from our store has been processed.',
      time: '22 min ago',
      img: '',
    },
    {
      title: 'Your Order no : 876909 from our store has been processed.',
      time: '22 min ago',
      img: '',
    },
    {
      title: 'Your Order no : 876909 from our store has been processed.',
      time: '22 min ago',
      img: '',
    },
    {
      title: 'Your Order no : 876909 from our store has been processed.',
      time: '22 min ago',
      img: '',
    },
  ];
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    scrollX.addListener(({ value }) => {
      if (Math.floor(value / SIZES.width) === data.length - 1) {
        setCompleted(true);
      }
    });


    getProducts();
    getFeaturedProducts();
    return () => scrollX.removeListener();
  }, []);
  useEffect(() => {
    const onBackPress = () => {
      if (location && route.name === "ProductHome") {
        return true;
      } else {
        navigation.navigate("Welcome");
        return false;
      }
    };
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [])
  const productDetails = item => {
    navigation.navigate('ProductDetails', {
      screen: 'ProductsDetails',
      product: item,
    });
  };

  const openNotification = () => {
    modalizeRef.current.open();
  };
  const openAddress = () => {
    addressRef.current.open();
  };

  return (
    <>
      <Provider>
        <ProductHeader
          navigation={navigation}
          city={location}
          notificationRef={openNotification}
          addressRef={openAddress}
          cart={cart}
        />
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              paddingTop: 20,
              flexDirection: 'row',
              padding: 5,
            }}>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <View
                  style={{
                    alignItems: 'center',
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    flex: 1,
                    borderRadius: 5,
                    borderColor: COLORS.lightGray,
                    borderWidth: 1,
                    elevation: 1
                  }}>
                  <Button
                    onPress={openMenu}
                    style={{ marginHorizontal: 0 }}
                    compact={true}>
                    Categories
                  </Button>
                  <Icon
                    onPress={openMenu}
                    name="chevron-down"
                    style={{ ...FONTS.body2, color: COLORS.primary }}
                  />
                </View>
              }>
              <Menu.Item
                style={styles.top}
                onPress={() => navigation.navigate("ProductList", { screen: "ProductList", products: productsData, title: "Bakery & Cakes", filter: "BC" })}
                title="Bakery &amp; Cakes"
              />
              <Menu.Item style={styles.top} onPress={() => navigation.navigate("ProductList", { screen: "ProductList", products: productsData, title: "Cheese", filter: "CH" })} title="Cheese" />
              <Menu.Item style={styles.top} onPress={() => navigation.navigate("ProductList", { screen: "ProductList", products: productsData, title: "Cupboard Staples", filter: "CS" })} title="Cupboard Staples" />
              <Menu.Item style={styles.top} onPress={() => navigation.navigate("ProductList", { screen: "ProductList", products: productsData, title: "Dairy & Egg Alternatives", filter: "DE" })} title="Dairy &amp; Egg Alternatives" />
              <Menu.Item style={styles.top} onPress={() => navigation.navigate("ProductList", { screen: "ProductList", products: productsData, title: "Drinks", filter: "DR" })} title="Drinks" />
              <Menu.Item style={styles.top} onPress={() => navigation.navigate("ProductList", { screen: "ProductList", products: productsData, title: "Pasta & Noodles", filter: "PN" })} title="Pasta &amp; Noodles" />
              <Menu.Item
                style={styles.top}
                onPress={() => navigation.navigate("ProductList", { screen: "ProductList", products: productsData, title: "Plant Based Alternatives", filter: "PB" })}
                title="Plant Based Alternatives"
              />
              <Menu.Item
                style={styles.top}
                onPress={() => navigation.navigate("ProductList", { screen: "ProductList", products: productsData, title: "Ready To Cook", filter: "RC" })}
                title="Ready To Cook"
              />
              <Menu.Item style={styles.top} onPress={() => navigation.navigate("ProductList", { screen: "ProductList", products: productsData, title: "Sauces", filter: "SA" })} title="Sauces" />
              <Menu.Item style={styles.top} onPress={() => navigation.navigate("ProductList", { screen: "ProductList", products: productsData, title: "Snacks", filter: "SN" })} title="Snacks" />
              <Menu.Item style={styles.top} onPress={() => navigation.navigate("ProductList", { screen: "ProductList", products: productsData, title: "Yogurt & Deserts", filter: "YD" })} title="Yogurt &amp; Deserts" />
            </Menu>
            <Searchbar
              placeholder="Search For Products"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={{
                width: '65%', elevation: 0, marginLeft: 5, borderRadius: 5,
                borderColor: COLORS.lightGray,
                borderWidth: 1,
                elevation: 1
              }}
              inputStyle={{ fontWeight: 'bold', fontSize: 13, paddingLeft: 0 }}
            />
          </View>

          <View
            style={{
              marginTop: 0,
              zIndex: -1,
            }}>
            <Carousal data={featuredProducts} />
            <View>
              <FlatList
                horizontal
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
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("ProductList", { screen: "ProductList", products: productsData, title: item.head, filter: item.filter })}>
                      <View style={{ padding: 10, flex: 1, alignItems: 'center' }}>
                        <Image
                          source={{ uri: item.uri }}
                          style={{ width: 60, height: 60 }}
                        />
                        {item.title.map((t, index) => {
                          return (
                            <Text
                              key={t + index}
                              style={{
                                ...FONTS.body4,
                                color: COLORS.primary,
                                fontWeight: 'bold',
                              }}>
                              {t}
                            </Text>
                          );
                        })}
                      </View>
                    </TouchableWithoutFeedback>
                  );
                }}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: false },
                )}
              />
            </View>
            <View>
              <View
                style={{
                  padding: 10,
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.head}>Best Selling Items</Text>
                <Text
                  style={styles.head2}
                  onPress={() => {
                    navigation.navigate('ProductList', {
                      screen: 'ProductList',
                      products: productsData, title: "Best Selling Items",
                    });
                  }}>
                  See All
                </Text>
              </View>
              <FlatList
                horizontal
                data={productsData}
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
            </View>
            <View>
              <FlatList
                data={dummyData}
                keyExtractor={(item, index) => 'key' + index}
                horizontal
                pagingEnabled
                scrollEnabled
                snapToAlignment="center"
                scrollEventThrottle={16}
                decelerationRate={'fast'}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <Card style={styles.cardView}>
                      <Image style={styles.image} source={{ uri: item.url }} resizeMode="contain" />
                      <View style={styles.textView}>
                        <Text style={styles.itemTitle}> {item.title}</Text>
                        <Text style={styles.itemDescription}>
                          {item.description}
                        </Text>
                      </View>
                    </Card>
                  );
                }}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: false },
                )}
              />
            </View>

            <View>
              <View
                style={{
                  padding: 10,
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.head}>Exclusive</Text>
                <Text
                  style={styles.head2}
                  onPress={() => {
                    navigation.navigate('ProductList', {
                      screen: 'ProductList',
                      products: featuredProducts,
                      title: "Exclusive Products"
                    });
                  }}>
                  See All
                </Text>
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
                                    ...FONTS.body3,
                                    fontWeight: 'bold',
                                  }}
                                  onPress={() => removeProductFromCart(item.id)}
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
                                  onPress={() => addProductToCart(item)}
                                />
                              </View>
                            </View>
                          ) : (
                            <Text
                              onPress={() => addProductToCart(item)}
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
                            justifyContent: 'space-evenly',
                          }}>
                          <Text style={styles.priceDisabled}>
                            {item.salePrice}
                          </Text>
                          <Text style={styles.price}>{item.price}</Text>
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
            </View>
          </View>
          <View>
            {dummyData.map((item, index) => {
              return (
                <Card style={styles.cardView} key={index + Math.random(index)}>
                  <Image style={styles.image} source={{ uri: item.url }} />
                  <View style={styles.textView}>
                    <Text style={styles.itemTitle}> {item.title}</Text>
                    <Text style={styles.itemDescription}>
                      {item.description}
                    </Text>
                  </View>
                </Card>
              );
            })}
          </View>
        </ScrollView>
        <Modalize ref={addressRef}>
          <View style={{ margin: 10, justifyContent: 'flex-start' }}>
            <TextInput
              placeholder="Enter your location"
              right={
                <TextInput.Icon
                  name="magnify"
                  color={COLORS.gray}
                  style={{ ...FONTS.h2 }}
                />
              }
              style={{
                ...FONTS.body2,
                color: COLORS.lightGray,
                borderRadius: 15,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}
              theme={{ colors: { primary: "transparent" } }}
              outlineColor="transparent"
              selectionColor={COLORS.secondary}
              underlineColor="transparent"
              onChangeText={text => getLocation(text)}
            />
            <View>
              <View style={{ flexDirection: 'row', marginTop: 30 }}>
                <Fa
                  name="location-arrow"
                  iconStyle={{ marginRight: 20 }}
                  style={{
                    ...FONTS.h2,
                    color: COLORS.primary,
                    fontWeight: 'bold',
                  }}
                />
                <View style={{ marginLeft: 20 }}>
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: COLORS.primary,
                      fontWeight: 'bold',
                    }}>
                    Use Current Location
                  </Text>
                  <Text
                    style={{
                      ...FONTS.body3,
                      color: COLORS.primary,
                    }}>
                    Using GPS
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text
                  style={{
                    ...FONTS.body2,
                    color: COLORS.primary,
                    fontWeight: 'bold',
                    marginBottom: 20,
                  }}>
                  Choose your location
                </Text>
                <FlatList
                  data={predictions}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableWithoutFeedback onPress={() => { setLocation(item.terms[0].value); addressRef.current.close() }}>
                        <View>
                          <Text
                            style={{
                              ...FONTS.body5,
                              color: COLORS.primary,
                            }}>
                            {item.description}
                          </Text>
                          <Divider style={{ marginTop: 15, marginBottom: 15, height: 2 }} />
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  }}
                  keyExtractor={(item) => item.place_id}
                />
              </View>
            </View>
          </View>
        </Modalize>
        <Modalize ref={modalizeRef}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon
                name="chevron-left"
                onPress={() => modalizeRef.current.close()}
                style={{ ...FONTS.h2, color: COLORS.primary }}
              />
              <Text
                style={{
                  ...FONTS.body2,
                  color: COLORS.primary,
                  fontWeight: 'bold',
                }}>
                Notification
              </Text>
            </View>
            <FlatList
              data={notification}
              keyExtractor={(item, index) => 'key' + index}
              vertical
              pagingEnabled
              scrollEnabled
              snapToAlignment="center"
              scrollEventThrottle={16}
              decelerationRate={'fast'}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 15,
                      borderWidth: 1,
                      borderColor: COLORS.gray,
                      padding: 5,
                      margin: 10,
                      flex: 1,
                    }}>
                    <View
                      style={{
                        width: 100,
                        height: 100,
                        backgroundColor: COLORS.lightGray,
                        borderRadius: 15,
                        marginRight: 10,
                      }}></View>
                    <View style={{ width: width - 150 }}>
                      <Text
                        style={{
                          ...FONTS.body3,
                          color: COLORS.primary,
                          fontWeight: 'bold',
                        }}>
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          ...FONTS.body3,
                          color: COLORS.lightGray,
                          marginTop: 5,
                        }}>
                        {item.time}
                      </Text>
                    </View>
                  </View>
                );
              }}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false },
              )}
            />
          </View>
        </Modalize>
        <Modalize ref={showSearch} adjustToContentHeight={true}>
          <Search results={searchResult} navigation={navigation} modalizeRef={showSearch} />
        </Modalize>
      </Provider>
    </>
  );
}
const styles = StyleSheet.create({
  top: {
    zIndex: 10,
  },
  head: {
    color: COLORS.primary,
    ...FONTS.body2,
    fontWeight: 'bold',
  },
  head2: {
    color: COLORS.secondary,
    ...FONTS.body3,
    fontWeight: 'bold',
  },
  card: {
    width: width / 2 - 20,
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
    height: width / 2,
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
    borderRadius: 5,
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
