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
        category
        cupon
        stock
        indregients
        weightKG
        img
        nutritionalValues{
          energy
          fat
          saturatedFat
          protine
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
    category
    cupon
    stock
    indregients
    weightKG
    img
    nutritionalValues{
      energy
      fat
      saturatedFat
      protine
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
        cupon
        stock
        indregients
        weightKG
        img
        nutritionalValues{
          energy
          fat
          saturatedFat
          protine
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