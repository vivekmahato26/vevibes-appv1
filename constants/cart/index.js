export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

const addProductToCart = (product, cart) => {
  const updatedCart = cart;
  const updatedItemIndex = updatedCart.findIndex(
    item => item.product.id === product.id
  );

  if (updatedItemIndex < 0) {
    updatedCart.push({ product, quantity: 1 });
  } else {
    updatedCart[updatedItemIndex].quantity++ ;
  }
  return updatedCart;
};

const removeProductFromCart = (productId, cart) => {
  console.log('Removing product with id: ' + productId);
  const updatedCart = cart;
  const updatedItemIndex = updatedCart.findIndex(item => item.product.id === productId);

  updatedCart[updatedItemIndex].quantity-- ;
  if (updatedCart[updatedItemIndex].quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  }
  return updatedCart;
};

export const shopReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(action.product, state);
    case REMOVE_PRODUCT:
      return removeProductFromCart(action.productId, state);
    default:
      return state;
  }
};