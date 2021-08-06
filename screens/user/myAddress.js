import React from 'react';

import { View, Text, FlatList, Dimensions, Animated, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { FAB, Button } from 'react-native-paper';

import { GET_ADDRESS, client, DELETE_ADDRESS } from "../../constants/graphql";
import Auth from "../../constants/context/auth";
import UserContext from '../../constants/context/userContext';

const { width, height } = Dimensions.get('window');
import theme from '../../constants/theme';
import { ScrollView } from 'react-native';
const { COLORS, FONTS, SIZES } = theme;

import { useIsFocused } from '@react-navigation/native';

export default function MyAddress({ navigation, route }) {
    const isFocused = useIsFocused();
    const scrollX = new Animated.Value(0);
    const { token } = React.useContext(Auth);
    const { user, getUserData } = React.useContext(UserContext);
    const [counter, setCounter] = React.useState(false);

    const deleteAddress = async (arg) => {
        client.setHeader('authorization', `Bearer ${token}`);
        const deleteAddress = await client.request(DELETE_ADDRESS, { addressId: arg });
        const addresses = await client.request(GET_ADDRESS);
        getUserData();
        setCounter(!counter);
    }

    React.useEffect(() => {
        if (isFocused) {
            getUserData();
        }
    }, [isFocused])

    const dummyAddress = {
        name: "",
        pin: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        mobile: "",
        type: "",
        countryCode:"",
        country:""
    }


    return (
        <View style={{ height: height }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, justifyContent: "space-between", marginRight: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                        name="chevron-left"
                        style={{
                            ...FONTS.h2,
                            color: COLORS.primary,
                            fontWeight: 'bold',
                            marginRight: 10,
                        }}
                        onPress={() => navigation.goBack()}
                    />
                    <Text
                        style={{ ...FONTS.body2, color: COLORS.primary, fontWeight: 'bold' }}>
                        {user.address.length === 0 ? "Add " : "Saved "}Addresses
                    </Text>
                </View>
                {user.address.length !== 0 && <View>
                    <FAB
                        style={{

                            fontWeight: 'bold',
                            elevation: 1,
                            backgroundColor: COLORS.secondary,
                        }}
                        small
                        color={COLORS.white}
                        icon="plus"
                        onPress={() => navigation.navigate('AddAddress', { screen: "Addresses",address:dummyAddress })}
                    />
                </View>}
            </View>
            <View style={{ flex: 1 }}>
                {user.address.length !== 0 && <FlatList
                    data={user.address}
                    keyExtractor={(item) => 'key' + item.id}
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
                                <View>
                                    <View style={{ width: width - 20, padding: 10 }}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                            }}>
                                            <Text style={{ ...FONTS.body2, color: COLORS.primary }}>
                                                {item.name}
                                            </Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <SimpleLineIcons
                                                    name="pencil"
                                                    style={{
                                                        ...FONTS.body2,
                                                        color: COLORS.gray,
                                                        marginRight: 10,
                                                    }}
                                                    onPress={() => navigation.navigate("AddAddress", { screen: "AddAddress", address: item })}
                                                />
                                                <Icon
                                                    name="trash-can-outline"
                                                    style={{ ...FONTS.body2, color: COLORS.gray }}
                                                    onPress={() => deleteAddress(item.id)}
                                                />
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{ ...FONTS.body5, color: COLORS.lightGray }}>
                                                {item.line1}, {item.line2}
                                            </Text>
                                            <Text style={{ ...FONTS.body5, color: COLORS.lightGray }}>
                                                {item.city} {item.pincode},
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
                {user.address.length === 0 && <>
                    <ScrollView contentContainerStyle={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                        <Image source={{ uri: "https://res.cloudinary.com/vevibes/image/upload/v1626525983/App%20Assets/Asset_22_bwovwp.png" }}
                            style={{ width: width / 1.5, height: 250 }} resizeMode="contain" />
                        <Text style={{ ...FONTS.body2, color: COLORS.primary, fontWeight: 'bold', margin: 10 }}>No addresses added yet</Text>
                        <Text style={{ ...FONTS.body5, color: COLORS.gray }}>Please add an address and come back</Text>
                    </ScrollView>
                    <Button mode="contained" style={{ backgroundColor: COLORS.secondary, margin: 10 }} onPress={() => navigation.navigate("AddAddress", { screen: "AddAddress", address: dummyAddress })}>
                        <Text style={{ ...FONTS.body5, color: COLORS.white, fontWeight: 'bold' }}>Add new address</Text>
                    </Button>
                </>}
            </View>
        </View>

    );
}
