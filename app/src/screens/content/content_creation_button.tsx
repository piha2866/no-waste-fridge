import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useTypedNavigation } from '../../navigation/AppNavigator';
import colors from '../../styles/colors';

export default function ContentCreationButton(): React.JSX.Element {
  const navigation = useTypedNavigation();
  const handlePress = (): void => {
    navigation.navigate('Details', {});
  };
  return (
    <TouchableOpacity
      style={styles.overlayButton}
      onPress={handlePress}
      id="add-content-button"
      testID="add-content-button"
    >
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
});
