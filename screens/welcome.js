import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';

import {TextInput, Divider} from 'react-native-paper';

import {Modalize} from 'react-native-modalize';

import Icon from 'react-native-vector-icons/FontAwesome';

import Geolocation from '@react-native-community/geolocation';

import {location} from '../constants/images';
import {homeStyle} from '../constants/styles';

import theme from '../constants/theme';
const {COLORS, FONTS, SIZES} = theme;

const Welcome = ({navigation}) => {
  const modalizeRef = React.createRef();
  const [locationData, setLocationData] = React.useState();

  const findCoordinates = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access',
          message: 'Please grant location access',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }

    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'auto',
    });
    Geolocation.getCurrentPosition(
      position => {
        navigation.navigate('ProductHome', {params: {city: 'Temp'}});
        setLocationData(position);
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyC5F8htg_kG0BcYHooYuxS-aOXGjndiQF4`;
        fetch(url)
          .then(res => res.json())
          .then(resJson => {
            // the response had a deeply nested structure :/
            if (resJson) {
              const city = resJson.plus_code.compound_code
                .split(' ')[1]
                .split(',')[0];
              navigation.navigate('ProductHome', {
                screen: 'ProductHome',
               city: city,
              });
            }
          })
          .catch(e => {
            console.log('Error in getAddressFromCoordinates', e);
          });
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 5000, maximumAge: 10000},
    );
  };
  return (
    <>
      <View style={homeStyle.container}>
        <Text
          style={{
            ...FONTS.h1,
            textAlign: 'center',
            color: COLORS.primary,
            padding: 10,
          }}>
          Welcome to VeVibes
        </Text>
        <Text
          style={{
            ...FONTS.body3,
            textAlign: 'center',
            color: COLORS.primary,
          }}>
          Let’s first check that we deliver
        </Text>
        <Text
          style={{
            ...FONTS.body3,
            textAlign: 'center',
            color: COLORS.primary,
          }}>
          to your address
        </Text>
        <Image
          resizeMode="contain"
          style={{
            width: '40%',
            height: '30%',
          }}
          source={{uri: location}}
        />
        <Text
          style={{
            ...FONTS.h2,
            textAlign: 'center',
            color: COLORS.primary,
            fontWeight: 'bold',
          }}>
          Choose Location
        </Text>
        <Text
          style={{
            ...FONTS.body3,
            textAlign: 'center',
            color: COLORS.primary,
          }}>
          Choose your location and
        </Text>
        <Text
          style={{
            ...FONTS.body3,
            textAlign: 'center',
            color: COLORS.primary,
          }}>
          start shopping
        </Text>
        <TouchableHighlight style={styles.button} onPress={findCoordinates}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="location-arrow"
              iconStyle={{marginRight: 20}}
              style={{
                ...FONTS.body2,
                textAlign: 'center',
                color: COLORS.white,
                fontWeight: 'bold',
              }}
            />
            <Text
              style={{
                ...FONTS.body3,
                textAlign: 'center',
                color: COLORS.white,
                fontWeight: 'bold',
                padding: 10,
              }}>
              USE CURRENT LOCATION
            </Text>
          </View>
        </TouchableHighlight>
        <Text
          style={{
            ...FONTS.body3,
            textAlign: 'center',
            color: COLORS.primary,
            fontWeight: 'bold',
            padding: 10,
          }}
          onPress={() => modalizeRef.current.open()}>
          Select it Manually
        </Text>
      </View>
      <Modalize ref={modalizeRef}>
        <View style={{margin: 10, justifyContent: 'flex-start'}}>
          <TextInput
            placeholder="Enter your location"
            right={
              <TextInput.Icon
                name="magnify"
                color={COLORS.gray}
                style={{...FONTS.h2}}
              />
            }
            left={
              <TextInput.Icon
                name="chevron-left"
                color={COLORS.gray}
                style={{...FONTS.h2}}
              />
            }
            style={{
              ...FONTS.body2,
              color: COLORS.lightGray,
              borderRadius: 15,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
            outlineColor="transparent"
            selectionColor="transparent"
            underlineColor="transparent"
          />
          <View>
            <View style={{flexDirection: 'row', marginTop: 30}}>
              <Icon
                name="location-arrow"
                iconStyle={{marginRight: 20}}
                style={{
                  ...FONTS.h2,
                  color: COLORS.primary,
                  fontWeight: 'bold',
                }}
              />
              <View style={{marginLeft: 20}}>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.primary,
                    fontWeight: 'bold',
                  }}>
                  Use Current Location
                </Text>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.primary,
                  }}>
                  Using GPS
                </Text>
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <Text
                style={{
                  ...FONTS.body2,
                  color: COLORS.primary,
                  fontWeight: 'bold',
                  marginBottom: 20,
                }}>
                Choose your location
              </Text>
              <Text
                style={{
                  ...FONTS.body5,
                  color: COLORS.primary,
                }}>
                Digbeth
              </Text>
              <Divider style={{marginTop: 15, marginBottom: 15, height: 2}} />
              <Text
                style={{
                  ...FONTS.body5,
                  color: COLORS.primary,
                }}>
                Erdington
              </Text>
              <Divider style={{marginTop: 15, marginBottom: 15, height: 2}} />
              <Text
                style={{
                  ...FONTS.body5,
                  color: COLORS.primary,
                }}>
                Digbeth
              </Text>
              <Divider style={{marginTop: 15, marginBottom: 15, height: 2}} />
              <Text
                style={{
                  ...FONTS.body5,
                  color: COLORS.primary,
                }}>
                Erdington
              </Text>
              <Divider style={{marginTop: 15, marginBottom: 15, height: 2}} />
              <Text
                style={{
                  ...FONTS.body5,
                  color: COLORS.primary,
                }}>
                Digbeth
              </Text>
              <Divider style={{marginTop: 15, marginBottom: 15, height: 2}} />
              <Text
                style={{
                  ...FONTS.body5,
                  color: COLORS.primary,
                }}>
                Erdington
              </Text>
            </View>
          </View>
        </View>
      </Modalize>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    width: '80%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Welcome;
