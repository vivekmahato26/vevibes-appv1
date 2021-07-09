import React, {useState} from 'react';

import {View, Text, Dimensions, ScrollView} from 'react-native';

import {TextInput, Button, Provider} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {client, ADD_ADDRESS} from '../../constants/graphql';

import theme from '../../constants/theme';
const {width, height} = Dimensions.get('window');
const {COLORS, FONTS, SIZES} = theme;

export default function AddAddress() {
  const [showDropDown, setShowDropDown] = useState(false);

  const [addressType, setAddressType] = useState();

  const nameRef = React.createRef();
  const pinRef = React.createRef();
  const addressRef = React.createRef();
  const landmarkRef = React.createRef();
  const cityRef = React.createRef();
  const stateRef = React.createRef();
  const mobileRef = React.createRef();

  const addressTypeList = [
    {label: 'Office', value: 'Office'},

    {label: 'Home', value: 'Home'},
  ];


  const addAddress = () => {
    const variables = {
      name: nameRef.current.value,
      pin: pinRef.current.value,
      address: addressRef.current.value,
      landmark: landmarkRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      mobile: mobileRef.current.value,
      type: addressType
    };
    const data = client.request(ADD_ADDRESS, variables);
    console.log(data);
    return;
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Icon
          name="chevron-left"
          style={{...FONTS.body2, color: COLORS.primary, fontWeight: 'bold'}}
        />
        <Text
          style={{...FONTS.body2, color: COLORS.primary, fontWeight: 'bold'}}>
          Add Delivery Address
        </Text>
      </View>
      <Provider>
        <View style={{margin: 10, marginTop: 20, flex: 1}}>
          <ScrollView>
            <TextInput
            ref={nameRef}
              theme={{
                colors: {text: COLORS.primary, primary: COLORS.lightGray},
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
                colors: {text: COLORS.primary, primary: COLORS.lightGray},
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
            />
            <TextInput
            ref={addressRef}
              theme={{
                colors: {text: COLORS.primary, primary: COLORS.lightGray},
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
                colors: {text: COLORS.primary, primary: COLORS.lightGray},
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
                  colors: {text: COLORS.primary, primary: COLORS.lightGray},
                }}
                name="city"
                label="City*"
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
              />
              <TextInput
              ref={stateRef}
                theme={{
                  colors: {text: COLORS.primary, primary: COLORS.lightGray},
                }}
                name="state"
                label="State*"
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
              />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
              ref={mobileRef}
                theme={{
                  colors: {text: COLORS.primary, primary: COLORS.lightGray},
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
                    theme={{
                      colors: {text: COLORS.primary, primary: COLORS.lightGray},
                    }}
                    style={{
                      backgroundColor: COLORS.white,
                      ...FONTS.body3,
                      color: COLORS.primary,
                      fontWeight: 'bold',
                    }}
                    activeColor={COLORS.lightGray}
                    label={'Address Type*'}
                    mode={'flat'}
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
                          style={{color: COLORS.secondary}}
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
