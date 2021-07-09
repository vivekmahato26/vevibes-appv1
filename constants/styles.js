import colors from './colors';

import {StyleSheet} from 'react-native';

export const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: 150,
  },
});
