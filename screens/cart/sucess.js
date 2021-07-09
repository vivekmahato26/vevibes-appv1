import React from 'react';

import {View, Image, ScrollView, Dimensions, Text} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

import theme from '../../constants/theme';
const {COLORS, FONTS, SIZES} = theme;

export default function Sucess({navigation}) {
  return (
    <View style={{flex: 1}}>
      <Icon
        name="close-thick"
        style={{...FONTS.h2, color: COLORS.primary, margin: 10}}
      />
      <View
        style={{
          flex: 1,
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: 'https://res.cloudinary.com/vevibes/image/upload/v1625132437/App%20Assets/Asset_13_zvoli9.png',
          }}
          style={{width: width / 2, height: 200}}
        />
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.primary,
            fontWeight: 'bold',
            marginBottom: 20,
            marginTop: 20,
          }}>
          Thank You!
        </Text>
        <Text style={{...FONTS.body2, color: COLORS.primary}}>
          Your order has been placed and
        </Text>
        <Text style={{...FONTS.body2, color: COLORS.primary, marginBottom: 20}}>
          is on it's way to being processed
        </Text>
        <View
          style={{
            backgroundColor: '#f4f4f4',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: COLORS.lightGray,
            width: width - 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 20,
            marginBottom: 20,
          }}>
          <View>
            <Text style={{...FONTS.body3, color: COLORS.primary}}>
              Order Number
            </Text>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.secondary,
                fontWeight: 'bold',
              }}>
              #4567865365
            </Text>
          </View>
          <View>
            <Text style={{...FONTS.body3, color: COLORS.primary}}>Date</Text>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.secondary,
                fontWeight: 'bold',
              }}>
              11 June, 10:00 am 2021
            </Text>
          </View>
        </View>
        <Text
          style={{...FONTS.body2, color: COLORS.secondary, fontWeight: 'bold'}}>
          Track Your Order
        </Text>
        <Button
          style={{
            backgroundColor: COLORS.secondary,
            borderRadius: 50,
            marginTop: 20,
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <Text
            style={{...FONTS.body2, color: COLORS.white, fontWeight: '500'}}>
            Back To Home
          </Text>
        </Button>
      </View>
    </View>
  );
}
