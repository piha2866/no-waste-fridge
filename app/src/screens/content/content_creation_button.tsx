import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackParamList } from '../../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<StackParamList>;

export default function ContentCreationButton(props: any): React.JSX.Element {
  const navigation = useNavigation<NavigationProp>();
  const handlePress = () => {
    navigation.navigate('Details');
  };
  return (
    <TouchableOpacity style={styles.overlayButton} onPress={handlePress}>
      <Icon name="add" size={32} color={colors.background} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  overlayButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.text,
    borderRadius: 20,
    padding: 20,
  },
  text: {
    fontSize: 32,
    color: colors.background,
  },
});
