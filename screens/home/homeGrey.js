import React from 'react';

import {ImageBackground, Image, Button} from 'react-native';

import {homeStyle} from '../../constants/styles';

import {homeBG_Grey, logo} from '../../constants/images';

const HomeGrey = ({navigation}) => {
  React. useEffect(() => {
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
