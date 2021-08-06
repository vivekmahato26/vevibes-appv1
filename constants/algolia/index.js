import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ALGOLIA_APP, ALGOLIA_SEARCH_KEY } from "@env";

const apiUrl = "https://insights.algolia.io/1/events";

const algoliaAxios = Axios.create({
    headers: {
        post: {
            "X-Algolia-Application-Id": ALGOLIA_APP,
            "X-Algolia-API-Key": ALGOLIA_SEARCH_KEY,
        }
    }
})


export const add_product_to_cart_event = async (product) => {
    const userId = await AsyncStorage.getItem('userId');
    const variables = {
        events: [
            {
                eventType: "click",
                eventName: "Add to cart",
                index: "Products",
                userToken: userId,
                timestamp: Date.now(),
                objectIDs: [product.id]
            }
        ]

    }
    await algoliaAxios.post(apiUrl, variables)
}
export const remove_product_to_cart_event = async (productId) => {
    const userId = await AsyncStorage.getItem('userId');
    const variables = {
        events: [
            {
                eventType: "click",
                eventName: "Remove from cart",
                index: "Products",
                userToken: userId,
                timestamp: Date.now(),
                objectIDs: [productId]
            }
        ]

    }
    await algoliaAxios.post(apiUrl, variables)
}

export const add_product_to_wishlist_event = async (product) => {
    const userId = await AsyncStorage.getItem('userId');
    const variables = {
        events: [
            {
                eventType: "click",
                eventName: "Add to wishlist",
                index: "Products",
                userToken: userId,
                timestamp: Date.now(),
                objectIDs: [product.id]
            }
        ]

    }
    await algoliaAxios.post(apiUrl, variables)
}
export const remove_product_to_wishlist_event = async (product) => {
    const userId = await AsyncStorage.getItem('userId');
    const variables = {
        events: [
            {
                eventType: "click",
                eventName: "Remove from wishlist",
                index: "Products",
                userToken: userId,
                timestamp: Date.now(),
                objectIDs: [product.id]
            }
        ]

    }
    await algoliaAxios.post(apiUrl, variables)
}
export const product_view_event = async (product) => {
    const userId = await AsyncStorage.getItem('userId');
    const variables = {
        events: [
            {
                eventType: "View",
                eventName: "Product View",
                index: "Products",
                userToken: userId,
                timestamp: Date.now(),
                objectIDs: [product.id]
            }
        ]

    }
    await algoliaAxios.post(apiUrl, variables)
}
export const product_purchase = async (product) => {
    const userId = await AsyncStorage.getItem('userId');
    const variables = {
        events: [
            {
                eventType: "Conversion",
                eventName: "Product Purchase",
                index: "Products",
                userToken: userId,
                timestamp: Date.now(),
                objectIDs: [product.id]
            }
        ]

    }
    await algoliaAxios.post(apiUrl, variables)
}