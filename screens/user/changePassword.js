import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Auth from '../../constants/context/auth';
import { client, CHANGE_PASSWORD } from '../../constants/graphql';

import theme from '../../constants/theme';
const { COLORS, FONTS } = theme;

const ChangePassword = ({ navigation }) => {
  const { authenticated, token } = React.useContext(Auth);
  const passwordRef = React.createRef();
  const passwordRef2 = React.createRef();
  const [error, setError] = React.useState(false);
  const [errorMatch, setErrorMatch] = React.useState(false);
  const changePassword = async () => {
    if (passwordRef.current.state.value !== passwordRef2.current.state.value || passwordRef.current.state.value === undefined) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    client.setHeader('authorization', `Bearer ${token}`);
    const changed = await client.request(CHANGE_PASSWORD, { password: passwordRef.current.state.value });
    navigation.goBack();
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
        <View style={{ marginTop: 80 }}>
          <TextInput placeholder="Password" ref={passwordRef} label="Password*" theme={{
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
          <TextInput placeholder="Confirm Password" ref={passwordRef2} label="Confirm Password*" theme={{
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
            right={<Icon name="eye" style={{ elevation: 2,...FONTS.h2,color: COLORS.primary,zIndex:10}} />}
            iconType="material"
            onChangeText={text => {
              if(passwordRef.current.state.value !== text) {
                setErrorMatch(true)
              } else {
                setErrorMatch(false)
              }
            }} 
            />
        </View>
        {error && <Text style={{...FONTS.body3,margin:10,color: COLORS.error}}>Please enter your new password</Text>}
        <Button mode="contained" style={{ backgroundColor: COLORS.secondary, margin: 10 }} onPress={changePassword}>
          <Text style={{ ...FONTS.body5, color: COLORS.white, fontWeight: 'bold' }}>Change</Text>
        </Button>
      </View>
    </>
  );
};

export default ChangePassword;
