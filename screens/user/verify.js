import React from 'react';

import { View, Text, ScrollView } from 'react-native';

import { Button,Snackbar } from 'react-native-paper';

import OTPTextInput from "react-native-otp-textinput";

import theme from '../../constants/theme';
const { COLORS, FONTS } = theme;

const Verify = ({ navigation, route }) => {
  const nextScreen = route.params.nextScreen;
  const [visible, setVisible] = React.useState(false);
  const [error,setError] = React.useState({status: false,message:""})
  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  return (
    <>
      <View style={{flex:1}}>
        <ScrollView>
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
          <View style={{ marginTop: 120, padding: 20 }}>
            <OTPTextInput inputCount={4} tintColor={"transparent"} offTintColor={"transparent"} textInputStyle={{
              borderRadius: 10,
              backgroundColor: "#e2e2e2"
            }} />
          </View>
        </ScrollView>
        <Button mode="contained" style={{ backgroundColor: COLORS.secondary, margin: 10 }} onPress={() => navigation.navigate(nextScreen)}>
          <Text style={{ ...FONTS.body2, fontWeight: "bold" }}>Verify</Text>
        </Button>
        <Snackbar
          visible={error.status}
          onDismiss={onDismissSnackBar}
          duration={1000}
          action={{
            label: 'OK',
            onPress: () => {
              setError({ status: false, message: "" })
            },
          }}
          theme={{
            colors: { accent: COLORS.white, onSurface: COLORS.error }
          }}
        >
          <Text style={{
            ...FONTS.h3,
            color: COLORS.white,
            backgroundColor: "transparent"
          }}>
            {error.message}
          </Text>
        </Snackbar>
      </View>
    </>
  );
};

export default Verify;
