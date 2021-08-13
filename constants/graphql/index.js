import { GraphQLClient, gql } from 'graphql-request';

const endpoint = `https://vevibes.herokuapp.com/`;

export const client = new GraphQLClient(endpoint);

export const GET_PRODUCTS = gql`
    {
      getProducts {
        __typename ... on  Products{
        res {
          id
    name
    description
    price
    featured
    salePrice
    tags
    coupon
    stock
    ingredients
    category
    weightKG
    img
    nutritionalValues{
      energy
      fat
      saturatedFat
      protien
      carbohydrates
      sugar
      fiber
      salt
    }
    allergen
    disclaimer
        }
        }
        __typename ... on Error {
          message
        }
     }
    }
  `;
export const GET_FEATURED_PRODUCTS = gql`
    {
      getFeaturedProducts {
        __typename ... on  Products{
        res {
          id
    name
    description
    price
    featured
    salePrice
    tags
    coupon
    stock
    ingredients
    category
    weightKG
    img
    nutritionalValues{
      energy
      fat
      saturatedFat
      protien
      carbohydrates
      sugar
      fiber
      salt
    }
    allergen
    disclaimer
        }
        }
        __typename ... on Error {
          message
        }
       
  }
      
    }
  `;

export const ADD_ADDRESS = gql`
    mutation addAddress($input: AddressInput) { 
      addAddress(input: $input) {
        __typename ... on  Address{
        id
        }
        __typename ... on Error {
          message
        }
      }
    }

`;

export const LOGIN = gql`
    
     query signIn($input: SigninInput!) {
        signIn(input: $input) {
          __typename ... on  Auth{
            userId
          email
          token
        }
        __typename ... on Error {
          message
        }
        }
      }
    
`;

export const ADD_TO_WISHLIST = gql`
    mutation addtoWislist($productId: String!){
      addToWishlist(productId: $productId){
         __typename ... on  Sucess{
        res
        }
        __typename ... on Error {
          message
        }
      }
    }
`
export const REMOVE_FROM_WISHLIST = gql`
    mutation removeFromWislist($productId: String!){
      removeFromWishlist(productId: $productId){
         __typename ... on  Sucess{
        res
        }
        __typename ... on Error {
          message
        }
      }
    }
`

export const GET_WISHLIST = gql`
    {
      getWishlist{
        __typename ... on  Products{
        res {
          id
        name
        description
        price
        featured
        salePrice
        tags
        category
        coupon
        stock
        ingredients
        category
        weightKG
        img
        nutritionalValues{
          energy
          fat
          saturatedFat
          protien
          carbohydrates
          sugar
          fiber
          salt
        }
        allergen
        disclaimer
        }
        }
        __typename ... on Error {
          message
        }
        
      }
    }
`

export const CHECK_WHISHLISTED = gql`
    query checkWishlisted($productId:String!) {
      checkWishlisted(productId:$productId){
        __typename ... on  Sucess{
        res
        }
        __typename ... on Error {
          message
        }
      }
    }
`

export const GET_ADDRESS = gql`
  {
    getAddress{
      __typename ... on  Addresses{
        res {
          id
      name
      line1
      line2
      pin
      city
      state
      mobile
      type
      country
      countryCode
        }
        }
        __typename ... on Error {
          message
        }
     
    }
  }
`;

export const DELETE_ADDRESS = gql`
  mutation deleteAddress($addressId: String!) {
    deleteAddress(addressId: $addressId) {
      __typename ... on  Sucess{
        res
        }
        __typename ... on Error {
          message
        }
    }
  }
`

export const GET_USER = gql`
  {
    getUser{
      __typename ... on  User{
        
        id
      name
      email
      phone
      password
      address {
        id
        name
        line1
        line2
        pin
        city
        state
        country
        countryCode
        mobile
        type
      }
      wishlist {
        id
        name
        description
        price
        featured
        salePrice
        tags
        category
        coupon
        stock
        ingredients
        category
        weightKG
        img
        nutritionalValues{
          energy
          fat
          saturatedFat
          protien
          carbohydrates
          sugar
          fiber
          salt
        }
        allergen
        disclaimer
      }
    }
  
        __typename ... on Error {
          message
        }
  }}

`

export const CHANGE_PASSWORD = gql`
  mutation changePassword($password: String!) {
    changePassword(password: $password) {
       __typename ... on  Sucess{
        res
        }
        __typename ... on Error {
          message
        }
    }
  }
`;

export const REGISTER = gql`
  mutation signUp($input: SignupInput!) {
    signUp(input: $input) {
       __typename ... on  UserId{
        id
        }
        __typename ... on Error {
          message
        }
    }
  }
`;

export const UPDATE_ADDRESS = gql`
  mutation updateAddress($input: AddressInput,$addressId: String!) { 
    updateAddress(input: $input,addressId: $addressId)  {
       __typename ... on  Sucess{
        res
        }
        __typename ... on Error {
          message
        }
    }
    }
`;

export const GET_CARDS = gql`
  {
    getCards{
      __typename ... on  Cards{
        res {
          brand
      id
      name
      number
      expires
      fingerprint
        }
        }
        __typename ... on Error {
          message
        }
     
    }
  }
`;

export const ADD_CARD = gql`
  mutation addCard($input: CardInput){
    addCard(input: $input){
      __typename ... on Card {
        brand
      id
      name
      number
      expires
    }
    __typename ... on Error {
      message
    }
      
    }
  }
`;

export const REMOVE_CARD = gql`
  mutation deleteCard($cardId: String!){
    deleteCard(cardId: $cardId) {
      __typename ... on  Sucess{
        res
        }
        __typename ... on Error {
          message
        }
    }
  }
`

export const CHECKOUT = gql`
  mutation checkout($amount: Float!,$currency: String!,$description: String!,$paymentMethod: [String!]){
    checkout(amount: $amount,currency: $currency,description:$description,paymentMethod:$paymentMethod)
  }
`;

export const CREATE_ORDER = gql`
  mutation createOrder($input: OrderInput) {
    createOrder(input: $input) {
      id
    }
  }
`;

export const GET_ORDERS = gql`
  {
    getUserOrders {
      id
      status {
        updatedAt
        status
        statusCode
      }
      cartValue
      createdAt
      cart {
        product {
          id
        }
        quantity
      }
      lable {
        tracking_number
      }
    }
  }
`;

export const GET_ORDER_DETAILS = gql`

 query getOrder($id: String!) {
      getOrder(id: $id) {
        id
    address {
      id
      name
      line1
      line2
      pin
      city
      state
      mobile
      type
      country
      countryCode
    }
    user {
      name
      id
      name
      email
    }
    createdAt
    status {
      updatedAt
        status
        statusCode
    }
    payment
    paymentStatus
    shipment {
      shipment_id
      carrier_id
      service_code
      ship_date
      created_at
      modified_at
      shipment_status
    }
    lable {
      label_id
      status
      ship_date
      created_at
      shipment_cost{
        currency
        amount
      }
      tracking_number
      is_return_label
      voided
      trackable
      carrier_code
      tracking_status
      pdf
      png
      charge_event
    }
    cart {
      product {
        id
        name
        description
        price
        salePrice
        featured
      }
      quantity
    }
    coupon
    cartValue
      }
  }

`;