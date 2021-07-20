/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useCallback } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthContext from "./constants/context/auth";
import { shopReducer, ADD_PRODUCT, REMOVE_PRODUCT } from "./constants/cart";

import Home from './screens/home/home';
import HomeGrey from './screens/home/homeGrey';
import Slider from './components/slider';
import Welcome from './screens/welcome';
import Login from './screens/user/login';
import Register from './screens/user/register';
import Mobile from './screens/user/mobile';
import Verify from './screens/user/verify';
import ChangePassword from './screens/user/changePassword';
import ForgotPassword from './screens/user/forgotPassword';
import ProductHome from './screens/products/productHome';
import ProductList from './screens/products/productList';
import ProductDetails from './screens/products/productDetails';
import Cart from './screens/cart/cart';
import Coupon from './screens/cart/coupon';
import Address from './screens/user/deliveryAddress';
import AddAddress from './screens/user/addAddress';
import MyAddress from "./screens/user/myAddress";
import Coupons from "./screens/user/coupons";
import Checkout from './screens/cart/checkout';
import Payment from './screens/cart/payment';
import AddCard from './screens/cart/addCard';
import Sucess from './screens/cart/sucess';
import Failure from './screens/cart/failure';
import DrawerComponent from './components/drawer';
import EditProfile from './screens/user/editProfile';
import Orders from './screens/products/orders';
import OrderDetails from './screens/products/orderDetails';
import Support from "./screens/support";
import Settings from "./screens/settings";
import Feedback from "./screens/feedback";
import Wishlist from "./screens/user/wishlist";


import { client, GET_USER } from "./constants/graphql";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
import { onboarding1, onboarding2, onboarding3 } from './constants/images';

import { Dimensions } from 'react-native';
import CartContext from './constants/context/cartContext';
import UserContext from './constants/context/userContext';

const { width, height } = Dimensions.get('window');

const onBoardings = {
  items: [
    {
      title: ['We offer fresh and high', ' quality vegan products'],
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
      img: onboarding1,
    },
    {
      title: [
        'We delivery directly from',
        ' our warehouse,',
        ' straight to your front door',
      ],
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
      img: onboarding2,
    },
    {
      title: ['100% satisfaction', ' gauranteed'],
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
      img: onboarding3,
    },
  ],
  type: 'onboarding',
};

const DrawerRoutes = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerComponent {...props} />}
      drawerWidth={width}
      drawerStyle={{
        width: width,
      }}
      initialRouteName="Home" >
      <Drawer.Screen name="ProductHome" component={ProductHome} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      <Drawer.Screen name="Orders" component={Orders} />
      <Drawer.Screen name="OrderDetails" component={OrderDetails} />
      <Drawer.Screen name="Support" component={Support} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="MyAddresses" component={MyAddress} />
      <Drawer.Screen name="Coupons" component={Coupons} />
      <Drawer.Screen name="Wishlist" component={Wishlist} />
    </Drawer.Navigator>
  );
};


const App = () => {
  const MyTheme = {
    dark: false,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: '#ffffff',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };

  const [user, setUser] = React.useState();
  const [authenticated, setAuthenticated] = React.useState(false);

  const [location, setLocation] = React.useState();
  const [cart, dispatch] = React.useReducer(shopReducer, [])
  const [token, setToken] = React.useState("");

  const getUserData = async () => {
    const token = await AsyncStorage.getItem('token');
    client.setHeader('authorization', `Bearer ${token}`);
    const userData = await client.request(GET_USER);
    setUser(userData.getUser);
  }

  const logoutHandler = async () => {
    try {
      setAuthenticated(false);
      await AsyncStorage.setItem('token', null);
      await AsyncStorage.setItem('userId', null);
      await AsyncStorage.setItem('email', null);
      return;
    } catch (e) {
      return e;
    }
  }

  React.useEffect(async () => {
    const city = await AsyncStorage.getItem('location');
    setLocation(city);
  }, [])

  const addProductToCart = product => {
    // setCart(updatedCart);
    dispatch({ type: ADD_PRODUCT, product: product });
  };

  const removeProductFromCart = productId => {
    // setCart(updatedCart);
    dispatch({ type: REMOVE_PRODUCT, productId: productId });
  };

  return (
    <AuthContext.Provider value={{
      authenticated: authenticated,
      logout: logoutHandler,
      setLocation,
      location,
      token,
      setAuthenticated,
      setToken,
      getUserData
    }}>
      <CartContext.Provider value={{
        cart,
        addProductToCart,
        removeProductFromCart,
      }} >
        <UserContext.Provider value={{ user, getUserData }}>
          <NavigationContainer theme={MyTheme}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="HomeGrey" component={HomeGrey} />
              <Stack.Screen name="OnBoarding">
                {props => (
                  <Slider
                    {...props}
                    items={onBoardings.items}
                    type={onBoardings.type}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Mobile" component={Mobile} />
              <Stack.Screen name="Verify" component={Verify} />
              <Stack.Screen name="ChangePassword" component={ChangePassword} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="ProductHome" component={DrawerRoutes} independent={true} />
              <Stack.Screen name="ProductList" component={ProductList} />
              <Stack.Screen name="ProductDetails" component={ProductDetails} />
              <Stack.Screen name="Cart" component={Cart} />
              <Stack.Screen name="Coupon" component={Coupon} />
              <Stack.Screen name="Address" component={Address} />
              <Stack.Screen name="AddAddress" component={AddAddress} />
              <Stack.Screen name="Checkout" component={Checkout} />
              <Stack.Screen name="Payment" component={Payment} />
              <Stack.Screen name="AddCard" component={AddCard} />
              <Stack.Screen name="Sucess" component={Sucess} />
              <Stack.Screen name="Failure" component={Failure} />
              <Stack.Screen name="Feedback" component={Feedback} />
            </Stack.Navigator>
          </NavigationContainer>
        </UserContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>

  );
};

export default App;
