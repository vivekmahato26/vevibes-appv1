import React from 'react';

import { View, Text, FlatList, Dimensions, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button } from 'react-native-paper';


const { width, height } = Dimensions.get('window');
import theme from '../../constants/theme';
const { COLORS, FONTS, SIZES } = theme;

export default function Coupons({ navigation, route }) {
    const scrollX = new Animated.Value(0);
    const data = [
        {
          name: 'Get 15% Off',
          description: 'Get £15 off on purchase of £100 and above',
          code: 'VEGAN15',
          discount: 15,
          percent: true,
          minCartPrice: 100
        },
        {
          name: 'Get £5 Off',
          description: 'Get £5 off on purchase of £50 and above',
          code: 'VEVIBES5',
          discount: 5,
          percent: false,
          minCartPrice: 50
        },
        {
          name: 'Get £15 Off',
          description: 'Get £15 off on purchase of £10 and above',
          code: 'VEGAN10',
          discount: 10,
          percent: true,
          minCartPrice: 10
        },
        {
          name: 'Get £15 Off',
          description: 'Get £15 off on purchase of £100 and above',
          code: 'VEGAN20',
          discount: 20,
          percent: true,
          minCartPrice: 80
        },
        {
          name: 'Get £15 Off',
          description: 'Get £15 off on purchase of £100 and above',
          code: 'VEGAN50',
          discount: 50,
          percent: true,
          minCartPrice: 100
        },
      ];
   
    return (
        <View style={{ height: height }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 ,justifyContent:"space-between",marginRight:10}}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
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
                       My Coupons
                    </Text>
                </View>
                
            </View>
            <View style={{flex:1}}>
        <Text
          style={{
            ...FONTS.body2,
            color: COLORS.primary,
            margin: 10,
          }}>
          Available Coupons
        </Text>
        <FlatList
          data={data}
          keyExtractor={(item, index) => 'key' + index}
          decelerationRate={'normal'}
          scrollEventThrottle={16}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  width: width - 20,
                  borderStyle: 'dashed',
                  borderRadius: 5,
                  borderWidth: 1.5,
                  margin: 10,
                  padding: 10,
                  backgroundColor: '#ffffff',
                  borderColor: COLORS.lightGray,
                }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        ...FONTS.body3,
                        fontWeight: 'bold',
                        color: COLORS.primary,
                      }}>
                      {item.name}
                    </Text>
                    <Button
                      theme={{ colors: { primary: COLORS.white }, roundness: 10 }}
                      style={{
                        backgroundColor: COLORS.secondary,
                      }}>
                      <Text style={{ fontWeight: "bold" }}>{item.code}</Text>
                    </Button>
                  </View>
                  <Text
                    style={{
                      ...FONTS.body3,
                      color: COLORS.gray,
                    }}>
                    {item.description}
                  </Text>
                </View>
              </View>
            );
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX, y: scrollX } } }],
            { useNativeDriver: false },
          )}
        />
      </View>
        </View>
    );
}
