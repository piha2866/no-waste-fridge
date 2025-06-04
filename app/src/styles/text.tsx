import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import colors from './colors';

const text: {
  [key: string]: TextStyle | ViewStyle | ImageStyle;
} = {
  title: {
    fontSize: 32,
    color: colors.text,
    fontWeight: 'bold',
  },
  standard: {
    fontSize: 24,
    color: colors.text,
  },
};

export default text;
