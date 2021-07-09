import React from 'react';

import {View, Text, ScrollView, Dimensions} from 'react-native';

import {Button, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');
import theme from '../../constants/theme';
const {COLORS, FONTS, SIZES} = theme;
export default function AddCard({navigation}) {
  return (
    <View style={{margin: 10, flex: 1}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name="chevron-left"
          style={{...FONTS.h2, color: COLORS.primary, marginRight: 10}}
        />
        <Text
          style={{
            ...FONTS.body2,
            color: COLORS.primary,
            marginRight: 10,
            fontWeight: 'bold',
          }}>
          Add Card
        </Text>
      </View>
      <View style={{flex: 1}}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              marginBottom: 20,
            }}>
            <Text
              style={{
                borderBottomWidth: 2,
                paddingBottom: 20,
                width: width / 2 - 100,
                borderBottomColor: COLORS.lightGray,
                color: COLORS.gray,
                ...FONTS.body3,
              }}>
              Card Number
            </Text>
            <TextInput
              mode="flat"
              style={{width: width / 2 + 80, backgroundColor: COLORS.white}}
              outlineColor={COLORS.white}
              selectionColor={COLORS.gray}
              underlineColor={COLORS.lightGray}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              marginBottom: 20,
            }}>
            <Text
              style={{
                borderBottomWidth: 2,
                paddingBottom: 20,
                width: width / 2 - 100,
                borderBottomColor: COLORS.lightGray,
                color: COLORS.gray,
                ...FONTS.body3,
              }}>
              Card Holder
            </Text>
            <TextInput
              mode="flat"
              style={{width: width / 2 + 80, backgroundColor: COLORS.white}}
              outlineColor={COLORS.white}
              selectionColor={COLORS.gray}
              underlineColor={COLORS.lightGray}
            />
          </View>
          <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                marginBottom: 20,
              }}>
              <Text
                style={{
                  borderBottomWidth: 2,
                  paddingBottom: 20,
                  width: width / 4 - 40,
                  borderBottomColor: COLORS.lightGray,
                  color: COLORS.gray,
                  ...FONTS.body3,
                }}>
                Expires
              </Text>
              <TextInput
                mode="flat"
                style={{width: width / 4 + 80, backgroundColor: COLORS.white}}
                outlineColor={COLORS.white}
                selectionColor={COLORS.gray}
                underlineColor={COLORS.lightGray}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                marginBottom: 20,
              }}>
              <Text
                style={{
                  borderBottomWidth: 2,
                  paddingBottom: 20,
                  width: width / 4 - 100,
                  borderBottomColor: COLORS.lightGray,
                  color: COLORS.gray,
                  ...FONTS.body3,
                }}>
                CVV
              </Text>
              <TextInput
                mode="flat"
                style={{width: width / 4 + 80, backgroundColor: COLORS.white}}
                outlineColor={COLORS.white}
                selectionColor={COLORS.gray}
                underlineColor={COLORS.lightGray}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <Icon name="checkbox-marked-circle" style={{...FONTS.body2,color: COLORS.secondary,marginRight:10}} />
            <Text style={{...FONTS.body3,color: COLORS.primary}}>Save Card Information</Text>
          </View>
        </ScrollView>
      </View>
      <Button style={{backgroundColor:COLORS.secondary,borderRadius:10}}>
        <Text style={{...FONTS.h2,color: COLORS.white}}>Done</Text>
      </Button>
    </View>
  );
}
