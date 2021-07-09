import React from 'react';

import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Modalize} from 'react-native-modalize';

import {menuIcon} from '../constants/images';

const {width, height} = Dimensions.get('window');

import {logo_Colored} from '../constants/images';

import theme from '../constants/theme';
import {TouchableHighlight} from 'react-native-gesture-handler';

const {COLORS, FONTS} = theme;

export default function Drawer({navigation}) {
  const modalizeRef = React.createRef();
  const data = [
    {
      name: 'Edit Profile',
      icon: menuIcon.profile,
      link: 'EditProfile',
    },
    {
      name: 'My Orders',
      icon: menuIcon.orders,
      link: 'Orders',
    },
    {
      name: 'Wishlist',
      icon: menuIcon.wishlist,
      link: 'Wishlist',
    },
    {
      name: 'Coupons',
      icon: menuIcon.coupons,
      link: 'Coupons',
    },
    {
      name: 'Manage Addresses',
      icon: menuIcon.address,
      link: 'MyAddresses',
    },
    {
      name: 'Manage Card',
      icon: menuIcon.card,
      link: 'MyAddresses',
    },
    {
      name: 'Change Password',
      icon: menuIcon.password,
      link: 'ChangePassword',
    },
    {
      name: 'Settings',
      icon: menuIcon.setting,
      link: 'Settings',
    },
  ];
  return (
    <View style={{width: width, height: height, flex: 1}}>
      <ScrollView>
        <ImageBackground
          source={{
            uri: 'https://res.cloudinary.com/vevibes/image/upload/v1625203854/App%20Assets/Asset_8_it12d2.png',
          }}
          style={{
            width: width,
            height: 300,
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: 'white',
                borderRadius: 20,
              }}></View>
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginTop: 20,
              }}>
              Joseph
            </Text>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.primary,
                marginTop: 10,
                fontWeight: 'bold',
              }}>
              Joseph1234@gmail.com
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: COLORS.white,
                borderRadius: 20,
                padding: 5,
                marginTop: 10,
              }}>
              <Icon
                name="phone"
                style={{color: COLORS.secondary, ...FONTS.body2}}
              />
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.primary,
                  fontWeight: 'bold',
                  marginLeft: 10,
                }}>
                +44 999 999 9999
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View
          style={{
            margin: 10,
            flex: 1,
          }}>
          {data.map((d, index) => {
            return (
              <TouchableHighlight
                key={d.name + index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: COLORS.white,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLORS.lightGray,
                  justifyContent: 'space-between',
                  padding: 15,
                  marginBottom: 10,
                }}
                onPress={() => navigation.navigate(d.link)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: width - 40,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        borderRadius: 10,
                        backgroundColor: '#edf4fe',
                        padding: 5,
                        paddingLeft: 8,
                        paddingRight: 8,
                        marginRight: 10,
                      }}>
                      <Image
                        source={{uri: d.icon}}
                        style={{
                          width: 20,
                          height: 20,
                        }}
                        resizeMode="contain"
                      />
                    </View>

                    <Text
                      style={{
                        color: COLORS.primary,
                        ...FONTS.body3,
                        fontWeight: 'bold',
                      }}>
                      {d.name}
                    </Text>
                  </View>
                  <Icon
                    name="chevron-right"
                    style={{
                      color: COLORS.gray,
                      ...FONTS.body2,
                      fontWeight: 'bold',
                    }}
                  />
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button
            mode="contained"
            style={{
              backgroundColor: COLORS.secondary,
              borderRadius: 50,
              margin: 20,
              width: width / 2,
            }}
            onPress={() => modalizeRef.current.open()}>
            <Text style={{...FONTS.body2, color: COLORS.white}}>Logout</Text>
          </Button>
        </View>
      </ScrollView>
      <Modalize ref={modalizeRef} modalHeight={300}>
        <View style={{margin: 10}}>
          <Image
            source={{uri: logo_Colored}}
            style={{width: width / 2, height: 150}}
            resizeMode="contain"
          />
          <Text
            style={{...FONTS.body2, color: COLORS.primary, fontWeight: 'bold'}}>
            Logout
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.primary,
              marginTop: 10,
              marginBottom: 10,
            }}>
            Are you sure you want to logout?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Button
              mode="contained"
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 50,
                paddingRight: 30,
                paddingLeft: 30,
                borderColor: COLORS.secondary,
                borderWidth: 2,
                marginRight: 10,
              }}>
              <Text style={{...FONTS.body2, color: COLORS.secondary}}>No</Text>
            </Button>
            <Button
              mode="contained"
              style={{
                backgroundColor: COLORS.secondary,
                borderRadius: 50,
                paddingRight: 30,
                paddingLeft: 30,
              }}>
              <Text style={{...FONTS.body2, color: COLORS.white}}>Yes</Text>
            </Button>
          </View>
        </View>
      </Modalize>
    </View>
  );
}
