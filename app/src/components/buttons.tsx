import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../styles/colors';
import { Text } from 'react-native-gesture-handler';

export const BackButton = (props: any) => {
  const navigation = useNavigation();
  
  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Icon name="arrow-back" size={24} color={colors.text}/>
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
