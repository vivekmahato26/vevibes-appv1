import React from 'react';

import {View, Text, ScrollView, Dimensions} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Dash from 'react-native-dash';
import {Button} from 'react-native-paper';

import {client,GET_ORDER_DETAILS} from "../../constants/graphql";

import AuthContext from "../../constants/context/auth";
import {useIsFocused} from "@react-navigation/native";
import moment from "moment";

const {width, height} = Dimensions.get('window');
import {trackPackage} from "../../constants/shipengine";
import theme from '../../constants/theme';
const {COLORS, FONTS, SIZES} = theme;

export default function OrderDetails({navigation, route}) {
  const isFocused = useIsFocused();
  const {token} = React.useContext(AuthContext);
  const orderId = route.params.orderId;
  const [orderDetails,setOrderDetails] = React.useState({});

  const [trackingData,setTrackingData] = React.useState({});

  const trackShipment = async (trackingNumber) => {
    const data =  await trackPackage(trackingNumber);
    setTrackingData(data);
  }

  React.useEffect(() => {
    getOrderDetails();
  },[isFocused])

  const getOrderDetails = async () => {
    client.setHeader('authorization', `Bearer ${token}`);
    const orderDetailsData = await client.request(GET_ORDER_DETAILS,{id: orderId});
    const trackingNumber = orderDetailsData.getOrder.lable[0].tracking_number
    trackShipment(trackingNumber);
    setOrderDetails(orderDetailsData.getOrder);
  }
  return (
    <View style={{flex: 1}}>
      <View style={{margin: 10,flexDirection:"row",alignItems: "center"}}>
        <Icon name="chevron-left"  style={{color:COLORS.primary,...FONTS.h2}}  onPress={() => navigation.goBack()}/>
        <Text style={{color:COLORS.primary,...FONTS.body2,fontWeight: 'bold'}}>{orderDetails.id}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 10,
        }}>
        <Icon
          name="check-circle"
          style={{color: COLORS.secondary, ...FONTS.body3, padding: 3}}
        />
        <Dash
          style={{width: '15%', height: 1}}
          dashColor={COLORS.secondary}
          dashLength={6}
          dashGap={4}
        />
        <Icon
          name="check-circle"
          style={{color: COLORS.secondary, ...FONTS.body3, padding: 3}}
        />
        <Dash
          style={{width: '15%', height: 1}}
          dashColor={COLORS.secondary}
          dashLength={6}
          dashGap={4}
        />
        <Icon
          name="check-circle"
          style={{color: COLORS.secondary, ...FONTS.body3, padding: 3}}
        />
        <Dash
          style={{width: '15%', height: 1}}
          dashColor={COLORS.secondary}
          dashLength={6}
          dashGap={4}
        />
        <Icon
          name="check-circle"
          style={{color: COLORS.secondary, ...FONTS.body3, padding: 3}}
        />
        <Dash
          style={{width: '15%', height: 1}}
          dashColor={COLORS.lightGray}
          dashLength={6}
          dashGap={4}
        />
        <Icon
          name="check-circle"
          style={{color: COLORS.lightGray, ...FONTS.body3, padding: 3}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: 10,
          marginRight: 10,
        }}>
        <Text style={{...FONTS.h4, color: COLORS.primary, fontWeight: 'bold'}}>
          Pending
        </Text>
        <Text style={{...FONTS.h4, color: COLORS.primary, fontWeight: 'bold'}}>
          Processed
        </Text>
        <Text style={{...FONTS.h4, color: COLORS.primary, fontWeight: 'bold'}}>
          Picked
        </Text>
        <Text style={{...FONTS.h4, color: COLORS.primary, fontWeight: 'bold'}}>
          Dispatched
        </Text>
        <Text style={{...FONTS.h4, color: COLORS.primary, fontWeight: 'bold'}}>
          Delivered
        </Text>
      </View>
      <View style={{flex: 1, marginTop: 20}}>
        <Text
          style={{
            ...FONTS.body2,
            color: COLORS.primary,
            fontWeight: 'bold',
            backgroundColor: '#f4f4f4',
            padding: 10,
          }}>
          ORDER PROCESS
        </Text>
        <ScrollView>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={{marginLeft: 20}}>
              <Icon
                name="check-circle"
                style={{color: COLORS.secondary, ...FONTS.body3, padding: 3}}
              />
              <Dash
                style={{
                  width: 2,
                  height: 80,
                  flexDirection: 'column',
                  marginLeft: 10,
                }}
                dashColor={COLORS.secondary}
                dashLength={6}
                dashGap={4}
              />
              <Icon
                name="check-circle"
                style={{color: COLORS.secondary, ...FONTS.body3, padding: 3}}
              />
              <Dash
                style={{
                  width: 2,
                  height: 80,
                  flexDirection: 'column',
                  marginLeft: 10,
                }}
                dashColor={COLORS.secondary}
                dashLength={6}
                dashGap={4}
              />
              <Icon
                name="check-circle"
                style={{color: COLORS.secondary, ...FONTS.body3, padding: 3}}
              />
              <Dash
                style={{
                  width: 2,
                  height: 80,
                  flexDirection: 'column',
                  marginLeft: 10,
                }}
                dashColor={COLORS.secondary}
                dashLength={6}
                dashGap={4}
              />
              <Icon
                name="check-circle"
                style={{color: COLORS.secondary, ...FONTS.body3, padding: 3}}
              />
              <Dash
                style={{
                  width: 2,
                  height: 80,
                  flexDirection: 'column',
                  marginLeft: 10,
                }}
                dashColor={COLORS.lightGray}
                dashLength={6}
                dashGap={4}
              />
              <Icon
                name="check-circle"
                style={{color: COLORS.lightGray, ...FONTS.body3, padding: 3}}
              />
              <Dash
                style={{
                  width: 2,
                  height: 40,
                  flexDirection: 'column',
                  marginLeft: 10,
                }}
                dashColor={COLORS.lightGray}
                dashLength={6}
                dashGap={4}
              />
            </View>
            <View style={{width: width - 100, marginLeft: 20}}>
              <Text
                style={{...FONTS.h4, color: COLORS.gray, fontWeight: 'bold'}}>
                {moment(parseInt(orderDetails.createdAt)).format('MMMM Do YYYY')}
              </Text>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.primary,
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>
                Order no. {orderDetails.id} was confirmed.
              </Text>
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.gray,
                  fontWeight: 'bold',
                  marginTop: 25,
                }}>
                08 May 09:43
              </Text>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.primary,
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>
                Order no. #45312 was confirmed,please check your account
              </Text>
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.gray,
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>
                08 May 09:43
              </Text>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.primary,
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>
                Order no. #45312 was confirmed,please check your account
              </Text>
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.gray,
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>
                08 May 09:43
              </Text>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.primary,
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>
                Order no. #45312 was confirmed,please check your account
              </Text>
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.gray,
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>
                08 May 09:43
              </Text>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.primary,
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>
                Order no. #45312 was confirmed,please check your account
              </Text>
            </View>
          </View>
        </ScrollView>
        <Button
          mode="contained"
          style={{
            backgroundColor: COLORS.secondary,
            margin: 10,
            borderRadius: 10,
          }}>
          <Text
            style={{...FONTS.body2, color: COLORS.white, fontWeight: 'bold'}}>
            Cancle
          </Text>
        </Button>
      </View>
    </View>
  );
}
