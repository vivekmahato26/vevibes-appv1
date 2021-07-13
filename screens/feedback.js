import React, {useState} from 'react';

import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

import {feedbackIcons} from '../constants/images';
import theme from '../constants/theme';
const {COLORS, FONTS, SIZES} = theme;

export default function Feedback() {
  const [sad, setSad] = useState({
    rating: 1,
    url: feedbackIcons.sad.default,
  });
  const [meh, setMeh] = useState({
    rating: 2,
    url: feedbackIcons.meh.default,
  });
  const [smile, setSmile] = useState({
    rating: 3,
    url: feedbackIcons.smile.default,
  });
  const [laugh, setLaugh] = useState({
    rating: 4,
    url: feedbackIcons.laugh.default,
  });
  const [laughSquint, setLaughSquint] = useState({
    rating: 5,
    url: feedbackIcons.laughSquint.default,
  });

  return (
    <View style={{flex: 1, margin: 10}}>
      <ScrollView>
        <Icon
          name="chevron-left"
          style={{...FONTS.h2, color: COLORS.primary}}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            ...FONTS.body2,
            color: COLORS.primary,
            fontWeight: 'bold',
            marginTop: 40,
          }}>
          Send us your feedback!
        </Text>
        <Text style={{...FONTS.body3, color: COLORS.gray, marginTop: 20}}>
          Do you have a suggestion or found some bug?
        </Text>
        <Text style={{...FONTS.body3, color: COLORS.gray}}>
          Let us know in the field below.
        </Text>
        <Text style={{...FONTS.body2, color: COLORS.primary, marginTop: 20}}>
          How was your experience?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: 20,
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              let temp;
              if (sad.url === feedbackIcons.sad.default) {
                temp = feedbackIcons.sad.clicked;
              } else {
                temp = feedbackIcons.sad.default;
              }

              setSad(prev => {
                return {
                  rating: 1,
                  url: temp,
                };
              });
            }}>
            <Image
              source={{
                uri: sad.url,
              }}
              style={{width: width / 7, height: width / 7}}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              let temp;
              if (meh.url === feedbackIcons.meh.default) {
                temp = feedbackIcons.meh.clicked;
              } else {
                temp = feedbackIcons.meh.default;
              }

              setMeh(prev => {
                return {
                  rating: 1,
                  url: temp,
                };
              });
            }}>
            <Image
              source={{
                uri: meh.url,
              }}
              style={{width: width / 7, height: width / 7}}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              let temp;
              if (smile.url === feedbackIcons.smile.default) {
                temp = feedbackIcons.smile.clicked;
              } else {
                temp = feedbackIcons.smile.default;
              }

              setSmile(prev => {
                return {
                  rating: 1,
                  url: temp,
                };
              });
            }}>
            <Image
              source={{
                uri: smile.url,
              }}
              style={{width: width / 7, height: width / 7}}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              let temp;
              if (laugh.url === feedbackIcons.laugh.default) {
                temp = feedbackIcons.laugh.clicked;
              } else {
                temp = feedbackIcons.laugh.default;
              }

              setLaugh(prev => {
                return {
                  rating: 1,
                  url: temp,
                };
              });
            }}>
            <Image
              source={{
                uri: laugh.url,
              }}
              style={{width: width / 7, height: width / 7}}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              let temp;
              if (laughSquint.url === feedbackIcons.laughSquint.default) {
                temp = feedbackIcons.laughSquint.clicked;
              } else {
                temp = feedbackIcons.laughSquint.default;
              }

              setLaughSquint(prev => {
                return {
                  rating: 1,
                  url: temp,
                };
              });
            }}>
            <Image
              source={{
                uri: laughSquint.url,
              }}
              style={{width: width / 7, height: width / 7}}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
        </View>
        <TextInput
          theme={{
            roundness: 15,
            colors: {
              primary: COLORS.primary,
              secondary: "#f4f4f4",
            },
          }}
          mode="outlined"
          multiline={true}
          numberOfLines={6}
          placeholder="Describe your exprience here ..."
          style={{marginTop: 20, marginLeft: 15, marginRight: 15}}
        />
      </ScrollView>
      <Button mode="contained" style={{backgroundColor:COLORS.secondary,padding:5,borderRadius:15}}>
        <Text style={{...FONTS.body2, color:COLORS.white,fontWeight:"bold"}}>Submit</Text>
      </Button>
    </View>
  );
}
