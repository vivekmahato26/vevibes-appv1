import React from 'react';
import { Image } from 'react-native';

import { View, Text, TouchableWithoutFeedback, Dimensions } from "react-native";

import theme from "../constants/theme";

const { width, height } = Dimensions.get('window');

const { FONTS, COLORS } = theme;

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Search({ results, navigation, modalizeRef,query }) {
    return (
        <View>
            {results.map((result) => {
                return (
                    <TouchableWithoutFeedback key={result.objectID} onPress={async () => {
                        if (modalizeRef) {
                            modalizeRef.current.close();
                        }
                        const history = await AsyncStorage.getItem('searches');
                        if (history) {
                            var temp = JSON.parse(history);
                            temp.push(query);
                            temp = JSON.stringify(temp);
                            await AsyncStorage.setItem('searches', temp);
                        }
                        else {
                            await AsyncStorage.setItem("searches", JSON.stringify([query]));
                        }
                        navigation.navigate('ProductDetails', {
                            screen: 'ProductsDetails',
                            product: { ...result, id: result.objectID },
                        })
                    }}>
                        <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{ uri: result.img[0] }} style={{ width: 60, height: 60 }} />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={{ flexShrink: 1, ...FONTS.body3, color: COLORS.secondary, flexWrap: 'wrap', width: width - 80 }}>{result.name}</Text>
                                <Text>{result.category}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )
            })}
        </View>
    )
}
