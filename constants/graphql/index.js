import {GraphQLClient, gql} from 'graphql-request';

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
    offerPrice
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
    offerPrice
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

export const ADD_ADDRESS =  gql`
    mutation addAddress($input: AddressInput) { 
      addAddress(input: $input) {
        id
      }
    }

`;