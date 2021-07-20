import React, { useState, useContext } from 'react';

import { View, Text, Dimensions, ScrollView } from 'react-native';

import { TextInput, Button, Provider } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { client, ADD_ADDRESS} from '../../constants/graphql';

import theme from '../../constants/theme';
const { width, height } = Dimensions.get('window');
const { COLORS, FONTS, SIZES } = theme;

import Auth from "../../constants/context/auth";
import UserContext from '../../constants/context/userContext';

export default function AddAddress({ navigation }) {
  const [showDropDown, setShowDropDown] = useState(false);

  const { authenticated, token } = useContext(Auth);
  const {user} = useContext(UserContext);

  const [addressType, setAddressType] = useState();

  const nameRef = React.createRef();
  const pinRef = React.createRef();
  const addressRef = React.createRef();
  const landmarkRef = React.createRef();
  const cityRef = React.createRef();
  const stateRef = React.createRef();
  const mobileRef = React.createRef();

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const addressTypeList = [
    { label: 'Office', value: 'Office' },

    { label: 'Home', value: 'Home' },
  ];

  const getLocationDetails = (arg) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?&address=${arg}&key=AIzaSyC5F8htg_kG0BcYHooYuxS-aOXGjndiQF4`)
      .then(response => response.json())
      .then((res) => {
        const addressData = res.results[0].address_components;
        addressData.map((a) => {
          if (a.types[0] === "locality") {
            setCity(a.long_name)
          }
          if (a.types[0] === "administrative_area_level_1") {
            setState(a.long_name)
          }
          if (a.types[0] === "country") {
            setCountry(a.long_name);
            setCountryCode(a.short_name);
          }
        })
      })
  }


  const addAddress = async() => {
    const variables = {
      input: {
        name: nameRef.current.state.value,
        pin: pinRef.current.state.value,
        line1: addressRef.current.state.value,
        line2: landmarkRef.current.state.value,
        city: cityRef.current.state.value,
        state: stateRef.current.state.value,
        mobile: mobileRef.current.state.value,
        type: addressType,
        countryCode,
        country
      }
    };
    client.setHeader('authorization', `Bearer ${token}`);
    const data = await client.request(ADD_ADDRESS, variables);
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
        <Icon
          name="chevron-left"
          style={{ ...FONTS.h2, color: COLORS.primary, fontWeight: 'bold' }}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{ ...FONTS.body2, color: COLORS.primary, fontWeight: 'bold' }}>
          Add Delivery Address
        </Text>
      </View>
      <Provider>
        <View style={{ margin: 10, marginTop: 20, flex: 1 }}>
          <ScrollView>
            <TextInput
              ref={nameRef}
              theme={{
                colors: { text: COLORS.primary, primary: COLORS.lightGray },
              }}
              name="name"
              label="Full Name*"
              style={{
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
            <TextInput
              ref={pinRef}
              theme={{
                colors: { text: COLORS.primary, primary: COLORS.lightGray },
              }}
              name="pin"
              label="Pin Code*"
              style={{
                marginBottom: 20,
                backgroundColor: COLORS.white,
                ...FONTS.body3,
                color: COLORS.primary,
                fontWeight: 'bold',
              }}
              selectionColor={COLORS.lightGray}
              outlineColor={COLORS.lightGray}
              underlineColor={COLORS.lightGray}
              onChangeText={text => {
                if (text.length > 5) {
                  getLocationDetails(text);
                }
              }}
            />
            <TextInput
              ref={addressRef}
              theme={{
                colors: { text: COLORS.primary, primary: COLORS.lightGray },
              }}
              name="address"
              label="Address*"
              style={{
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
            <TextInput
              ref={landmarkRef}
              theme={{
                colors: { text: COLORS.primary, primary: COLORS.lightGray },
              }}
              name="landmark"
              label="Landmark"
              style={{
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <TextInput
                ref={cityRef}
                theme={{
                  colors: { text: COLORS.primary, primary: COLORS.lightGray },
                }}
                name="city"
                label="City*"
                value={city}
                style={{
                  width: width / 2 - 15,
                  backgroundColor: COLORS.white,
                  ...FONTS.body3,
                  color: COLORS.primary,
                  fontWeight: 'bold',
                }}
                selectionColor={COLORS.lightGray}
                outlineColor={COLORS.lightGray}
                underlineColor={COLORS.lightGray}
                onChangeText={text => setCity(text)}
              />
              <TextInput
                ref={stateRef}
                theme={{
                  colors: { text: COLORS.primary, primary: COLORS.lightGray },
                }}
                name="state"
                label="State*"
                value={state}
                style={{
                  width: width / 2 - 15,
                  backgroundColor: COLORS.white,
                  ...FONTS.body3,
                  color: COLORS.primary,
                  fontWeight: 'bold',
                }}
                selectionColor={COLORS.lightGray}
                outlineColor={COLORS.lightGray}
                underlineColor={COLORS.lightGray}
                onChangeText={text => setState(text)}
              />
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TextInput
                ref={mobileRef}
                theme={{
                  colors: { text: COLORS.primary, primary: COLORS.lightGray },
                }}
                name="phone"
                label="Mobile No.*"
                style={{
                  width: width / 2 - 15,
                  backgroundColor: COLORS.white,
                  ...FONTS.body3,
                  color: COLORS.primary,
                  fontWeight: 'bold',
                }}
                selectionColor={COLORS.lightGray}
                outlineColor={COLORS.lightGray}
                underlineColor={COLORS.lightGray}
                keyboardType="numeric"
              />
              <View>
                <View
                  style={{
                    flex: 1,
                    marginHorizontal: 20,
                    justifyContent: 'center',
                    width: width / 2 - 15,
                  }}>
                  <DropDown
                    style={{
                      backgroundColor: COLORS.white,
                      ...FONTS.body3,
                      color: COLORS.primary,
                      fontWeight: 'bold',
                    }}
                    theme={{
                      colors: {
                         background: 'transparent',
                         text: COLORS.gray
                      }
                    }}
                    activeColor={COLORS.secondaryDark}
                    label={'Address Type*'}
                    value={addressType}
                    setValue={setAddressType}
                    list={addressTypeList}
                    visible={showDropDown}
                    showDropDown={() => setShowDropDown(true)}
                    onDismiss={() => setShowDropDown(false)}
                    inputProps={{
                      right: (
                        <TextInput.Icon
                          name={'chevron-down'}
                          style={{ color: COLORS.secondary }}
                        />
                      ),
                    }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Provider>
      <Button
        mode="contained"
        style={{
          backgroundColor: COLORS.secondary,
          margin: 10,
          borderRadius: 10,
        }}
        onPress={addAddress}
      >
        <Text
          style={{
            ...FONTS.body2,
            padding: 10,
            color: COLORS.white,
            fontWeight: 'bold',
          }}>
          Save and Continue
        </Text>
      </Button>
    </View>
  );
}
