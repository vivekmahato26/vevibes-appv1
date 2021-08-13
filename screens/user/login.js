import React, { useContext, useRef } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, TextInput } from 'react-native-paper';

import Auth from "../../constants/context/auth";


import { client,LOGIN } from "../../constants/graphql";

import theme from '../../constants/theme';
const { COLORS, FONTS, SIZES } = theme;

import {useNavigationState} from "@react-navigation/native";

const Login = ({ navigation }) => {
  const { login,setAuthenticated,setToken,getUserData } = useContext(Auth);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loginError,setLoginError] = React.useState({status:false,message:""});

  const state = useNavigationState(state => state);
  const index = useNavigationState(state => state.index);

  const handlelogin = async() => {
    if(emailRef.current.state.value === undefined) {
      setLoginError({
        status: true,
        message: "Email can't be empty"
      });
      return;
    } else {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const check =  re.test(String(emailRef.current.state.value).toLowerCase());
      console.log(check);
      if(check) {
        setLoginError({ 
          status: false,
          message: ""
        });
      } else {
        setLoginError({ 
          status: true,
          message: "Please enter a valid email address"
        });
        return;
      }
    }
    if(passwordRef.current.state.value === undefined) {
      setLoginError({
        status: true,
        message: "Password can't be empty"
      });
      return;
    } else {
      setLoginError({ 
        status: false,
        message: ""
      });
    }
    const variables = {
      input: { 
        email: emailRef.current.state.value,
        password: passwordRef.current.state.value,
      }
    }
      try {
        const data = await client.request(LOGIN, variables);
        const loginData = data.signIn;
        if(loginData.message) {
          setLoginError({status: true, message: loginData.message});
          return;
        }
        else {
          setAuthenticated(true);
          setToken(loginData.token);
          getUserData();
          try {
            await AsyncStorage.setItem('token', loginData.token);
            await AsyncStorage.setItem('userId', loginData.userId);
            await AsyncStorage.setItem('email', loginData.email);
            return true;
          } catch (e) {
            // saving error
          }
        }
      } catch (e) {
        console.log(e);
        return;
      }
   
    if(!loginError.staus) {
      navigation.navigate(state.routes[index-1].name);
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
          <TextInput placeholder="Password" label="Password*" right={<Icon name="eye" />} ref={passwordRef} 
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
            secureTextEntry={true} 
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
        {loginError.status && <Text style={{...FONTS.body3,color: COLORS.error,margin: 10}}>{loginError.message}</Text>}
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
