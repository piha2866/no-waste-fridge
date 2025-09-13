import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../styles/colors';

interface IconButtonProps {
  iconName: string;
  onPress: (event: GestureResponderEvent) => void;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export const IconButton = ({
  iconName,
  onPress,
  size = 32,
  color = colors.text,
  style = styles.button,
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
      id={`${iconName}-button`}
      testID={`${iconName}-button`}
    >
      <Icon name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
});
