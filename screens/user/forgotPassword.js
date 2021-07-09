import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import { Button} from 'react-native-elements';
import {TextInput} from 'react-native-paper';

import theme from '../../constants/theme';
const {COLORS, FONTS} = theme;

const ForgotPassword = ({navigation}) => {
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
          Forgot Password
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
          <TextInput
            label="Phone Number"
            placeholder="9897XXXXXX"
            underlineColor="transparent"
            keyboardType="numeric"
          />
        </View>
        <Button
          title="Next"
          containerStyle={{
            padding: 10,
            color: COLORS.primary,
          }}
          onPress={() => {
            navigation.navigate('ChangePassword');
          }}
        />
      </View>
    </>
  );
};

export default ForgotPassword;
