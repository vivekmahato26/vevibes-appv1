import React from 'react';

import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ToggleSwitch from 'toggle-switch-react-native';

import theme from '../constants/theme';

const { COLORS, FONTS } = theme;

export default function Settings({ navigation }) {
  const [notification, setNotification] = React.useState(false);
  const [newsletter, setNewsletter] = React.useState(false);
  const onToggleNewsletter = () => {
    setNewsletter(prevState => {
      return !prevState;
    });
  };
  const onToggleNotification = () => {
    setNotification(prevState => {
      return !prevState;
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
        <Icon
          name="chevron-left"
          style={{ ...FONTS.h2, color: COLORS.primary, fontWeight: 'bold' }}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{ ...FONTS.body2, color: COLORS.primary, fontWeight: 'bold' }}>
          Setting
        </Text>
      </View>
      <View style={{ backgroundColor: '#f4f4f4', flex: 1 }}>
        <TouchableWithoutFeedback onPress={onToggleNewsletter}>
          <View
            style={{
              marginTop: 20,
              backgroundColor: COLORS.white,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text style={{ ...FONTS.body3, color: COLORS.gray, marginLeft: 10 }}>
              Newsletter
            </Text>
            <ToggleSwitch
              isOn={newsletter}
              onColor={COLORS.secondary}
              offColor={COLORS.lightGray}
              labelStyle={{ color: 'black', fontWeight: '900' }}
              size="large"
              onToggle={onToggleNewsletter}
            />
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            marginTop: 20,
            backgroundColor: COLORS.white,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Text style={{ ...FONTS.body3, color: COLORS.gray, marginLeft: 10 }}>
            Currency
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{ ...FONTS.body3, color: COLORS.primary, marginLeft: 10 }}>
              Pound Sterling
            </Text>
            <Icon
              name="chevron-right"
              style={{ ...FONTS.h2, color: COLORS.gray, marginLeft: 10 }}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 2,
            backgroundColor: COLORS.white,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Text style={{ ...FONTS.body3, color: COLORS.gray, marginLeft: 10 }}>
            Languages
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{ ...FONTS.body3, color: COLORS.primary, marginLeft: 10 }}>
              English
            </Text>
            <Icon
              name="chevron-right"
              style={{ ...FONTS.h2, color: COLORS.gray, marginLeft: 10 }}
            />
          </View>
        </View>
        <TouchableWithoutFeedback onPress={onToggleNotification}>
          <View
            style={{
              marginTop: 2,
              backgroundColor: COLORS.white,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text style={{ ...FONTS.body3, color: COLORS.gray, marginLeft: 10 }}>
              Notification
            </Text>
            <ToggleSwitch
              isOn={notification}
              onColor={COLORS.secondary}
              offColor={COLORS.lightGray}
              labelStyle={{ color: 'black', fontWeight: '900' }}
              size="large"
              onToggle={onToggleNotification}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Privacy")}>
          <View
            style={{
              marginTop: 20,
              backgroundColor: COLORS.white,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text style={{ ...FONTS.body3, color: COLORS.gray, marginLeft: 10 }}>
              Privacy Policy
            </Text>
            <Icon
              name="chevron-right"
              style={{ ...FONTS.h2, color: COLORS.gray, marginLeft: 10 }}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Terms")}>
          <View
            style={{
              marginTop: 2,
              backgroundColor: COLORS.white,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text style={{ ...FONTS.body3, color: COLORS.gray, marginLeft: 10 }}>
              Terms &amp; Conditions
            </Text>
            <Icon
              name="chevron-right"
              style={{ ...FONTS.h2, color: COLORS.gray, marginLeft: 10 }}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("About")}>
          <View
            style={{
              marginTop: 2,
              backgroundColor: COLORS.white,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text style={{ ...FONTS.body3, color: COLORS.gray, marginLeft: 10 }}>
              About Us
            </Text>
            <Icon
              name="chevron-right"
              style={{ ...FONTS.h2, color: COLORS.gray, marginLeft: 10 }}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Support")}>
          <View
            style={{
              marginTop: 2,
              backgroundColor: COLORS.white,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text style={{ ...FONTS.body3, color: COLORS.gray, marginLeft: 10 }}>
              Support
            </Text>
            <Icon
              name="chevron-right"
              style={{ ...FONTS.h2, color: COLORS.gray, marginLeft: 10 }}

            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
