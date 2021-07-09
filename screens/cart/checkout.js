import React, {useState} from 'react';

import {
  View,
  ScrollView,
  Text,
  Dimensions,
  Animated,
  FlatList,
} from 'react-native';
import {TextInput, Divider, Button} from 'react-native-paper';
import {CheckBox} from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Modalize} from 'react-native-modalize';
import DatePicker from 'react-native-date-picker';

const {width, height} = Dimensions.get('window');
import theme from '../../constants/theme';
import {Image} from 'react-native-elements/dist/image/Image';
const {COLORS, FONTS, SIZES} = theme;

export default function Checkout({navigation}) {
  const scrollX = new Animated.Value(0);
  const [collection, setCollection] = React.useState(true);
  const [delivery, setDelivery] = React.useState(false);
  const addressRef = React.useRef(null);
  const dateRef = React.useRef(null);
  const [checked, setChecked] = React.useState(-1);
  const [date, setDate] = useState(new Date());

  const data = [
    {
      name: 'Joseph',
      street: 'Lyric Theatre',
      locality: 'Lyric Square',
      city: 'London',
      zip: 'W6 0QL',
      country: 'United Kingdon',
      phone: '+44 999-XXX-XXXX',
    },
    {
      name: 'Joseph',
      street: 'Lyric Theatre',
      locality: 'Lyric Square',
      city: 'London',
      zip: 'W6 0QL',
      country: 'United Kingdon',
      phone: '+44 999-XXX-XXXX',
    },
    {
      name: 'Joseph',
      street: 'Lyric Theatre',
      locality: 'Lyric Square',
      city: 'London',
      zip: 'W6 0QL',
      country: 'United Kingdon',
      phone: '+44 999-XXX-XXXX',
    },
    {
      name: 'Joseph',
      street: 'Lyric Theatre',
      locality: 'Lyric Square',
      city: 'London',
      zip: 'W6 0QL',
      country: 'United Kingdon',
      phone: '+44 999-XXX-XXXX',
    },
  ];

  const emptyData = [];

  return (
    <View style={{flex: 1, padding: 10}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name="chevron-left"
          style={{...FONTS.body1, color: COLORS.primary, fontWeight: 'bold'}}
        />
        <Text
          style={{...FONTS.body5, color: COLORS.primary, fontWeight: 'bold'}}>
          Checkout Details
        </Text>
      </View>
      <ScrollView style={{marginTop: 20}}>
        <View
          style={{borderBottomWidth: 2, borderBottomColor: COLORS.lightGray}}>
          <Text style={{...FONTS.body3, color: COLORS.lightGray}}>
            Delivery Date
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                ...FONTS.body5,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginTop: 10,
              }}>
              Sunday, 10 May 20, 10:00 AM
            </Text>
            <Icon
              name="chevron-right"
              style={{...FONTS.body2, color: COLORS.primary}}
              onPress={() => dateRef.current.open()}
            />
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: COLORS.lightGray,
            marginTop: 15,
          }}>
          <Text style={{...FONTS.body3, color: COLORS.lightGray}}>
            Delivery Address
          </Text>
          <Text
            style={{
              ...FONTS.body5,
              color: COLORS.primary,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            Home
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                ...FONTS.body5,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginTop: 10,
              }}>
              11, Ralph Coure, Queensway
            </Text>
            <Icon
              name="chevron-right"
              style={{...FONTS.body2, color: COLORS.primary}}
              onPress={() => addressRef.current.open()}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            width: width - 20,
            marginTop: 15,
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLORS.white,
              borderColor: COLORS.gray,
              borderRadius: 10,
              width: width / 2 - 25,
              justifyContent: 'space-between',
              borderWidth: 2,
              marginRight: 10,
            }}>
            <Text style={{...FONTS.body3, color: COLORS.gray, marginLeft: 10}}>
              Collection
            </Text>
            <CheckBox
              checkedIcon={
                <Icon
                  name="record-circle-outline"
                  style={{...FONTS.body2, color: COLORS.secondary}}
                />
              }
              iconRight={true}
              iconType="material"
              uncheckedIcon={
                <Icon
                  name="circle-outline"
                  style={{...FONTS.body2, color: COLORS.gray}}
                />
              }
              checked={collection}
              onPress={() => {
                if (delivery) {
                  setDelivery(false);
                }
                setCollection(true);
                return;
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLORS.white,
              borderWidth: 2,
              borderColor: COLORS.gray,
              borderRadius: 10,
              width: width / 2 - 25,
              justifyContent: 'space-between',
            }}>
            <Text style={{...FONTS.body3, color: COLORS.gray, marginLeft: 10}}>
              Delivery
            </Text>
            <CheckBox
              checkedIcon={
                <Icon
                  name="record-circle-outline"
                  style={{...FONTS.body2, color: COLORS.secondary}}
                />
              }
              iconRight={true}
              iconType="material"
              uncheckedIcon={
                <Icon
                  name="circle-outline"
                  style={{...FONTS.body2, color: COLORS.gray}}
                />
              }
              checked={delivery}
              onPress={() => {
                if (collection) {
                  setCollection(false);
                }
                setDelivery(true);
                return;
              }}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 20,
            borderColor: COLORS.secondary,
            borderStyle: 'dashed',
            padding: 20,
            borderWidth: 2,
            margin: 10,
            backgroundColor: '#f7f7f7',
          }}>
          <Text style={{...FONTS.body5, color: COLORS.primary}}>
            Coupon Code
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{...FONTS.body5, color: COLORS.secondary}}>
              VEGAN50
            </Text>
            <Icon
              name="check-circle"
              style={{...FONTS.body5, color: COLORS.secondary, marginLeft: 5}}
            />
          </View>
        </View>
      </ScrollView>
      <Modalize modalHeight={300} ref={addressRef}>
        {data.length === 0 ? (
          <View style={{margin: 10}}>
            <Text
              style={{
                ...FONTS.body2,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginTop: 20,
              }}>
              No address added yet
            </Text>
            <Text
              style={{
                ...FONTS.body5,
                marginTop: 15,
                marginBottom: 20,
                color: COLORS.lightGray,
              }}>
              Please add address and come back
            </Text>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: COLORS.lightGray,
                borderStyle: 'dashed',
                borderRadius: 20,
                height: 150,
              }}>
              <Image
                source={{
                  uri: 'https://res.cloudinary.com/vevibes/image/upload/v1625487955/App%20Assets/Asset_16_m7jkxe.png',
                }}
                style={{width: 50, height: 80}}
                resizeMode="contain"
                onPress={() => navigation.navigate('AddAddress')}
              />
            </View>
          </View>
        ) : (
          <View style={{margin: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Text
                style={{
                  ...FONTS.body2,
                  color: COLORS.primary,
                  fontWeight: 'bold',
                }}>
                Choose Address
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name="plus"
                  style={{
                    color: COLORS.white,
                    ...FONTS.h2,
                    backgroundColor: COLORS.secondary,
                    borderRadius: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    marginRight: 10,
                  }}
                  onPress={() => navigation.navigate('AddAddress')}
                />
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.body2,
                    backgroundColor: COLORS.secondary,
                    borderRadius: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    marginRight: 10,
                    padding: 2,
                  }}
                  onPress={() => addressRef.current.close()}>
                  Done
                </Text>
              </View>
            </View>
            {data.map((item, index) => {
              return (
                <ScrollView
                  key={index + Math.random(index)}
                  style={{
                    width: width - 40,
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
                          style={{...FONTS.body2, color: COLORS.secondary}}
                        />
                      }
                      iconType="material"
                      uncheckedIcon={
                        <Icon
                          name="circle-outline"
                          style={{...FONTS.body2, color: COLORS.gray}}
                        />
                      }
                      checked={checked === index}
                      onPress={() => setChecked(index)}
                    />
                    <View style={{width: width - 100}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            ...FONTS.body2,
                            color: COLORS.primary,
                            fontWeight: 'bold',
                          }}>
                          {item.name}
                        </Text>
                      </View>
                      <View>
                        <Text style={{...FONTS.body5, color: COLORS.lightGray}}>
                          {item.street}, {item.locality}
                        </Text>
                        <Text style={{...FONTS.body5, color: COLORS.lightGray}}>
                          {item.city} {item.zip},
                        </Text>
                        <Text style={{...FONTS.body5, color: COLORS.lightGray}}>
                          {item.country}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{...FONTS.body5, color: COLORS.primary}}>
                            Mobile:{' '}
                          </Text>
                          <Text
                            style={{...FONTS.body5, color: COLORS.lightGray}}>
                            {item.phone}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              );
            })}
          </View>
        )}
      </Modalize>
      <Modalize modalHeight={300} ref={dateRef}>
        <View style={{margin: 10, marginTop: 20, justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <Text
              style={{
                ...FONTS.body2,
                color: COLORS.primary,
                fontWeight: 'bold',
              }}>
              Choose Date &amp; Time
            </Text>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.body2,
                backgroundColor: COLORS.secondary,
                borderRadius: 10,
                paddingLeft: 20,
                paddingRight: 20,
                marginRight: 10,
                padding: 2,
              }}
              onPress={() => dateRef.current.close()}>
              Done
            </Text>
          </View>
          <View style={{justifyContent:"center",alignItems: 'center'}}>
            <DatePicker
              date={date}
              onDateChange={setDate}
              minuteInterval={10}
              textColor={COLORS.primary}
              dividerHeight={0}
              fadeToColor="none"
            />
          </View>
        </View>
      </Modalize>
      <View style={{margin: 10, flex: 0}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...FONTS.body5, color: COLORS.lightGray}}>
            Delivery Fees
          </Text>
          <Text
            style={{...FONTS.body5, color: COLORS.primary, fontWeight: 'bold'}}>
            $05
          </Text>
        </View>
        <Divider
          style={{
            backgroundColor: COLORS.lightGray,
            marginBottom: 10,
            marginTop: 10,
            height: 2,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...FONTS.body5, color: COLORS.lightGray}}>
            Discount
          </Text>
          <Text
            style={{...FONTS.body5, color: COLORS.primary, fontWeight: 'bold'}}>
            $06
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...FONTS.body5, color: COLORS.lightGray}}>
            Total Price
          </Text>
          <Text
            style={{...FONTS.body5, color: COLORS.primary, fontWeight: 'bold'}}>
            $24
          </Text>
        </View>
        <Divider
          style={{
            backgroundColor: COLORS.lightGray,
            marginBottom: 10,
            marginTop: 10,
            height: 2,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...FONTS.body5, color: COLORS.primary}}>
            Grand Total
          </Text>
          <Text
            style={{
              ...FONTS.body5,
              color: COLORS.secondary,
              fontWeight: 'bold',
            }}>
            $23
          </Text>
        </View>
        <Button
          mode="text"
          style={{
            backgroundColor: COLORS.secondary,
            padding: 10,
            marginTop: 20,
            borderRadius: 10,
            zIndex: -1,
          }}
          onPress={() => navigation.navigate('Payment')}>
          <Text
            style={{...FONTS.body5, color: COLORS.white, fontWeight: 'bold'}}>
            Confirm Order
          </Text>
        </Button>
      </View>
    </View>
  );
}
