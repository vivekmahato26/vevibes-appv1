import React, { useState } from 'react';

import { View, Text, ScrollView, Image } from 'react-native';

import { TextInput, Button } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { launchImageLibrary } from "react-native-image-picker";
import fs from "react-native-fs";

import axios from 'axios';

import theme from '../../constants/theme';
const { COLORS, FONTS } = theme;

export default function EditProfile({ navigation }) {
  const [avatar, setAvatar] = useState();

  const handlePicker = async () => {
    launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    }, (response) => {
      console.log(response);
      if (response) {
        const uri = response.assets[0].uri;
        const type = response.assets[0].type;
        const name = response.assets[0].fileName;
        const source = {
          uri,
          type,
          name,
        }
        console.log(source);
        fs.readFile(source.uri, (err, data) => {
          console.log(data);
        })
        return;
        const timeStamp = Date.now() / 1000;
        const uploadPreset = 'vevibes_app_profile';
        const cloudName = 'vevibes_app_profile';
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        let formData = new FormData();
        formData.append("api_key", '592267375743118');
        formData.append("file", source);
        formData.append("public_id", "sample_image");
        formData.append("timestamp", timeStamp);
        formData.append("upload_preset", uploadPreset);

        axios
          .post(url, formData)
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          })   //setPhoto(response);
      }
    });
  }
  return (
    <View style={{ margin: 10, flex: 1 }}>
      <ScrollView>
        <Icon name="close-thick" style={{ ...FONTS.h2, color: COLORS.primary }} onPress={() => navigation.goBack()} />
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: COLORS.lightGray,
            borderRadius: 20,
            marginTop: 30,
          }}>
          <Icon
            name="camera"
            style={{
              color: COLORS.gray,
              ...FONTS.body2,
              backgroundColor: COLORS.white,
              padding: 5,
              borderRadius: 50,
              borderColor: COLORS.lightGray,
              borderWidth: 0.5,
              position: 'absolute',
              bottom: -15,
              right: -15,
              paddingLeft: 9,
              paddingRight: 9
            }}
            onPress={handlePicker}
          />
        </View>
        <TextInput
          theme={{
            colors: {
              text: COLORS.primary
            }
          }}
          label="Name"
          mode="flat"
          style={{
            backgroundColor: COLORS.white,
            marginTop: 30,
            ...FONTS.body3,
            color: COLORS.primary,
            fontWeight: 'bold',
          }}
          outlineColor={COLORS.white}
          selectionColor={COLORS.gray}
          underlineColor={COLORS.lightGray}
        />
        <TextInput
          theme={{
            colors: {
              text: COLORS.primary
            }
          }}
          label="Email ID"
          mode="flat"
          style={{
            backgroundColor: COLORS.white,
            ...FONTS.body3,
            color: COLORS.primary,
            fontWeight: 'bold',
          }}
          outlineColor={COLORS.white}
          selectionColor={COLORS.gray}
          underlineColor={COLORS.lightGray}
        />
        <TextInput
          theme={{
            colors: {
              text: COLORS.primary
            }
          }}
          label="Phone Number"
          mode="flat"
          style={{
            backgroundColor: COLORS.white,
            ...FONTS.body3,
            color: COLORS.primary,
            fontWeight: 'bold',
          }}
          outlineColor={COLORS.white}
          selectionColor={COLORS.gray}
          underlineColor={COLORS.lightGray}
        />
      </ScrollView>
      <Button style={{ backgroundColor: COLORS.secondary, borderRadius: 10 }}>
        <Text style={{ color: COLORS.white, ...FONTS.body2, fontWeight: "bold" }}>Save</Text>
      </Button>
    </View>
  );
}
