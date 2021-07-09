import * as React from 'react';
import {View,StyleSheet} from 'react-native';
import {Button, Menu, Divider, Provider, Searchbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import theme from '../constants/theme';
const {COLORS, FONTS} = theme;

const ProductHeader2 = () => {
  const [visible, setVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <View
        style={{
          paddingTop: 20,
          flexDirection: 'row',
          padding: 5,
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'white',
                flexDirection: 'row',
                flex: 1,
                borderRadius: 5,
              }}>
              <Button
                onPress={openMenu}
                style={{marginHorizontal: 0}}
                compact={true}>
                Categories
              </Button>
              <Icon
                onPress={openMenu}
                name="chevron-down"
                style={{...FONTS.body2, color: COLORS.primary}}
              />
            </View>
          }>
          <Menu.Item style={styles.top} onPress={() => {}} title="Food &amp; Drink" />
          <Menu.Item style={styles.top} onPress={() => {}} title="Household" />
          <Menu.Item style={styles.top} onPress={() => {}} title="Pets" />
          <Menu.Item style={styles.top} onPress={() => {}} title="Beauty" />
          <Menu.Item style={styles.top} onPress={() => {}} title="Dietary Options" />
          <Menu.Item style={styles.top} onPress={() => {}} title="Brands" />
        </Menu>
        <Searchbar
          placeholder="Search For Products"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{width: '60%', elevation: 0, marginLeft: 5}}
          inputStyle={{fontWeight: 'bold', fontSize: 13, paddingLeft: 0}}
        />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  top: {
    zIndex: 10
  }
})

export default ProductHeader2;
