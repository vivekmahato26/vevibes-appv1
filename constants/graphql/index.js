import { GraphQLClient, gql } from 'graphql-request';

const endpoint = `https://vevibes.herokuapp.com/`;

export const client = new GraphQLClient(endpoint);

export const GET_PRODUCTS = gql`
    {
      getProducts {
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
  `;
export const GET_FEATURED_PRODUCTS = gql`
    {
      getFeaturedProducts {
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
  `;

export const ADD_ADDRESS = gql`
    mutation addAddress($input: AddressInput) { 
      addAddress(input: $input) {
        id
      }
    }

`;

export const LOGIN = gql`
    
     query signIn($input: SigninInput!) {
        signIn(input: $input) {
          userId
          email
          token
        }
      }
    
`;

export const SIGNUP = gql`
    mutation signUp($input: SignupInput) {
      signUp(SignupInput: $input)
    }
`;

export const ADD_TO_WISHLIST = gql`
    mutation addtoWislist($productId: String!){
      addToWishlist(productId: $productId)
    }
`
export const REMOVE_FROM_WISHLIST = gql`
    mutation removeFromWislist($productId: String!){
      removeFromWishlist(productId: $productId)
    }
`

export const GET_WISHLIST = gql`
    {
      getWishlist{
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
`;

export const DELETE_ADDRESS = gql`
  mutation deleteAddress($addressId: String!) {
    deleteAddress(addressId: $addressId)
  }
`

export const GET_USER = gql`
  {
    getUser{
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
  }

`

export const CHANGE_PASSWORD = gql`
  mutation changePassword($password: String!) {
    changePassword(password: $password)
  }
`;

export const REGISTER = gql`
  mutation signUp($input: SignupInput!) {
    signUp(input: $input)
  }
`;

export const UPDATE_ADDRESS = gql`
  mutation updateAddress($input: AddressInput,$addressId: String!) { 
    updateAddress(input: $input,addressId: $addressId) 
    }
`;

export const GET_CARDS = gql`
  {
    getCards{
      brand
      id
      name
      number
      expires
      fingerprint
    }
  }
`;

export const ADD_CARD = gql`
  mutation addCard($input: CardInput){
    addCard(input: $input){
      brand
      id
      name
      number
      expires
    }
  }
`;

export const REMOVE_CARD = gql`
  mutation deleteCard($cardId: String!){
    deleteCard(cardId: $cardId)
  }
`

export const CHECKOUT = gql `
  mutation checkout($amount: Float!,$currency: String!,$description: String!,$paymentMethod: [String!]){
    checkout(amount: $amount,currency: $currency,description:$description,paymentMethod:$paymentMethod)
  }
`;