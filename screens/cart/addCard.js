import React from 'react';

import { View, Text, ScrollView, Dimensions } from 'react-native';

import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Auth from '../../constants/context/auth';

import { client, ADD_CARD } from '../../constants/graphql';

const { width, height } = Dimensions.get('window');
import theme from '../../constants/theme';
const { COLORS, FONTS, SIZES } = theme;
export default function AddCard({ navigation }) {
  const { token } = React.useContext(Auth);
  const [exp, setExp] = React.useState("");
  const nameRef = React.createRef();
  const numberRef = React.createRef();
  const [error,setError] = React.useState();

  const addCard = async () => {
    const variables = {
      input: {
        number: numberRef.current.state.value,
        name: nameRef.current.state.value,
        expires: exp
      }
    }
    try {
      client.setHeader('authorization', `Bearer ${token}`);
      const data = await client.request(ADD_CARD, variables);
      //setError(undefined);
      navigation.goBack();
    }
    catch (err) {
      setError(err.message.split(".:")[0]);
    }
  }

  return (
    <View style={{ margin: 10, flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon
          name="chevron-left"
          style={{ ...FONTS.h2, color: COLORS.primary, marginRight: 10 }}
          onPress={() => navigation.goBack()}
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
      <View style={{ flex: 1 }}>
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
              ref={numberRef}
              name="cardNumber"
              mode="flat"
              style={{ width: width / 2 + 80, backgroundColor: COLORS.white }}
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
              ref={nameRef}
              name="holderName"
              mode="flat"
              style={{ width: width / 2 + 80, backgroundColor: COLORS.white }}
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
                  borderBottomColor: COLORS.lightGray,
                  color: COLORS.gray,
                  ...FONTS.body3,
                }}>
                Expires
              </Text>
              <TextInput
                mode="flat"
                style={{ width: width / 4 + 60, backgroundColor: COLORS.white }}
                outlineColor={COLORS.white}
                selectionColor={COLORS.gray}
                underlineColor={COLORS.lightGray}
                value={exp}
                maxLength={5}
                onChangeText={(text) => {
                  let textTemp = text;
                  textTemp = text.replace(
                    /[^0-9]/g, '' // To allow only numbers
                  ).replace(
                    /^([2-9])$/g, '0$1' // To handle 3 > 03
                  ).replace(
                    /^(1{1})([3-9]{1})$/g, '0$1/$2' // 13 > 01/3
                  ).replace(
                    /^0{1,}/g, '0' // To handle 00 > 0
                  ).replace(
                    /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, '$1/$2' // To handle 113 > 11/3
                  );
                  setExp(textTemp)
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                marginBottom: 20,
                marginLeft: 10
              }}>
              <Text
                style={{
                  borderBottomWidth: 2,
                  paddingBottom: 20,
                  borderBottomColor: COLORS.lightGray,
                  color: COLORS.gray,
                  ...FONTS.body3,
                }}>
                CVV
              </Text>
              <TextInput
                mode="flat"
                style={{ width: width / 4 + 80, backgroundColor: COLORS.white }}
                outlineColor={COLORS.white}
                selectionColor={COLORS.gray}
                underlineColor={COLORS.lightGray}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="checkbox-marked-circle" style={{ ...FONTS.body2, color: COLORS.secondary, marginRight: 10 }} />
            <Text style={{ ...FONTS.body3, color: COLORS.primary }}>Save Card Information</Text>
          </View>
          {error && <Text style={{ ...FONTS.body3, color: COLORS.error,textAlign: 'center',marginTop:10}}>{error}</Text>}
        </ScrollView>
      </View>
      <Button style={{ backgroundColor: COLORS.secondary, borderRadius: 10 }} onPress={addCard}>
        <Text style={{ ...FONTS.h2, color: COLORS.white }}>Done</Text>
      </Button>
    </View>
  );
}
