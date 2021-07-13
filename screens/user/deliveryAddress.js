import React from 'react';

import { View, Text, FlatList, Dimensions, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Button, FAB } from 'react-native-paper';

import { CheckBox } from 'react-native-elements';

const { width, height } = Dimensions.get('window');
import theme from '../../constants/theme';
const { COLORS, FONTS, SIZES } = theme;

export default function Address({ navigation, route }) {
  const couponCode = route.params.couponCode;
  const cart = route.params.cart;
  const discount = route.params.discount;
  const total = route.params.total;
  const grandTotal = route.params.grandTotal;
  const deliveryPrice = route.params.deliveryPrice;
  const scrollX = new Animated.Value(0);
  const [checked, setChecked] = React.useState(-1);
  const data = [
    {
      name: 'Joseph',
      street: 'Baker Street',
      locality: 'Lyric Square',
      city: 'London',
      zip: 'W6 0QL',
      country: 'United Kingdom',
      phone: '+44 999-XXX-XXXX',
      countryCode: 'GB'
    },
    {
      name: 'Joseph',
      street: 'Baker Street',
      locality: 'Lyric Square',
      city: 'London',
      zip: 'W6 0QL',
      country: 'United Kingdom',
      phone: '+44 999-XXX-XXXX',
      countryCode: 'GB'
    },
    {
      name: 'Joseph',
      street: 'Baker Street',
      locality: 'Lyric Square',
      city: 'London',
      zip: 'W6 0QL',
      country: 'United Kingdom',
      phone: '+44 999-XXX-XXXX',
      countryCode: 'GB'
    },
    {
      name: 'Joseph',
      street: 'Baker Street',
      locality: 'Lyric Square',
      city: 'London',
      zip: 'W6 0QL',
      country: 'United Kingdom',
      phone: '+44 999-XXX-XXXX',
      countryCode: 'GB'
    },
    {
      name: 'Joseph',
      street: 'Baker Street',
      locality: 'Lyric Square',
      city: 'London',
      zip: 'W6 0QL',
      country: 'United Kingdom',
      phone: '+44 999-XXX-XXXX',
      countryCode: 'GB'
    },
    {
      name: 'Joseph',
      street: 'Baker Street',
      locality: 'Lyric Square',
      city: 'London',
      zip: 'W6 0QL',
      country: 'United Kingdom',
      phone: '+44 999-XXX-XXXX',
      countryCode: 'GB'
    },
  ];
  const emptyData = [];
  const goToCheckout = () => {

    if (checked !== -1) {
      navigation.navigate('Checkout', {
        screen: "Checkout",
        cart: cart,
        discount: discount,
        total: total,
        grandTotal: grandTotal,
        couponCode: couponCode,
        deliveryPrice: deliveryPrice,
        address: data[checked]
      })
    }
    else {
      return;
    }
  }
  return (
    <View style={{ height: height }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
        <Icon
          name="chevron-left"
          style={{
            ...FONTS.body1,
            color: COLORS.primary,
            fontWeight: 'bold',
            marginRight: 10,
          }}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{ ...FONTS.body2, color: COLORS.primary, fontWeight: 'bold' }}>
          Deliver Address
        </Text>
      </View>
      <View style={{ height: height - 110 }}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => 'key' + index}
          decelerationRate={'normal'}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  width: width - 20,
                  borderStyle: 'solid',
                  borderRadius: 10,
                  borderWidth: 1.5,
                  margin: 10,
                  paddingBottom: 10,
                  backgroundColor: '#ffffff',
                  borderColor: COLORS.lightGray,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    marginTop: 0,
                  }}>
                  <CheckBox
                    start
                    checkedIcon={
                      <Icon
                        name="record-circle-outline"
                        style={{ ...FONTS.body2, color: COLORS.secondary }}
                      />
                    }
                    iconType="material"
                    uncheckedIcon={
                      <Icon
                        name="circle-outline"
                        style={{ ...FONTS.body2, color: COLORS.gray }}
                      />
                    }
                    checked={checked === index}
                    onPress={() => setChecked(index)}
                  />
                  <View style={{ width: width - 100 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{ ...FONTS.body2, color: COLORS.primary }}>
                        {item.name}
                      </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <SimpleLineIcons
                          name="pencil"
                          style={{
                            ...FONTS.body2,
                            color: COLORS.gray,
                            marginRight: 10,
                          }}
                        />
                        <Icon
                          name="trash-can-outline"
                          style={{ ...FONTS.body2, color: COLORS.gray }}
                        />
                      </View>
                    </View>
                    <View>
                      <Text style={{ ...FONTS.body5, color: COLORS.lightGray }}>
                        {item.street}, {item.locality}
                      </Text>
                      <Text style={{ ...FONTS.body5, color: COLORS.lightGray }}>
                        {item.city} {item.zip},
                      </Text>
                      <Text style={{ ...FONTS.body5, color: COLORS.lightGray }}>
                        {item.country}
                      </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ ...FONTS.body5, color: COLORS.primary }}>
                          Mobile:{' '}
                        </Text>
                        <Text style={{ ...FONTS.body5, color: COLORS.lightGray }}>
                          {item.phone}
                        </Text>
                      </View>
                    </View>
                  </View>
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
      <View style={{ marginTop: '0%', margin: 10 }}>
        <FAB
          style={{
            position: 'absolute',
            bottom: 50,
            right: 0,
            fontWeight: 'bold',
            elevation: 0,
            backgroundColor: COLORS.secondary,
          }}
          small
          color={COLORS.white}
          icon="plus"
          onPress={() => navigation.navigate('AddAddress')}
        />
        <Button
          mode="flat"
          style={{ backgroundColor: COLORS.secondary }}
          onPress={goToCheckout}>
          <Text
            style={{ ...FONTS.body5, color: COLORS.white, fontWeight: 'bold' }}>
            Delivery to this address
          </Text>
        </Button>
      </View>
    </View>
  );
}
