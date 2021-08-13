export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const PREVIOUS_CART = 'PREVIOUS_CART';
export const EMPTY_CART = 'EMPTY_CART';

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
  const updatedCart = cart;
  const updatedItemIndex = updatedCart.findIndex(item => item.product.id === productId);
  updatedCart[updatedItemIndex].quantity-- ;
  if (updatedCart[updatedItemIndex].quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  }
  return updatedCart;
};

const getPreviousCart = (previousCart,cart) => {
  if(previousCart === undefined || previousCart === null) {
    return [];
  }
  return JSON.parse(previousCart);
}

const emptyCart = () => {
  return [];
}

export const shopReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(action.product, state);
    case REMOVE_PRODUCT:
      return removeProductFromCart(action.productId, state);
    case PREVIOUS_CART: return getPreviousCart(action.previousCart,state);
    case EMPTY_CART : return emptyCart();
    default:
      return state;
  }
};