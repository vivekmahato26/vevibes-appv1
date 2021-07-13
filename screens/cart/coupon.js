import React from 'react';

import {
  View,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  Animated,
  TouchableHighlight,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');
import theme from '../../constants/theme';
const { COLORS, FONTS, SIZES } = theme;

export default function Coupon({ navigation }) {
  const scrollX = new Animated.Value(0);
  const data = [
    {
      name: 'Get 15% Off',
      description: 'Get £15 off on purchase of £100 and above',
      code: 'VEGAN15',
      discount: 15,
      percent: true,
      minCartPrice: 100
    },
    {
      name: 'Get £5 Off',
      description: 'Get £5 off on purchase of £50 and above',
      code: 'VEVIBES5',
      discount: 5,
      percent: false,
      minCartPrice: 50
    },
    {
      name: 'Get £15 Off',
      description: 'Get £15 off on purchase of £10 and above',
      code: 'VEGAN10',
      discount: 10,
      percent: true,
      minCartPrice: 10
    },
    {
      name: 'Get £15 Off',
      description: 'Get £15 off on purchase of £100 and above',
      code: 'VEGAN20',
      discount: 20,
      percent: true,
      minCartPrice: 80
    },
    {
      name: 'Get £15 Off',
      description: 'Get £15 off on purchase of £100 and above',
      code: 'VEGAN50',
      discount: 50,
      percent: true,
      minCartPrice: 100
    },
  ];
  return (
    <>
      <View style={{ flexDirection: 'row', margin: 10, marginTop: 20 }}>
        <Icon
          name="chevron-left"
          style={{
            ...FONTS.h2,
            color: COLORS.primary,
            fontWeight: 'bold',
          }}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.primary,
            fontWeight: 'bold',
            marginLeft: 20,
          }}>
          Apply Coupon
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          backgroundColor: '#f2f2f2',
          padding: 25,
        }}>
        <TextInput
          mode="outlined"
          theme={{
            roundness: 10,
            colors: {
              primary: COLORS.primary,
              secondary: COLORS.lightGray,
            },
          }}
          label="Enter coupon code"
          selectionColor={COLORS.primary}
          outlineColor={COLORS.lightGray}
          style={{ fontWeight: 'bold', color: COLORS.lightGray }}
        />
      </View>
      <View style={{flex:1}}>
        <Text
          style={{
            ...FONTS.body2,
            color: COLORS.primary,
            margin: 10,
          }}>
          Available Coupons
        </Text>
        <FlatList
          data={data}
          keyExtractor={(item, index) => 'key' + index}
          decelerationRate={'normal'}
          scrollEventThrottle={16}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  width: width - 20,
                  borderStyle: 'dashed',
                  borderRadius: 5,
                  borderWidth: 1.5,
                  margin: 10,
                  padding: 10,
                  backgroundColor: '#ffffff',
                  borderColor: COLORS.lightGray,
                }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        ...FONTS.body3,
                        fontWeight: 'bold',
                        color: COLORS.primary,
                      }}>
                      {item.name}
                    </Text>
                    <Button
                      onPress={() => navigation.navigate('Cart', { screen: 'cart', coupon: item.code, discount: item.discount, percent: item.percent, minCartPrice: item.minCartPrice })}
                      theme={{ colors: { primary: COLORS.white }, roundness: 10 }}
                      style={{
                        backgroundColor: COLORS.secondary,
                      }}>
                      <Text style={{ fontWeight: "bold" }}>{item.code}</Text>
                    </Button>
                  </View>
                  <Text
                    style={{
                      ...FONTS.body3,
                      color: COLORS.gray,
                    }}>
                    {item.description}
                  </Text>
                </View>
              </View>
            );
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX, y: scrollX } } }],
            { useNativeDriver: false },
          )}
        />
      </View>
    </>
  );
}
