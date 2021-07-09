import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';

import theme from '../../constants/theme';
const {COLORS, FONTS} = theme;

const ChangePassword = ({navigation}) => {
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
          Change Password
        </Text>
        <Text
          style={{
            ...FONTS.body2,
            color: COLORS.primary,
            paddingLeft: 10,
            marginTop: 10,
          }}>
          Enter your new password
        </Text>
        <View style={{marginTop: 80}}>
          <Input placeholder="Password" />
          <Input placeholder="Confirm Password" />
        </View>
        <Button
          title="Change"
          containerStyle={{
            padding: 10,
            color: COLORS.primary,
          }}
          onPress={() =>{navigation.navigate("ForgotPassword")}}
        />
      </View>
    </>
  );
};

export default ChangePassword;
