import * as React from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';

const MyComponent = () => (
  <ActivityIndicator animating={true} color={Colors.red800} size="large" />
);

export default MyComponent;