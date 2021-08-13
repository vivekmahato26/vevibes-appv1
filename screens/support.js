import React from 'react';

import {View, Text, Image, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import theme from '../constants/theme';
const {COLORS, FONTS, SIZES} = theme;

const {width, height} = Dimensions.get('window');
export default function Support({ navigation}) {
  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name="chevron-left"
          style={{...FONTS.h2, color: COLORS.primary}}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{color: COLORS.primary, ...FONTS.body2, fontWeight: 'bold'}}>
          Support
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: 'https://res.cloudinary.com/vevibes/image/upload/v1625226040/App%20Assets/support_pwr8qi.png',
          }}
          style={{width: width / 2, height: width / 2}}
        />
        <Text
          style={{
            color: COLORS.primary,
            ...FONTS.h2,
            fontWeight: 'bold',
            marginTop: 20,
            marginBottom: 20,
          }}>
          Get Support
        </Text>
        <Text style={{color: COLORS.lightGray, ...FONTS.body3}}>
          For any support regarding your
        </Text>
        <Text style={{color: COLORS.lightGray, ...FONTS.body3}}>
          orders or deliveries please feel free to
        </Text>
        <Text style={{color: COLORS.lightGray, ...FONTS.body3}}>
          speak with us at below.
        </Text>
        <Text
          style={{
            color: COLORS.primary,
            ...FONTS.body3,
            fontWeight: 'bold',
            marginTop: 60,
          }}>
          Call us - 0333 333 3333
        </Text>
        <Text
          style={{color: COLORS.primary, ...FONTS.body3, fontWeight: 'bold'}}>
          Mail us - info@vevibes.com
        </Text>
      </View>
    </View>
  );
}
