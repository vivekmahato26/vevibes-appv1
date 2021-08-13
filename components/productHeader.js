import React from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import {Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import theme from '../constants/theme';
const {COLORS, FONTS} = theme;

export default function ProductHeader({
  navigation,
  city,
  notificationRef,
  addressRef,
  cart,
}) {
  return (
    <>
      <Appbar.Header style={{backgroundColor: COLORS.white, elevation: 0}}>
        <Appbar.Action
          icon="menu"
          color={COLORS.primary}
          onPress={navigation.openDrawer}
        />
        <TouchableWithoutFeedback onPress={addressRef}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.primary,
                fontWeight: 'bold',
              }}>
              {city}
            </Text>
            <Image
              source={{
                uri: 'https://res.cloudinary.com/vevibes/image/upload/v1625564830/App%20Assets/ic_pencil_fes7ft.png',
              }}
              style={{width: 15, height: 15, marginLeft: 10}}
              resizeMode="contain"
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={notificationRef}>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/vevibes/image/upload/v1625564830/App%20Assets/notifications_ic_g4r6fv.png',
            }}
            style={{width: 30, height: 30}}
            resizeMode="contain"
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate('Cart', {screen: 'Cart', cart: cart})
          }>
          <View>
            <Image
              source={{
                uri: 'https://res.cloudinary.com/vevibes/image/upload/v1625564830/App%20Assets/cart_ic_eug3ll.png',
              }}
              style={{width: 30, height: 30, marginRight: 10}}
              resizeMode="contain"
            />
            {cart && cart.length !== 0 && (
              <View
                style={{
                  ...FONTS.h4,
                  color: COLORS.white,
                  position: 'absolute',
                  right: 10,
                  top: 5,
                  backgroundColor: 'red',
                  borderRadius: 100,
                  width: 10,
                  fontSize: 10,
                  height: '20%',
                  textAlign: 'center',
                  textAlignVertical: 'top',
                }}></View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </Appbar.Header>
    </>
  );
}
