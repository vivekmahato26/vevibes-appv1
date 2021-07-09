import React, {useState} from 'react';

import {View, ScrollView, Text, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import theme from '../../constants/theme';
const {COLORS, FONTS, SIZES} = theme;
const {width, height} = Dimensions.get('window');

export default function Orders({navigation}) {
  const data = [
    {
      orderId: 8765945,
      date: '26June - 01:21 PM',
      status: 'Processing',
      step: 'On the way',
      items: 4,
      price: '£24',
    },
    {
      orderId: 8765945,
      date: '26June - 01:21 PM',
      status: 'Processing',
      step: 'On the way',
      items: 4,
      price: '£24',
    },
    {
      orderId: 8765945,
      date: '26June - 01:21 PM',
      status: 'Processing',
      step: 'On the way',
      items: 4,
      price: '£24',
    },
    {
      orderId: 8765945,
      date: '26June - 01:21 PM',
      status: 'Processing',
      step: 'On the way',
      items: 4,
      price: '£24',
    },
    {
      orderId: 8765945,
      date: '26June - 01:21 PM',
      status: 'Processing',
      step: 'On the way',
      items: 2,
      price: '£24',
    },
    {
      orderId: 8765945,
      date: '26June - 01:21 PM',
      status: 'Completed',
      step: 'On the way',
      items: 3,
      price: '£24',
    },
    {
      orderId: 8765945,
      date: '26June - 01:21 PM',
      status: 'Processing',
      step: 'Pickup',
      items: 4,
      price: '£24',
    },
    {
      orderId: 8765945,
      date: '26June - 01:21 PM',
      status: 'Processing',
      step: 'Cancelled',
      items: 4,
      price: '£24',
    },
    {
      orderId: 8765945,
      date: '26June - 01:21 PM',
      status: 'Ongoing',
      step: 'On the way',
      items: 4,
      price: '£24',
    },
    {
      orderId: 8765945,
      date: '26June - 01:21 PM',
      status: 'Processing',
      step: 'On the way',
      items: 4,
      price: '£24',
    },
  ];
  return (
    <View style={{flex: 1, margin: 10}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 30,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name="chevron-left"
            style={{...FONTS.h2, color: COLORS.primary}}
          />
          <Text
            style={{...FONTS.body2, color: COLORS.primary, fontWeight: 'bold'}}>
            Orders
          </Text>
        </View>
        <Icon name="magnify" style={{...FONTS.h2, color: COLORS.primary}} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          backgroundColor: '#f4f4f4',
          borderRadius: 20,
          padding: 20,
          marginBottom: 20,
        }}>
        <Text
          style={{...FONTS.body3, color: COLORS.primary, fontWeight: 'bold'}}>
          All
        </Text>
        <Text
          style={{...FONTS.body3, color: COLORS.primary, fontWeight: 'bold'}}>
          Ongoing
        </Text>
        <Text
          style={{...FONTS.body3, color: COLORS.primary, fontWeight: 'bold'}}>
          Processing
        </Text>
        <Text
          style={{...FONTS.body3, color: COLORS.primary, fontWeight: 'bold'}}>
          Completed
        </Text>
      </View>
      <ScrollView>
        {data.map((d, index) => {
          return (
            <View
              key={d.orderId + index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.lightGray,
              }}>
              <View
                style={{
                  backgroundColor: COLORS.secondary,
                  width: width * 0.03,
                  height: '100%',
                  borderBottomLeftRadius: 10,
                  borderTopLeftRadius: 10,
                }}></View>
              <View style={{margin: 10}}>
                <View
                  style={{
                    width: width - 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      ...FONTS.body3,
                      color: COLORS.primary,
                      fontWeight: 'bold',
                    }}
                    onPress={() =>navigation.navigate("OrderDetails")}
                    >
                    Order no : {d.orderId}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.body3,
                      color: COLORS.primary,
                      fontWeight: 'bold',
                    }}>
                    {d.status}
                  </Text>
                </View>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.gray,
                  }}>
                  {d.date}
                </Text>
                <View
                  style={{
                    width: width - 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      ...FONTS.body3,
                      color: COLORS.gray,
                    }}>
                    {d.step}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.body3,
                      color: COLORS.gray,
                    }}>
                    Item X {d.items} ={' '}
                    <Text
                      style={{
                        ...FONTS.body3,
                        color: COLORS.secondary,
                        fontWeight: 'bold',
                      }}>
                      {d.price}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
