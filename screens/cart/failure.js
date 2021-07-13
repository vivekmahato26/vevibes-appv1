import React from 'react';

import {View, Image, ScrollView, Dimensions, Text} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

import theme from '../../constants/theme';
const {COLORS, FONTS, SIZES} = theme;

export default function Failure({navigation}) {
  return (
    <View style={{flex: 1}}>
      <Icon
        name="close-thick"
        style={{...FONTS.h2, color: COLORS.primary, margin: 10}}  onPress={() => navigation.navigate('ProductHome')}
      />
      <View
        style={{
          flex: 1,
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/vevibes/image/upload/v1625132437/App%20Assets/Asset_12_w3bsog.png',
            }}
            style={{width: width / 2 - 60, height: 200}}
          />
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.primary,
              fontWeight: 'bold',
              marginBottom: 20,
              marginTop: 20,
            }}>
            Oops! Order Failed
          </Text>
          <Text style={{...FONTS.body2, color: COLORS.primary}}>
            Something went terribly wrong
          </Text>
          <Text
            style={{...FONTS.body2, color: COLORS.secondary, marginTop: 20}}>
            Please try again
          </Text>
        </ScrollView>
        <Button
          style={{
            backgroundColor: COLORS.secondary,
            borderRadius: 50,
            marginTop: 20,
            paddingLeft: 10,
            paddingRight: 10,
            marginBottom: 20,
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
