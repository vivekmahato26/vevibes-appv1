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

import Fa from 'react-native-vector-icons/FontAwesome';

import _ from 'lodash';

import ProductHeader from '../../components/productHeader';

import { Modalize } from 'react-native-modalize';

import {
  GET_PRODUCTS,
  client,
  GET_FEATURED_PRODUCTS,
} from '../../constants/graphql';

import Carousal from '../../components/carousal/carousal';
import { Image } from 'react-native';
import theme from '../../constants/theme';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const { COLORS, FONTS, SIZES } = theme;


const { width, height } = Dimensions.get('window');

import { ADD_PRODUCT, REMOVE_PRODUCT, shopReducer } from "../../constants/cart";

export default function ProductHome({ route, navigation }) {
  let tempCity = '';
  if (route.params) {
    tempCity = route.params.city;
  }
  const modalizeRef = React.createRef();
  const addressRef = React.createRef();
  const scrollX = new Animated.Value(0);
  const [city, setCity] = React.useState(tempCity);
  const [visible, setVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [productsData, setProductsData] = React.useState([]);
  const [featuredProducts, setFeaturedProducts] = React.useState([]);
  const [cart, dispatch] = useReducer(shopReducer, []);
  const [counter, setCounter] = React.useState(0);

  const onChangeSearch = query => setSearchQuery(query);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const getProducts = async () => {
    const products = await client.request(GET_PRODUCTS);
    setProductsData(products.getProducts);
  };

  const getFeaturedProducts = async () => {
    const products = await client.request(GET_FEATURED_PRODUCTS);
    setFeaturedProducts(products.getFeaturedProducts);
  };

  const addProductToCart = product => {
      dispatch({ type: ADD_PRODUCT, product: product });
  };

  const removeProductFromCart = productId => {
      dispatch({ type: REMOVE_PRODUCT, productId: productId });
  };

  const dummyData = [
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

    if (route.params) {
      if (route.params.city) {
        setCity(route.params.city);
      }
    }
    getProducts();
    getFeaturedProducts();
    return () => scrollX.removeListener();
  }, []);
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



  // const removeFromCart = (item) => {
  //   var index = _.findIndex(cart, function (o) {
  //     return o.item.id == item.id;
  //   });
  //   var tempCart = cart;
  //   if(tempCart[index].quantity === 1) {
  //     tempCart = tempCart.splice(index, 1);
  //   } else {
  //     tempCart[index].quantity = tempCart[index].quantity - 1 ;
  //   }
  //   setCart((prev) => (tempCart));
  // }

  // const addToCart = item => {
  //   var index = _.findIndex(cart, function (o) {
  //     return o.item.id == item.id;
  //   });
  //   var tempCart = cart;
  //   if (index === -1) {
  //     tempCart.push({
  //       item,
  //       quantity:1,
  //     });
  //   } else {
  //     tempCart[index].quantity = tempCart[index].quantity + 1 ;
  //   }
  //   setCart((prev) => {
  //     return tempCart;
  //   });
  // };
  return (
    <>
      <Provider>
        <ProductHeader
          navigation={navigation}
          city={city}
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
                onPress={() => { }}
                title="Food &amp; Drink"
              />
              <Menu.Item
                style={styles.top}
                onPress={() => { }}
                title="Household"
              />
              <Menu.Item style={styles.top} onPress={() => { }} title="Pets" />
              <Menu.Item style={styles.top} onPress={() => { }} title="Beauty" />
              <Menu.Item
                style={styles.top}
                onPress={() => { }}
                title="Dietary Options"
              />
              <Menu.Item style={styles.top} onPress={() => { }} title="Brands" />
            </Menu>
            <Searchbar
              placeholder="Search For Products"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={{ width: '60%', elevation: 0, marginLeft: 5 }}
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
                      products: productsData,
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
                  console.log(cart.findIndex(
                    product => product.product.id === item.id
                  ));
                  return (
                    <Card style={[styles.card]}>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          productDetails(item);
                        }}
                        containerStyle={{ flex: 1 }}>
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
                            {item.offerPrice}
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
                      <Image style={styles.image} source={{ uri: item.url }} />
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
                      products: productsData,
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
                      <Card.Cover
                        style={styles.cardImg}
                        source={{ uri: item.img[0] }}
                      />
                      <TouchableWithoutFeedback
                        onPress={() => {
                          productDetails(item);
                        }}
                        containerStyle={{ flex: 1 }}>
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
                            {item.offerPrice}
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
              left={
                <TextInput.Icon
                  name="chevron-left"
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
              outlineColor="transparent"
              selectionColor="transparent"
              underlineColor="transparent"
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
                <Text
                  style={{
                    ...FONTS.body5,
                    color: COLORS.primary,
                  }}>
                  Digbeth
                </Text>
                <Divider style={{ marginTop: 15, marginBottom: 15, height: 2 }} />
                <Text
                  style={{
                    ...FONTS.body5,
                    color: COLORS.primary,
                  }}>
                  Erdington
                </Text>
                <Divider style={{ marginTop: 15, marginBottom: 15, height: 2 }} />
                <Text
                  style={{
                    ...FONTS.body5,
                    color: COLORS.primary,
                  }}>
                  Digbeth
                </Text>
                <Divider style={{ marginTop: 15, marginBottom: 15, height: 2 }} />
                <Text
                  style={{
                    ...FONTS.body5,
                    color: COLORS.primary,
                  }}>
                  Erdington
                </Text>
                <Divider style={{ marginTop: 15, marginBottom: 15, height: 2 }} />
                <Text
                  style={{
                    ...FONTS.body5,
                    color: COLORS.primary,
                  }}>
                  Digbeth
                </Text>
                <Divider style={{ marginTop: 15, marginBottom: 15, height: 2 }} />
                <Text
                  style={{
                    ...FONTS.body5,
                    color: COLORS.primary,
                  }}>
                  Erdington
                </Text>
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
    width: width / 2 - 40,
    margin: 10,
    backgroundColor: COLORS.white,
    padding: 10,
    borderColor: COLORS.lightGray,
    borderWidth:2,
    borderRadius: 10,
    elevation:2
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
    ...FONTS.body3,
    color: COLORS.secondary,
  },
  priceDisabled: {
    ...FONTS.body3,
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
