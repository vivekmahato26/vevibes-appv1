import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import {Button} from 'react-native-elements';

import OTPTextInput  from "react-native-otp-textinput";

import theme from '../../constants/theme';
const {COLORS, FONTS} = theme;

const Verify = ({navigation}) => {
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
          Verify Account
        </Text>
        <Text
          style={{
            ...FONTS.body2,
            color: COLORS.primary,
            paddingLeft: 10,
            marginTop: 10,
          }}>
          Please type the verification code sent to +44 9999XXXX
        </Text>
        <View style={{marginTop: 80, padding:20}}>
          <OTPTextInput inputCount={4} defaultValue="----" tintColor={"transparent"} offTintColor={"transparent"} textInputStyle={{
              borderRadius:10,
              backgroundColor: "#e2e2e2"
          }}/>
        </View>
        <Button
          title="Verify Account"
          containerStyle={{
            padding: 10,
            color: COLORS.primary,
          }}
          onPress={() =>{navigation.navigate("ChangePassword")}}
        />
      </View>
    </>
  );
};

export default Verify;
