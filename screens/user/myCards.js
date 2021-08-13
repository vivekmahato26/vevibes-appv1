import React from 'react';


import Auth from "../../constants/context/auth";

import { client, GET_CARDS, REMOVE_CARD } from "../../constants/graphql";

import { View, Text, Dimensions, Animated, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fa from 'react-native-vector-icons/FontAwesome5';
import { FAB, Button } from 'react-native-paper';

import LinearGradient from 'react-native-linear-gradient';

import { noCard } from "../../constants/images";


const { width, height } = Dimensions.get('window');
import theme from '../../constants/theme';
const { COLORS, FONTS, SIZES } = theme;

import { useIsFocused } from '@react-navigation/native';

export default function MyCards({ navigation }) {
    const isFocused = useIsFocused();
    const scrollX = new Animated.Value(0);
    const { token } = React.useContext(Auth);
    const [cards, setCards] = React.useState([]);
    const getCards = async () => {
        client.setHeader('authorization', `Bearer ${token}`);
        const cardsData = await client.request(GET_CARDS);
        const cardsList = cardsData.getCards.res;
        setCards(cardsList);
    }
    React.useEffect(() => {
        if (isFocused) {
            getCards();
        }
    }, [isFocused])
    const deleteCard = async (arg) => {
        const deleteCard = await client.request(REMOVE_CARD, { cardId: arg });
        getCards();
    }
    return (
        <View style={{ flex: 1 }}>
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
                        {cards.length === 0 ? "Add " : "Saved "}Cards
                    </Text>
                </View>
                <View>
                    <FAB
                        style={{

                            fontWeight: 'bold',
                            elevation: 1,
                            backgroundColor: COLORS.secondary,
                        }}
                        small
                        color={COLORS.white}
                        icon="plus"
                        onPress={() => navigation.navigate('AddCard')}
                    />
                </View>
            </View>
            {cards.length !==0 && <ScrollView>

                {cards.map((card, index) => {
                    console.log(card);
                    return (
                        <View key={card.id} style={{ justifyContent: "center", alignItems: 'center' }}>
                            <LinearGradient
                                colors={["#0B8989", "#5AE0E0", "#0B8989"]}

                                style={{
                                    width: width - 100,
                                    height: 180,
                                    margin: 10,
                                    borderRadius: 15,
                                }}
                            >
                                <Image source={{ uri: "https://res.cloudinary.com/vevibes/image/upload/s--C45FDMP7--/v1626955223/App%20Assets/Asset_26_spyjqk.png" }}
                                    style={{
                                        width: width - 20,
                                        height: 180,
                                        resizeMode: 'cover',
                                        opacity: 0.1,
                                        position: 'absolute',
                                    }}
                                    resizeMode="cover"
                                />
                                <View style={{ padding: 15 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                                        <Fa name={`cc-${card.brand}`} style={{ textAlign: "left", ...FONTS.body1, color: COLORS.white }} />
                                        <Icon name="delete" style={{ textAlign: "left", ...FONTS.body2, color: COLORS.white }} onPress={() => deleteCard(card.id)} />
                                    </View>
                                    <Text style={{ ...FONTS.body3, color: COLORS.white }}>Card Number</Text>
                                    <Text style={{ ...FONTS.body2, color: COLORS.gray, fontWeight: 'bold' }}>{card.number.replace(/\w(?=\w{4})/g, "*")}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                        <View>
                                            <Text style={{ ...FONTS.body3, color: COLORS.white }}>Name</Text>
                                            <Text style={{ ...FONTS.body3, color: COLORS.gray, fontWeight: 'bold' }}>{card.name}</Text>
                                        </View>
                                        <View>
                                            <Text style={{ ...FONTS.body3, color: COLORS.white }}>Expiry</Text>
                                            <Text style={{ ...FONTS.body3, color: COLORS.gray, fontWeight: 'bold' }}>{card.expires}</Text>
                                        </View>
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>
                    )
                })}
            </ScrollView>}
            {cards.length === 0 && <View style={{justifyContent: 'center',alignItems: 'center',flex: 1}}>
                <Image source={{ uri: noCard }} style={{ width: width - 60, height: 400 }} resizeMode="contain" />
            </View>}
        </View>
    )
}
