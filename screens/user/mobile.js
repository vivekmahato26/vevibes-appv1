import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import theme from '../../constants/theme';
const {COLORS, FONTS} = theme;

const Mobile = ({navigation}) => {
  return (
    <>
      <View>
        <Text
          style={{
            ...FONTS.h5,
            color: COLORS.primary,
            marginTop: 60,
            paddingLeft: 10,
            fontWeight: 'bold',
          }}>
          Your Mobile Number
        </Text>
        <Text
          style={{
            ...FONTS.body2,
            color: COLORS.primary,
            paddingLeft: 10,
            marginTop: 10,
          }}>
          We will send an SMS with an confirmation code to this number
        </Text>
        <View style={{marginTop: 80}}>
          <Input placeholder="Phone Number" />
        </View>
        <Button
          title="Next"
          containerStyle={{
            padding: 10,
            color: COLORS.primary,
          }}
          onPress={() =>{navigation.navigate("Verify")}}
        />
      </View>
    </>
  );
};

export default Mobile;
