import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { IconButton } from '../../components/buttons';
import colors from '../../styles/colors';

interface SearchFieldProps {
  onCancel: () => void;
}

export const SearchField = ({ onCancel }: SearchFieldProps) => {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.searchLine}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor={colors.text}
        value={search}
        onChangeText={setSearch}
      />
      <IconButton
        color={colors.text}
        size={40}
        iconName="clear"
        onPress={onCancel}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchLine: {
    flexDirection: 'row',
    borderColor: colors.text,
    borderWidth: 5,
    borderRadius: 20,
    padding: 2,
    height: '80%',
    margin: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'red',
  },
  button: {
    alignSelf: 'center',
    right: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
