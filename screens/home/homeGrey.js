import React from 'react';

import {ImageBackground, Image, Button} from 'react-native';

import {homeStyle} from '../../constants/styles';

import {homeBG_Grey, logo} from '../../constants/images';

import Auth from '../../constants/context/auth';

const HomeGrey = ({navigation}) => {

  const { location } = React.useContext(Auth);
  React. useEffect(() => {
    if (location !== undefined && location !== "" && location !== null) {
      navigation.navigate("ProductHome");
      return;
    }
    setTimeout(() => {
      nextScreen();
    },300)
  });
  const nextScreen = () => {
    navigation.navigate('OnBoarding');
  };
  return (
    <>
      <ImageBackground style={homeStyle.container} source={{uri: homeBG_Grey}}>
        <Image style={homeStyle.logo} source={{uri: logo}} />
      </ImageBackground>
    </>
  );
};

export default HomeGrey;
