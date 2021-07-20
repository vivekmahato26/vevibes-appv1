import React from 'react';

import { View, Text, FlatList, Dimensions, Animated,ScrollView,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Button, FAB, Snackbar } from 'react-native-paper';

import { GET_ADDRESS, client } from '../../constants/graphql';
import Auth from '../../constants/context/auth';

import { CheckBox } from 'react-native-elements';

const { width, height } = Dimensions.get('window');
import theme from '../../constants/theme';
const { COLORS, FONTS, SIZES } = theme;

import { useIsFocused } from "@react-navigation/native";

export default function Address({ navigation, route }) {
  const isFocused = useIsFocused();
  const { authenticated, token } = React.useContext(Auth);
  const couponCode = route.params.couponCode;
  const cart = route.params.cart;
  const discount = route.params.discount;
  const total = route.params.total;
  const grandTotal = route.params.grandTotal;
  const deliveryPrice = route.params.deliveryPrice;
  const scrollX = new Animated.Value(0);
  const [checked, setChecked] = React.useState(-1);
  const [visible, setVisible] = React.useState(false);
  const [addresses, setAddresses] = React.useState([])

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const getAddress = async () => {
    client.setHeader('authorization', `Bearer ${token}`);
    const address = await client.request(GET_ADDRESS);
    const addressData = address.getAddress;
    setAddresses(addressData);
    return;
  }

  React.useEffect(() => {
    getAddress();
  }, [isFocused])

  const goToCheckout = () => {

    if (checked !== -1) {
      navigation.navigate('Checkout', {
        screen: "Checkout",
        cart: cart,
        discount: discount,
        total: total,
        grandTotal: grandTotal,
        couponCode: couponCode,
        deliveryPrice: deliveryPrice,
        address: addresses[checked],
        addressList: addresses
      })
    }
    else {
      onToggleSnackBar();
      return;
    }
  }
  return (
    <View style={{ height: height }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
        <Icon
          name="chevron-left"
          style={{
            ...FONTS.body1,
            color: COLORS.primary,
            fontWeight: 'bold',
            marginRight: 10,
          }}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{ ...FONTS.body2, color: COLORS.primary, fontWeight: 'bold' }}>
          Delivery Address
        </Text>
      </View>
      <View style={{ height: height - 110 }}>
        {addresses.length !== 0 && <FlatList
          data={addresses}
          keyExtractor={(item, index) => 'key' + index}
          decelerationRate={'normal'}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  width: width - 20,
                  borderStyle: 'solid',
                  borderRadius: 10,
                  borderWidth: 1.5,
                  margin: 10,
                  paddingBottom: 10,
                  backgroundColor: '#ffffff',
                  borderColor: COLORS.lightGray,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    marginTop: 0,
                  }}>
                  <CheckBox
                    start
                    checkedIcon={
                      <Icon
                        name="record-circle-outline"
                        style={{ ...FONTS.body2, color: COLORS.secondary }}
                      />
                    }
                    iconType="material"
                    uncheckedIcon={
                      <Icon
                        name="circle-outline"
                        style={{ ...FONTS.body2, color: COLORS.gray }}
                      />
                    }
                    checked={checked === index}
                    onPress={() => setChecked(index)}
                  />
                  <View style={{ width: width - 100 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{ ...FONTS.body2, color: COLORS.primary }}>
                        {item.name}
                      </Text>
                    </View>
                    <View>
                      <Text style={{ ...FONTS.body5, color: COLORS.lightGray }}>
                        {item.line1}, {item.line2}
                      </Text>
                      <Text style={{ ...FONTS.body5, color: COLORS.lightGray }}>
                        {item.city} {item.pin},
                      </Text>
                      <Text style={{ ...FONTS.body5, color: COLORS.lightGray }}>
                        {item.country}
                      </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ ...FONTS.body5, color: COLORS.primary }}>
                          Mobile:{' '}
                        </Text>
                        <Text style={{ ...FONTS.body5, color: COLORS.lightGray }}>
                          {item.mobile}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
        />}
        {addresses.length === 0 && <>
                    <ScrollView contentContainerStyle={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                        <Image source={{ uri: "https://res.cloudinary.com/vevibes/image/upload/v1626525983/App%20Assets/Asset_22_bwovwp.png" }}
                            style={{ width: width / 1.5, height: 250 }} resizeMode="contain" />
                        <Text style={{ ...FONTS.body2, color: COLORS.primary, fontWeight: 'bold', margin: 10 }}>No addresses added yet</Text>
                        <Text style={{ ...FONTS.body5, color: COLORS.gray }}>Please add an address and come back</Text>
                    </ScrollView>
                </>}
      </View>
      <View style={{ marginTop: '0%', margin: 10 }}>
        <FAB
          style={{
            position: 'absolute',
            bottom: 50,
            right: 0,
            fontWeight: 'bold',
            elevation: 0,
            backgroundColor: COLORS.secondary,
          }}
          small
          color={COLORS.white}
          icon="plus"
          onPress={() => navigation.navigate('AddAddress')}
        />
        <Button
          mode="flat"
          style={{ backgroundColor: COLORS.secondary }}
          onPress={goToCheckout}>
          <Text
            style={{ ...FONTS.body5, color: COLORS.white, fontWeight: 'bold' }}>
            Delivery to this address
          </Text>
        </Button>
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={1000}
          action={{
            label: 'OK',
            onPress: () => {
              // Do something
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
            Please select a deliver address!
          </Text>
        </Snackbar>
      </View>
    </View>
  );
}
