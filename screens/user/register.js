import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { TextInput, Button } from "react-native-paper";

import { client, REGISTER } from '../../constants/graphql';


import theme from '../../constants/theme';
const { COLORS, FONTS, SIZES } = theme;

const Register = ({ navigation }) => {
  const passwordRef = React.createRef();
  const passwordRef2 = React.createRef();
  const nameRef = React.createRef();
  const emailRef = React.createRef();
  const [error, setError] = React.useState({status:false,message:""});
  const [errorMatch, setErrorMatch] = React.useState(false);
  
  const register = async () => { 
    if(nameRef.current.state.value === undefined) {
      setError({
        status: true,
        message: "Name can't be empty"
      });
      return;
    } else {
      setError({ 
        status: false,
        message: ""
      });
    }
    if(emailRef.current.state.value === undefined) {
      setError({
        status: true,
        message: "Email can't be empty"
      });
      return;
    } else {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const check =  re.test(String(emailRef.current.state.value).toLowerCase());
      console.log(check);
      if(check) {
        setError({ 
          status: false,
          message: ""
        });
      } else {
        setError({ 
          status: true,
          message: "Please enter a valid email address"
        });
        return;
      }
    }
    if(passwordRef.current.state.value === undefined) {
      setError({
        status: true,
        message: "Password can't be empty"
      });
      return;
    } else {
      setError({ 
        status: false,
        message: ""
      });
    }
    if (passwordRef.current.state.value !== passwordRef2.current.state.value) {
      setError({
        status: true,
        message: "Password didn't match"
      });
      return;
    } else {
      setError({ 
        status: false,
        message: ""
      });
    }
    const variables = {
      input: {
        name: nameRef.current.state.value,
        email: emailRef.current.state.value,
        password: passwordRef.current.state.value
      }
    };
    try{
      const signup = await client.request(REGISTER,variables);
    } catch (e) {
      const error = JSON.parse(e.message.split("!!!:")[1]);
      setError({ 
        status: true,
        message: error.response.errors[0].message
      })
    }
  }
  return (
    <>
      <View>
        <Text
          style={{
            ...FONTS.h5,
            color: COLORS.primary,
            marginTop: 40,
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
        <View style={{ marginTop: 40 }}>
          <TextInput ref={nameRef} label="Name*" theme={{
            colors: { text: COLORS.primary, primary: COLORS.primary },
          }}
            name="name"
            style={{
              margin: 10,
              marginBottom: 20,
              backgroundColor: COLORS.white,
              ...FONTS.body3,
              color: COLORS.primary,
              fontWeight: 'bold',
            }}
            selectionColor={COLORS.lightGray}
            outlineColor={COLORS.lightGray}
            underlineColor={COLORS.lightGray}
          />
          <TextInput ref={emailRef} label="Email*" theme={{
            colors: { text: COLORS.primary, primary: COLORS.primary },
          }}
            name="email"
            style={{
              margin: 10,
              marginBottom: 20,
              backgroundColor: COLORS.white,
              ...FONTS.body3,
              color: COLORS.primary,
              fontWeight: 'bold',
            }}
            selectionColor={COLORS.lightGray}
            outlineColor={COLORS.lightGray}
            underlineColor={COLORS.lightGray}
          />
          <TextInput ref={passwordRef} label="Password*" theme={{
            colors: { text: COLORS.primary, primary: COLORS.primary },
          }}
            name="password"
            style={{
              margin: 10,
              marginBottom: 20,
              backgroundColor: COLORS.white,
              ...FONTS.body3,
              color: COLORS.primary,
              fontWeight: 'bold',
            }}
            selectionColor={COLORS.lightGray}
            outlineColor={COLORS.lightGray}
            underlineColor={COLORS.lightGray}
            secureTextEntry
            right={<Icon name="eye" style={{ elevation: 2 }} />}
            iconType="material" />
          <TextInput ref={passwordRef2} label="Confirm Password*" theme={{
            colors: { text: COLORS.primary, primary: COLORS.primary },
          }}
            name="changePassword"
            style={{
              margin: 10,
              marginBottom: 20,
              backgroundColor: "transparent",
              ...FONTS.body3,
              color: COLORS.primary,
              fontWeight: 'bold',
            }}
            outlineColor={COLORS.lightGray}
            underlineColor={COLORS.lightGray}
            secureTextEntry
            error={errorMatch}
            right={<Icon name="eye" style={{ elevation: 2, ...FONTS.h2, color: COLORS.primary, zIndex: 10 }} />}
            iconType="material"
            onChangeText={text => {
              if (passwordRef.current.state.value !== text) {
                setErrorMatch(true)
              } else {
                setErrorMatch(false)
              }
            }}
          />
        </View>
        {error.status && <Text style={{ margin: 10,...FONTS.body3,color: COLORS.error}}>{error.message}</Text>}
        <Button
          mode="contained"
          style={{
            margin: 10,
            backgroundColor: COLORS.secondary,
          }}
          onPress={register}
        >
          <Text style={{ ...FONTS.body2, fontWeight: "bold" }}>Sign Up</Text>
        </Button>
        <Text
          style={{
            ...FONTS.body3,
            color: COLORS.primary,
            paddingTop: 10,
            textAlign: 'center',
            fontWeight: 'bold',
          }}
          onPress={() => { navigation.navigate("Login") }}
        >
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
          <Text style={{ textDecorationLine: 'underline' }}>
            Terms and Conditions
          </Text>
        </Text>
      </View>
    </>
  );
};

export default Register;
