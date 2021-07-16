import React from 'react';

import {View, Text,ScrollView} from 'react-native';

import {TextInput,Button} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import theme from '../../constants/theme';
const {COLORS, FONTS} = theme;

export default function EditProfile({navigation}) {
  return (
    <View style={{margin: 10,flex: 1}}>
        <ScrollView>
      <Icon name="close-thick" style={{...FONTS.h2, color: COLORS.primary}}  onPress={() => navigation.goBack()}/>
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: COLORS.lightGray,
          borderRadius: 20,
          marginTop: 30,
        }}>
        <Icon
          name="camera"
          style={{
            color: COLORS.gray,
            ...FONTS.body2,
            backgroundColor: COLORS.white,
            padding: 5,
            borderRadius: 50,
            borderColor: COLORS.lightGray,
            borderWidth: 0.5,
            position: 'absolute',
            bottom: -15,
            right: -15,
            paddingLeft:9,
            paddingRight:9
          }}
        />
      </View>
      <TextInput
      theme={{colors:{
          text:COLORS.primary
      }}}
        label="Name"
        mode="flat"
        style={{
          backgroundColor: COLORS.white,
          marginTop: 30,
          ...FONTS.body3,
          color: COLORS.primary,
          fontWeight: 'bold',
        }}
        outlineColor={COLORS.white}
        selectionColor={COLORS.gray}
        underlineColor={COLORS.lightGray}
      />
      <TextInput
        theme={{colors:{
            text:COLORS.primary
        }}}
          label="Email ID"
          mode="flat"
          style={{
            backgroundColor: COLORS.white,
            ...FONTS.body3,
            color: COLORS.primary,
            fontWeight: 'bold',
          }}
          outlineColor={COLORS.white}
          selectionColor={COLORS.gray}
          underlineColor={COLORS.lightGray}
      />
      <TextInput
       theme={{colors:{
        text:COLORS.primary
    }}}
      label="Phone Number"
      mode="flat"
      style={{
        backgroundColor: COLORS.white,
        ...FONTS.body3,
        color: COLORS.primary,
        fontWeight: 'bold',
      }}
      outlineColor={COLORS.white}
      selectionColor={COLORS.gray}
      underlineColor={COLORS.lightGray}
      />
      </ScrollView>
      <Button style={{backgroundColor: COLORS.secondary,borderRadius:10}}>
          <Text style={{color: COLORS.white,...FONTS.body2,fontWeight:"bold"}}>Save</Text>
      </Button>
    </View>
  );
}
