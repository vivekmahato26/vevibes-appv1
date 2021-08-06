import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  black: '#1E1F20',
  white: '#FFFFFF',
  gray: '#6A6A6A',
  blue: '#0682FE',
  primary: '#662d91',
  secondary: '#65c8ca',
  lightGray: '#c8c8c8',
  paypal: '#2997D8',
  apple: '#A3AAAE',
  amazon: '#FF9900',
  secondaryDark: '#58afaf',
  error: "#e84118",
  green: "#63A004"
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  bold: 900,

  // font sizes
  h1: 35,
  h2: 30,
  h3: 16,
  h4: 14,
  h5: 40,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 18,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  h1: { fontFamily: 'SegoeUIBold', fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: 'SegoeUIBold', fontSize: SIZES.h2, lineHeight: 36 },
  h3: { fontFamily: 'SegoeUIBold', fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: 'SegoeUIBold', fontSize: SIZES.h4, lineHeight: 22 },
  h5: { fontFamily: 'SegoeUIBold', fontSize: SIZES.h5, lineHeight: 40 },
  body1: { fontFamily: 'SegoeUI', fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontFamily: 'SegoeUI', fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontFamily: 'SegoeUI', fontSize: SIZES.body3, lineHeight: 22 },
  body4: { fontFamily: 'SegoeUI', fontSize: SIZES.body4, lineHeight: 22 },
  body5: { fontFamily: 'SegoeUI', fontSize: SIZES.body5, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
