import React, { useState } from 'react';

import { View, ScrollView, Text, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from "react-native-paper";
import theme from '../../constants/theme';
const { COLORS, FONTS, SIZES } = theme;
const { width, height } = Dimensions.get('window');

import { client, GET_ORDERS } from "../../constants/graphql";
import AuthContext from "../../constants/context/auth";

import { noOrder } from "../../constants/images";

import { useIsFocused } from "@react-navigation/native";

import moment from "moment";
import _ from "lodash";

import { trackPackage } from "../../constants/shipengine";

export default function Orders({ navigation }) {
  const isFocused = useIsFocused();
  const { token } = React.useContext(AuthContext);
  const [orders, setOrders] = React.useState([]);
  const [trackingData, setTrackingData] = React.useState([{}]);
  const getOrder = async () => {
    client.setHeader('authorization', `Bearer ${token}`);
    const ordersRequest = await client.request(GET_ORDERS);
    setOrders(ordersRequest.getUserOrders);
    var temp = [];
    for(let i = 0; i < orders.length; i++) {
      const tracking_number = orders[i].lable[0].tracking_number;
      const shipmentTrackingData = await trackPackage(tracking_number);
      temp.push(shipmentTrackingData);
    }
    setTrackingData(temp);
  }
  React.useEffect(() => {
    getOrder();
  }, [isFocused])
  return (
    <View style={{ flex: 1, margin: 10 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 30,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name="chevron-left"
            style={{ ...FONTS.h2, color: COLORS.primary }} onPress={() => navigation.goBack()}
          />
          <Text
            style={{ ...FONTS.body2, color: COLORS.primary, fontWeight: 'bold' }}>
            Orders
          </Text>
        </View>
        <Icon name="magnify" style={{ ...FONTS.h2, color: COLORS.primary }} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          marginBottom: 20,
        }}>
        <Text
          style={{ ...FONTS.body3, color: COLORS.white, fontWeight: 'bold', borderTopLeftRadius: 20, borderBottomLeftRadius: 20, backgroundColor: COLORS.secondary, padding: 20 }}>
          All
        </Text>
        <Text
          style={{ ...FONTS.body3, color: COLORS.primary, fontWeight: 'bold', backgroundColor: "#f4f4f4", padding: 20 }}>
          Ongoing
        </Text>
        <Text
          style={{ ...FONTS.body3, color: COLORS.primary, fontWeight: 'bold', backgroundColor: "#f4f4f4", padding: 20 }}>
          Processing
        </Text>
        <Text
          style={{ ...FONTS.body3, color: COLORS.primary, fontWeight: 'bold', backgroundColor: "#f4f4f4", padding: 20, borderBottomRightRadius: 20, borderTopRightRadius: 20 }}>
          Completed
        </Text>
      </View>
      {orders.length > 0 && <ScrollView>
        {orders.map((d, index) => {
          var items = 0;
          const cart = d.cart;
          for (let i = 0; i < cart.length; i++) {
            items += cart[i].quantity;
          }
          var status = d.status;
          status = _.orderBy(status, ["updatedAt"], ['desc']);
          return (
            <View
              key={d.id + index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.lightGray,
              }}>
              <View
                style={{
                  backgroundColor: COLORS.secondary,
                  width: width * 0.03,
                  height: '100%',
                  borderBottomLeftRadius: 10,
                  borderTopLeftRadius: 10,
                }}></View>
              <View style={{ margin: 10 }}>
                <View
                  style={{
                    width: width - 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      ...FONTS.body3,
                      color: COLORS.primary,
                      fontWeight: 'bold',
                    }}
                    onPress={() => navigation.navigate("OrderDetails", { screen: "OrderDetails", orderId: d.id })}
                  >
                    Order no:{d.id}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.body3,
                      color: COLORS.primary,
                      fontWeight: 'bold',
                    }}>
                    {status[0].status}
                  </Text>
                </View>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.gray,
                  }}>
                  {moment(parseInt(d.createdAt)).format('MMMM Do YYYY')}
                </Text>
                <View
                  style={{
                    width: width - 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  {trackingData.length !== 0 && <Text
                    style={{
                      ...FONTS.body3,
                      color: COLORS.gray,
                    }}>
                    {trackingData[0].status_description}
                  </Text>}
                  <Text
                    style={{
                      ...FONTS.body3,
                      color: COLORS.gray,
                    }}>
                    Item X {items} ={' '}
                    <Text
                      style={{
                        ...FONTS.body3,
                        color: COLORS.secondary,
                        fontWeight: 'bold',
                      }}>
                      {d.cartValue}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>}
      {
        orders.length <= 0 && <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Image source={{ uri: noOrder }} style={{ width: width - 80, height: 400 }} resizeMode="contain" />
          <Text>You don't have any orders</Text>
          <Button mode="contained" style={{ marginTop: 20, backgroundColor: COLORS.secondary }} onPress={() => navigation.goBack()}>
            <Text style={{ ...FONTS.body2, color: COLORS.white, fontWeight: 'bold' }}>Start Shopping</Text>
          </Button>
        </View>
      }
    </View>
  );
}
