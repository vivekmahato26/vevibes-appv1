import { SHIPENGINE_API_KEY, SHIPENGINE_PROD_KEY } from "@env";

import Axios from "axios";

const shipEngineAxios = Axios.create({
    headers: {
        post: {
            "API-Key": SHIPENGINE_API_KEY,
            "Content-Type": "application/json",

        },
        get: {
            "API-Key": SHIPENGINE_API_KEY,
            "Content-Type": "application/json",

        }
    }
});

const originAddr = {
    name: "Vevibes",
    company_name: "Vevibes Ltd.",
    phone: "+44 7535 675120",
    address_line1: "197 Cooksey Lane",
    city_locality: "Birmingham",
    state_province: "LZ",
    postal_code: "B449QX",
    country_code: "GB",
    address_residential_indicator: "no"
};

const prodCarrierId = "se-723522";
const sandboxCarrierId = "se-717209";

export const getRateEstimates = async (shipTo, weight) => {
    const url = "https://api.shipengine.com/v1/rates/estimate";
    const variables = {
        "carrier_ids": [
            sandboxCarrierId
        ],
        // "from_country_code": originAddr.country_code,
        // "from_postal_code": originAddr.postal_code,
        // "from_city_locality": originAddr.address_line1,
        // "from_state_province": originAddr.state_province,
        // "to_country_code": shipTo.countryCode,
        // "to_postal_code": shipTo.pin,
        // "to_city_locality": shipTo.line1,
        // "to_state_province": shipTo.state,
        "from_country_code": "US", "from_postal_code": "78756", "to_country_code": "US", "to_postal_code": "95128", "to_city_locality": "San Jose", "to_state_province": "CA",
        "weight": {
            "value": parseFloat(weight),
            "unit": "kilogram"
        }
    }
    const requestBody = JSON.stringify(variables);
    const rateEstimate = await shipEngineAxios.post(url, requestBody);
    return rateEstimate.data;
}

export const createShipment = async (shipTo,weight,serviceCode) => {
    const url = "https://api.shipengine.com/v1/shipments";
    const variables = {
        // "shipments": [
        //     {
        //         "service_code": serviceCode,
        //         "ship_from": {
        //             "name": originAddr.name,
        //             "company_name": originAddr.company_name,
        //             "address_line1": originAddr.address_line1,
        //             "city_locality": originAddr.city_locality,
        //             "state_province": originAddr.state_province,
        //             "postal_code": originAddr.postal_code,
        //             "country_code": originAddr.country_code,
        //             "phone": originAddr.phone,
        //         },
        //         "ship_to": {
        //             "name": shipTo.name,
        //             "address_line1": shipTo.line1,
        //             "city_locality": shipTo.city,
        //             "state_province": shipTo.state,
        //             "postal_code": shipTo.pin,
        //             "country_code": shipTo.countryCode
        //         },
        //         "packages": [
        //             {
        //                 "weight": {
        //                     "value": weight,
        //                     "unit": "kilogram"
        //                 }
        //             }
        //         ]
        //     }
        // ]
        "shipments":[{"validate_address":"no_validation","service_code":serviceCode,"ship_to":{"name":"Amanda Miller","phone":"555-555-5555","address_line1":"525 S Winchester Blvd","city_locality":"San Jose","state_province":"CA","postal_code":"95128","country_code":"US","address_residential_indicator":"yes"},"ship_from":{"company_name":"Example Corp.","name":"John Doe","phone":"111-111-1111","address_line1":"4009 Marathon Blvd","address_line2":"Suite 300","city_locality":"Austin","state_province":"TX","postal_code":"78756","country_code":"US","address_residential_indicator":"no"},"confirmation":"none","advanced_options":{},"insurance_provider":"none","tags":[],"packages":[{"weight":{"value":1,"unit":"ounce"}}]}]
    }
    const requestBody = JSON.stringify(variables);
    const shipment = await shipEngineAxios.post(url, requestBody);
    return shipment.data;
}

export const createLable = async(shipmentId) => {
    const url = `https://api.shipengine.com/v1/labels/shipment/${shipmentId}`;
    const lable = await shipEngineAxios.post(url);
    return lable.data;
}

export const trackPackage = async(trackingNumber) => {
    const url = `https://api.shipengine.com/v1/tracking?carrier_code=ups&tracking_number=${trackingNumber}`;
    const trackingData = await shipEngineAxios.get(url);
    return trackingData.data;
}