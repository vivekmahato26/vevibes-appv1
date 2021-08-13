import React, { useState } from 'react';

import { View, Text, Image, ScrollView, StyleSheet, TouchableWithoutFeedback } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {ALGOLIA_APP, ALGOLIA_SEARCH_KEY} from "@env";

import algoliasearch from "algoliasearch";

import { Searchbar, Button } from "react-native-paper";

import theme from "../../constants/theme";

import { filter } from "../../constants/images";

import Search from "../../components/search";

const { FONTS, COLORS } = theme;

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Modalize } from "react-native-modalize";
import Collapsible from "react-native-collapsible";
import * as Animatable from 'react-native-animatable';

import { useIsFocused } from "@react-navigation/native";

export default function SearchScreen({ navigation, route }) {
    const productsArr = route.params.productsArr;
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchResult, setSearchResult] = React.useState([]);
    const filterModal = React.createRef();
    const [filterSorting, setFilterSorting] = useState(false);
    const [filterBrands, setFilterBrands] = useState(true);
    const [filterCategory, setFilterCategory] = useState(true);
    const [filterTags, setFilterTags] = useState(true);
    const [products, setProducts] = useState(productsArr);
    const isFocused = useIsFocused();
    const [history, setHistory] = useState([]);

    const sortByPrice = (order) => {
        const temp = _.orderBy(products, ['price'], [order]);
        setProducts(temp);
    }

    const filterProducts = (key, filter) => {
        const temp = _.filter(productsArr, function (p) {
            return p[key] === filter;
        })
        setProducts(temp);
    }
    const onChangeSearch = (query) => {
        setSearchQuery(query);
        const client = algoliasearch(ALGOLIA_APP, ALGOLIA_SEARCH_KEY);
        const index = client.initIndex('Products');
        // only query string
        index.search(query).then(({ hits }) => {
            setSearchResult(hits);
        });
    };
    React.useEffect(async () => {
        var temp = await AsyncStorage.getItem('searches');
        setHistory(JSON.parse(temp));
    }, [isFocused])
    return (
        <>
            <View style={{ flex: 1, margin: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="chevron-left" style={{ ...FONTS.h2, color: COLORS.primary }} onPress={() => navigation.goBack()} />
                    <Searchbar
                        placeholder="Search For Products"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        style={{
                            width: '80%', elevation: 0, marginLeft: 5, borderRadius: 5, marginRight: 5,
                            borderColor: COLORS.lightGray,
                            borderWidth: 1,
                            elevation: 1
                        }}
                        inputStyle={{ fontWeight: 'bold', fontSize: 13, paddingLeft: 0 }}
                    />
                    <TouchableWithoutFeedback onPress={() => filterModal.current.open()}>
                        <Image source={{ uri: filter }} style={{ width: 30, height: 30 }} resizeMode="contain" />
                    </TouchableWithoutFeedback>
                </View>
                <Search results={searchResult} navigation={navigation} query={searchQuery} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    <Text style={{ ...FONTS.h3, color: COLORS.primary, fontWeight: 'bold' }}>Recent Searches</Text>
                    <Text style={{ ...FONTS.h3, color: COLORS.secondary, fontWeight: 'bold' }}>Clear All</Text>
                </View>
                {history && history.map((h) => {
                    return (
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                            <Text style={{ ...FONTS.body3, color: COLORS.primary, fontWeight: 'bold' }} onPress={() => onChangeSearch(h)}>{h}</Text>
                            <Icon name="history" style={{ ...FONTS.body3, color: COLORS.secondary, fontWeight: 'bold' }}/>
                        </View>
                    )
                })}
            </View>
            <Modalize ref={filterModal} adjustToContentHeight={true} onClose={() => { setFilterTags(true); setFilterBrands(true); setFilterCategory(true); }}>
                <View style={{ flex: 1, margin: 10 }}>
                    <ScrollView>
                        <View>
                            <Text onPress={() => setFilterSorting(!filterSorting)} style={{ ...FONTS.h3, color: COLORS.primary, fontWeight: 'bold', elevation: 2, backgroundColor: COLORS.lightGray, borderRadius: 5, marginBottom: 10, padding: 10 }}>Sorting</Text>
                            <Collapsible collapsed={filterSorting}>
                                <Text style={[styles.category, { textAlign: "center" }]} onPress={() => sortByPrice("desc")}>Prices: High to Low</Text>
                                <Text style={[styles.category, { textAlign: "center" }]} onPress={() => sortByPrice("asc")}>Prices: Low to High</Text>
                                <Text style={[styles.category, { textAlign: "center" }]} onPress={() => filterProducts("featured", true)}>Featured</Text>
                                <Text style={[styles.category, { textAlign: "center" }]}>Newest Arrivals</Text>
                            </Collapsible>
                        </View>
                        <View>
                            <Text onPress={() => setFilterBrands(!filterBrands)} style={{ ...FONTS.h3, color: COLORS.primary, fontWeight: 'bold', elevation: 2, backgroundColor: COLORS.lightGray, borderRadius: 5, marginBottom: 10, padding: 10 }}>Brands</Text>
                            <Collapsible collapsed={filterBrands}>
                                <Animatable.View duration={1000}
                                    easing="ease" style={{ flexDirection: 'row', alignItems: 'center', flexWrap: "wrap" }}>
                                    <Text style={[styles.category]} onPress={() => filterProducts("brand", "")}>Bakery &amp; Cakes</Text>
                                    <Text style={[styles.category]} onPress={() => filterProducts("brand", "")}>Cheese </Text>
                                    <Text style={[styles.category]} onPress={() => filterProducts("brand", "")}>Cupboard Staples </Text>
                                    <Text style={[styles.category]} onPress={() => filterProducts("brand", "")}>Dairy &amp; Egg Alternatives </Text>
                                    <Text style={[styles.category]} onPress={() => filterProducts("brand", "")}>Drinks </Text>
                                    <Text style={[styles.category]} onPress={() => filterProducts("brand", "")}>Pasta &amp; Noodles </Text>
                                    <Text style={[styles.category]} onPress={() => filterProducts("brand", "")}>Plant Based Alternatives</Text>
                                    <Text style={[styles.category]} onPress={() => filterProducts("brand", "")}>Ready To Cook</Text>
                                    <Text style={[styles.category]} onPress={() => filterProducts("brand", "")}>Sauces </Text>
                                    <Text style={[styles.category]} onPress={() => filterProducts("brand", "")}>Snacks </Text>
                                    <Text style={[styles.category]} onPress={() => filterProducts("brand", "")}>Yogurt &amp; Deserts </Text>
                                </Animatable.View>
                            </Collapsible>
                        </View>
                        <View>
                            <Text onPress={() => setFilterCategory(!filterCategory)} style={{ ...FONTS.h3, color: COLORS.primary, fontWeight: 'bold', elevation: 2, backgroundColor: COLORS.lightGray, borderRadius: 5, marginBottom: 10, padding: 10 }}>Category</Text>
                            <Collapsible collapsed={filterCategory}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: "wrap" }}>
                                    <Text style={[styles.category]} onPress={() => filterProducts("category", "Bakery & Cakes")}>Bakery &amp; Cakes</Text>
                                    <Text style={[styles.category]} onPress={() => filterProducts("category", "Cheese")}>Cheese </Text>
                                    <Text style={[styles.category]} onPress={() => filterProducts("category", "Cupboard Staples")}>Cupboard Staples </Text>
                                    <Text style={[styles.category]} onPress={() => filterProducts("category", "Diary & Egg Alternatives")}>Dairy &amp; Egg Alternatives </Text>
                                    <Text style={[styles.category]} onPress={() => filterProducts("category", "Drinks")}>Drinks </Text>
                                    <Text style={[styles.category]} onPress={() => filterProducts("category", "Pasta & Noodles")}>Pasta &amp; Noodles </Text>
                                    <Text style={[styles.category]} onPress={() => filterProducts("category", "Plant Based Alternatives")}>Plant Based Alternatives</Text>
                                    <Text style={[styles.category]} onPress={() => filterProducts("category", "Ready To Cook")}>Ready To Cook</Text>
                                    <Text style={[styles.category]} onPress={() => filterProducts("category", "Sauces")}>Sauces </Text>
                                    <Text style={[styles.category]} onPress={() => filterProducts("category", "Snacks")}>Snacks </Text>
                                    <Text style={[styles.category]} onPress={() => filterProducts("category", "Yogurt & Deserts")}>Yogurt &amp; Deserts </Text>
                                </View>
                            </Collapsible>
                        </View>
                        <View>
                            <Text onPress={() => setFilterTags(!filterTags)} style={{ ...FONTS.h3, color: COLORS.primary, fontWeight: 'bold', elevation: 2, backgroundColor: COLORS.lightGray, borderRadius: 5, marginBottom: 10, padding: 10 }}>Popular Tags</Text>
                            <Collapsible collapsed={filterTags}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: "wrap" }}>
                                    <Text style={[styles.category]}>Bakery &amp; Cakes</Text>
                                    <Text style={[styles.category]}>Cheese </Text>
                                    <Text style={[styles.category]}>Cupboard Staples </Text>
                                    <Text style={[styles.category]}>Dairy &amp; Egg Alternatives </Text>
                                    <Text style={[styles.category]}>Drinks </Text>
                                    <Text style={[styles.category]}>Pasta &amp; Noodles </Text>
                                    <Text style={[styles.category]}>Plant Based Alternatives</Text>
                                    <Text style={[styles.category]}>Ready To Cook</Text>
                                    <Text style={[styles.category]}>Sauces </Text>
                                    <Text style={[styles.category]}>Snacks </Text>
                                    <Text style={[styles.category]}>Yogurt &amp; Deserts </Text>
                                </View>
                            </Collapsible>
                        </View>
                    </ScrollView>
                </View>
                <Button mode="contained" onPress={() => { filterModal.current.close(); setFilterTags(true); setFilterBrands(true); setFilterCategory(true); }} style={{ backgroundColor: COLORS.secondary }}>
                    <Text>View Results</Text>
                </Button>
            </Modalize>
        </>
    )
}

const styles = StyleSheet.create({
    category: {
        margin: 5,
        borderRadius: 5,
        backgroundColor: "#f2f2f2",
        padding: 5,
        ...FONTS.body4,
        color: "black",
    }
});
