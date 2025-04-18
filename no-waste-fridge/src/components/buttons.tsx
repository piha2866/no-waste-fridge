import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
import { Text } from 'react-native-gesture-handler';

export const BackButton = (props: any) => {
  const navigation = useNavigation();
  
  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>{'<'}</Text>
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
  text: {
    fontSize: 32,
    color: colors.text,
  },
});
