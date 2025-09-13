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
    borderWidth: 2,
    borderRadius: 20,
    paddingLeft: 15,
    height: '80%',
    margin: 10,
  },
  input: {
    flex: 1,
    fontSize: 24,
    color: colors.text,
  },
  button: {
    alignSelf: 'center',
    right: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
