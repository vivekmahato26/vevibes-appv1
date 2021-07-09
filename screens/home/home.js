import React from 'react';

import {ImageBackground, Image, Button} from 'react-native';

import {homeStyle} from '../../constants/styles';

import {homeBG, logo} from '../../constants/images';

const Home = ({navigation}) => {
  React. useEffect(() => {
    setTimeout(() => {
      nextScreen();
    },300)
  });
  const nextScreen = () => {
    navigation.navigate('HomeGrey');
  };
  return (
    <>
      <ImageBackground style={homeStyle.container} source={{uri: homeBG}}>
        <Image style={homeStyle.logo} source={{uri: logo}} />
      </ImageBackground>
    </>
  );
};

export default Home;
