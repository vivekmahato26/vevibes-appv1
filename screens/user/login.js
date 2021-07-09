import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import {homeStyle} from '../../constants/styles';

import theme from '../../constants/theme';
const {COLORS, FONTS, SIZES} = theme;

const Login = ({navigation}) => {
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
          Welcome!
        </Text>
        <Text
          style={{
            ...FONTS.h5,
            color: COLORS.primary,
            paddingLeft: 10,
            fontWeight: 'bold',
            marginTop: 5,
          }}>
          Good to see you
        </Text>
        <Text
          style={{
            ...FONTS.body2,
            color: COLORS.primary,
            paddingLeft: 10,
            marginTop: 10,
          }}>
          Login to access to VeVibes
        </Text>
        <View style={{marginTop: 80}}>
          <Input placeholder="Email ID" />
          <Input placeholder="Password" rightIcon={<Icon name="eye" />} />
          <Text
            style={{
              textAlign: 'right',
              paddingRight: 10,
              color: COLORS.primary,
              ...FONTS.body3,
              paddingBottom: 10,
              fontWeight: 'bold',
            }}>
            Forgot Password?
          </Text>
        </View>
        <Button
          title="SIGN IN"
          containerStyle={{
            padding: 10,
            color: COLORS.primary,
          }}
          onPress={() => {
            navigation.navigate('Register');
          }}
        />
        <Text
          style={{
            ...FONTS.body3,
            color: COLORS.primary,
            paddingTop: 10,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Don't have an account? Sign Up
        </Text>
      </View>
    </>
  );
};

export default Login;
