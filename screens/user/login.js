import React, { useContext, useRef } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Button, TextInput } from 'react-native-paper';

import Auth from "../../constants/context/auth";


import theme from '../../constants/theme';
const { COLORS, FONTS, SIZES } = theme;

const Login = ({ navigation }) => {
  const { login } = useContext(Auth);
  const emailRef = useRef();
  const passwordRef = useRef();

  const handlelogin = () => {
    const variables = {
      input: { 
        email: emailRef.current.state.value,
        password: passwordRef.current.state.value,
      }
    }
    const res = login(variables);
    if(res) {
      navigation.goBack();
    }
  }
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
          Login to access VeVibes
        </Text>
        <View style={{ marginTop: 80 }}>
          <TextInput placeholder="Email ID" label="Email*" ref={emailRef} 
          theme={{
            colors: { text: COLORS.primary, primary: COLORS.primary },
          }}
            name="email"
            style={{
              margin:10,
              marginBottom: 20,
              backgroundColor: COLORS.white,
              ...FONTS.body3,
              color: COLORS.primary,
              fontWeight: 'bold',
            }}
            selectionColor={COLORS.lightGray}
            outlineColor={COLORS.lightGray}
            underlineColor={COLORS.lightGray} />
          <TextInput placeholder="Password" label="Password*" rightIcon={<Icon name="eye" />} ref={passwordRef} 
          theme={{
            colors: { text: COLORS.primary, primary: COLORS.primary },
          }}
            name="password"
            style={{
              margin:10,
              marginBottom: 20,
              backgroundColor: COLORS.white,
              ...FONTS.body3,
              color: COLORS.primary,
              fontWeight: 'bold',
            }}
            selectionColor={COLORS.primary}
            outlineColor={COLORS.lightGray}
            underlineColor={COLORS.primary} />
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
          style={{
            margin: 10,
            backgroundColor: COLORS.secondary,
          }}
          onPress={handlelogin}
        >
          <Text style={{
            ...FONTS.body2,
            color: COLORS.white,
            paddingTop: 10,
            textAlign: 'center',
            fontWeight: 'bold',
          }}
          >SIGN IN</Text>
        </Button>
        <Text
          style={{
            ...FONTS.body3,
            color: COLORS.primary,
            paddingTop: 10,
            textAlign: 'center',
            fontWeight: 'bold',
          }}
          onPress={() => navigation.navigate("Register")}
        >
          Don't have an account? Sign Up
        </Text>
      </View>
    </>
  );
};

export default Login;
