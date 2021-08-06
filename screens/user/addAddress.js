import React, { useState, useContext } from 'react';

import { View, Text, Dimensions, ScrollView } from 'react-native';

import { TextInput, Button, Provider } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { client, ADD_ADDRESS, UPDATE_ADDRESS } from '../../constants/graphql';

import theme from '../../constants/theme';
const { width, height } = Dimensions.get('window');
const { COLORS, FONTS, SIZES } = theme;

import Auth from "../../constants/context/auth";

export default function AddAddress({ navigation, route }) {
  const address = route.params.address;
  const [showDropDown, setShowDropDown] = useState(false);

  const { token } = useContext(Auth);

  const [addressType, setAddressType] = useState(address.type);

  const nameRef = React.createRef();
  const pinRef = React.createRef();
  const addressRef = React.createRef();
  const landmarkRef = React.createRef();
  const cityRef = React.createRef();
  const stateRef = React.createRef();
  const mobileRef = React.createRef();
  const [name, setName] = useState(address.name);
  const [pin, setPin] = useState(address.pin);
  const [locality, setLocality] = useState(address.line1);
  const [landmark, setLandmark] = useState(address.line2);
  const [mobile, setMobile] = useState(address.mobile);
  const [city, setCity] = useState(address.city);
  const [state, setState] = useState(address.state);
  const [country, setCountry] = useState(address.country);
  const [countryCode, setCountryCode] = useState(address.countryCode);
  const [error, setError] = useState({ status: "", message: "" });

  const addressTypeList = [
    { label: 'Office', value: 'Office' },

    { label: 'Home', value: 'Home' },
  ];

  const getLocationDetails = (arg) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?&address=${arg}&key=AIzaSyC5F8htg_kG0BcYHooYuxS-aOXGjndiQF4`)
      .then(response => response.json())
      .then((res) => {
        if(res.results.length === 0) {
          setError({ status: "pin", message: "Please enter a valid Pincode" });
          return;
        } else {
          setError({ status: "", message: "" });
        }
        const addressData = res.results[0].address_components;
        addressData.map((a) => {
          if (a.types[0] === "locality" || a.types[0] === "postal_town") {
            setCity(a.long_name)
          }
          if (a.types[0] === "administrative_area_level_1") {
            setState(a.long_name)
          }
          if (a.types[0] === "country") {
            setCountry(a.long_name);
            setCountryCode(a.short_name);
            if (a.short_name === "GB") {
              const temp = addressData.filter((a) => a.types[0] === "administrative_area_level_2");
              setState(temp[0].short_name)
            }
          }
        })
      })
  }


  const addAddress = async () => {
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
    if (variables.input.name === undefined || variables.input.name === "") {
      setError({ status: "name", message: "Please enter Name" });
      return;
    }
    if (variables.input.pin === undefined || variables.input.pin === "") {
      setError({ status: "pin", message: "Please enter Pincode" });
      return;
    }
    if (variables.input.line1 === undefined || variables.input.line1 === "") {
      setError({ status: "line1", message: "Please enter Address" });
      return;
    }
    if (variables.input.city === undefined || variables.input.city === "") {
      setError({ status: "city", message: "Please enter City" });
      return;
    }
    if (variables.input.state === undefined || variables.input.state === "") {
      setError({ status: "state", message: "Please enter State" });
      return;
    }
    if (variables.input.mobile === undefined || variables.input.mobile === "") {
      setError({ status: "mobile", message: "Please enter Mobile" });
      return;
    }
    if (variables.input.type === undefined) {
      setError({ status: "type", message: "Please select Address Type" });
      return;
    }
    client.setHeader('authorization', `Bearer ${token}`);
    if (address.name !== "") {
      const data = await client.request(UPDATE_ADDRESS, { ...variables, addressId: address.id });
    } else {
      const data = await client.request(ADD_ADDRESS, variables);
    }
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
          {address.name !== "" ? "Update" : "Add"} Delivery Address
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
              value={name}
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
              onChangeText={text => setName(text)}
              error={error.status === "name"}
            />
            <TextInput
              ref={pinRef}
              theme={{
                colors: { text: COLORS.primary, primary: COLORS.lightGray },
              }}
              name="pin"
              label="Pin Code*"
              value={pin}
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
                setPin(text);
                if (text.length > 3) {
                  getLocationDetails(text);
                }
              }}
              error={error.status === "pin"}
            />
            <TextInput
              ref={addressRef}
              theme={{
                colors: { text: COLORS.primary, primary: COLORS.lightGray },
              }}
              name="address"
              label="Address*"
              value={locality}
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
              onChangeText={text => setLocality(text)}
              error={error.status === "line1"}
            />
            <TextInput
              ref={landmarkRef}
              theme={{
                colors: { text: COLORS.primary, primary: COLORS.lightGray },
              }}
              name="landmark"
              label="Landmark"
              value={landmark}
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
              onChangeText={text => setLandmark(text)}
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
                error={error.status === "city"}
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
                error={error.status === "state"}
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
                value={mobile}
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
                onChangeText={text => setMobile(text)}
                error={error.status === "mobile"}
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
                        text: COLORS.gray,
                      }
                    }}
                    activeColor={COLORS.secondaryDark}
                    listStyle={{ color: COLORS.secondaryDark }}
                    label={'Address Type*'}
                    value={addressType}
                    setValue={setAddressType}
                    list={addressTypeList}
                    visible={showDropDown}
                    error={error.status === "type"}
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
          {address.name !== "" ? "Update" : "Save"} and Continue
        </Text>
      </Button>
    </View>
  );
}
