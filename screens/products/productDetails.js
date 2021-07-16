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
} from 'react-native';
import {DataTable, Card, Title, Button} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../constants/theme';
const {COLORS, FONTS, SIZES} = theme;

const {width, height} = Dimensions.get('window');

export default function ProductDetails({navigation, route}) {
  const product = route.params.product;
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
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
  const productDetails = () => {
    navigation.navigate('ProductDetails');
  };
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

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
            renderItem={({item}) => {
              return (
                <View style={{padding: 10, flex: 1, alignItems: 'center'}}>
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
                    source={{uri: item}}
                    style={{width: width - 20, height: 200, zIndex: -1}}
                  />
                </View>
              );
            }}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
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
              {justifyContent: 'space-between', padding: 10},
            ]}>
            <View style={[styles.flexView, {justifyContent: 'flex-start'}]}>
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
              name="heart-outline"
              style={{
                ...FONTS.h2,
                color: COLORS.primary,
              }}
            />
          </View>
          <View
            style={[
              styles.flexView,
              {justifyContent: 'space-between', padding: 10},
            ]}>
            <Text style={styles.head}>{product.name}</Text>
            <View style={[styles.flexView, {justifyContent: 'flex-end'}]}>
              {product.salePrice && <Text>£{product.salePrice}</Text>}
              <Text style={styles.head2}>£{product.price}</Text>
            </View>
          </View>
          <View style={{padding: 10}}>
            <Text style={styles.head}>Description</Text>
            <Text style={{...FONTS.body3}}>{product.description}</Text>
          </View>
          <View style={{padding: 10}}>
            <View style={[styles.flexView, {justifyContent: 'space-between'}]}>
              <Text style={styles.head}>Ingredients</Text>
              <Icon name="chevron-up" style={[styles.head2, {...FONTS.h2}]} />
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
          <View style={{padding: 10}}>
            <View style={[styles.flexView, {justifyContent: 'space-between'}]}>
              <Text style={styles.head}>Nutrition Values</Text>
              <Icon name="chevron-up" style={[styles.head2, {...FONTS.h2}]} />
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
          <View style={{padding: 10}}>
            <View style={[styles.flexView, {justifyContent: 'space-between'}]}>
              <Text style={styles.head}>Delivery</Text>
              <Icon name="chevron-up" style={[styles.head2, {...FONTS.h2}]} />
            </View>
            <Animated.View>
              <Text>
                Lorem ipsum and companyLorem ipsum dolor sit amet, consectetuer
                adipiscing elit, sed diam nonummy nibh euismod tincid
              </Text>
            </Animated.View>
          </View>
          <View style={{padding: 10}}>
            <View style={[styles.flexView, {justifyContent: 'space-between'}]}>
              <Text style={styles.head}>Allergens</Text>
              <Icon name="chevron-up" style={[styles.head2, {...FONTS.h2}]} />
            </View>
            <Animated.View>
              <Text style={{...FONTS.body3}}>{product.allergen}</Text>
            </Animated.View>
          </View>
          <View style={{padding: 10}}>
            <View style={[styles.flexView, {justifyContent: 'space-between'}]}>
              <Text style={styles.head}>Disclaimer</Text>
              <Icon name="chevron-up" style={[styles.head2, {...FONTS.h2}]} />
            </View>
            <Animated.View>
              <Text style={{...FONTS.body3}}>
                {product.disclaimer}
              </Text>
            </Animated.View>
          </View>
        </View>
        <View style={{padding: 10}}>
          <View style={[styles.flexView, {justifyContent: 'space-between'}]}>
            <Text style={styles.head}>Related Products</Text>
            <Text style={styles.head2}>See All</Text>
          </View>
          <FlatList
            horizontal
            data={relatedProducts}
            keyExtractor={(item, index) => 'key' + index}
            pagingEnabled
            scrollEnabled
            decelerationRate={0}
            scrollEventThrottle={16}
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <Card style={styles.card} onPress={productDetails}>
                  <Card.Cover style={styles.cardImg} source={{uri: item.uri}} />
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
                  </View>
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
                        justifyContent: 'space-evenly',
                      }}>
                      <Text style={styles.priceDisabled}>£45</Text>
                      <Text style={styles.price}>£30</Text>
                    </View>
                  </View>
                </Card>
              );
            }}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
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
              />
            </View>
            <Button
              style={[styles.button, {borderRadius: 5, width: width - 80}]}
              mode="contained"
              onPress={() => {
                navigation.navigate('Cart');
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
  flexView: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  dotView: {flexDirection: 'row', justifyContent: 'center'},
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
    marginEnd: 10,
  },
  cardView: {
    width: width - 20,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
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
    shadowOffset: {width: 0.8, height: 0.8},
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
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
});
