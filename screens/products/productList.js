import React, { useState } from 'react';

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
} from 'react-native';
import { Button, Card, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Fa from "react-native-vector-icons/FontAwesome";

import theme from '../../constants/theme';
const { COLORS, FONTS, SIZES } = theme;

const { width, height } = Dimensions.get('window');

export default function ProductList({ navigation, route }) {
  const products = route.params.products;
  console.log(products);
  const scrollX = new Animated.Value(0);
  const [viewStyle, setViewStyle] = useState('th-large');
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
  }, []);
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
          <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
            <Icon name="chevron-left" style={styles.icon} onPress={() => navigation.goBack()}/>
            <Text
              style={{ ...FONTS.h3, color: COLORS.primary, fontWeight: 'bold' }}>
              Best Selling Items
            </Text>
          </View>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Icon
              name="magnify"
              style={[styles.icon, { padding: 5, marginRight: 5 }]}
            />
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
                return (
                  <Card style={styles.card} onPress={() => productDetails(item)}>
                    <View
                      style={{
                        backgroundColor: COLORS.lightGray,
                        borderRadius: 25,
                        padding: 5,
                        marginRight: 0,
                      }}>
                      <Icon
                        name="heart-outline"
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          ...FONTS.body3,
                          color: COLORS.primary,
                          elevation: 1
                        }}
                      />
                      <Image
                        style={styles.cardImg}
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
                        }}>
                        {item.name}
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
                        <Text style={styles.priceDisabled}>£{item.price}</Text>
                        {item.offerPrice && (
                          <Text style={styles.price}>£{item.offerPrice}</Text>
                        )}
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
                          name="heart-outline"
                          style={{
                            position: 'absolute',
                            top: 5,
                            right: 5,
                            ...FONTS.body3,
                            color: COLORS.primary,
                            elevation: 1
                          }}
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
                            <Text style={styles.priceDisabled}>
                              £{item.price}
                            </Text>
                            {item.offerPrice && (
                              <Text style={styles.price}>
                                £{item.offerPrice}
                              </Text>
                            )}
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
    ...FONTS.body3,
    color: COLORS.secondary,
  },
  priceDisabled: {
    ...FONTS.body3,
    color: COLORS.gray,
    textDecorationLine: 'line-through',
  },
});
