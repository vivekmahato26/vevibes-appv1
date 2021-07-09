import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import {homeStyle} from '../../constants/styles';

import theme from '../../constants/theme';
const {COLORS, FONTS, SIZES} = theme;

const Register = ({navigation}) => {
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
          Create New Account
        </Text>
        <Text
          style={{
            ...FONTS.body5,
            color: COLORS.primary,
            paddingLeft: 10,
            marginTop: 10,
          }}>
          Please enter all details to create new account
        </Text>
        <View style={{marginTop: 80}}>
          <Input placeholder="Name" />
          <Input placeholder="Email ID" />
          <Input placeholder="Password" rightIcon={<Icon name="eye" />} />
          <Input
            placeholder="Confirm Password"
            rightIcon={<Icon name="eye" />}
          />
        </View>
        <Button
          title="SIGN UP"
          containerStyle={{
            padding: 10,
            color: COLORS.primary,
          }}
          onPress={() =>{navigation.navigate("Mobile")}}
        />
        <Text
          style={{
            ...FONTS.body3,
            color: COLORS.primary,
            paddingTop: 10,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Already have an account ?
        </Text>
        <Text
          style={{
            ...FONTS.body3,
            color: COLORS.primary,
            paddingTop: 20,
            textAlign: 'center',
          }}>
          By creating an account, you are agreeing
        </Text>
        <Text
          style={{
            ...FONTS.body3,
            color: COLORS.primary,
            textAlign: 'center',
          }}>
          to our{' '}
          <Text style={{textDecorationLine: 'underline'}}>
            Terms and Conditions
          </Text>
        </Text>
      </View>
    </>
  );
};

export default Register;
