import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import colors from '../../styles/colors';
import text from '../../styles/text';
import { SortMode } from '../../types/types';

type Option = {
  text: SortMode;
  onPress: () => void;
};

interface OptionSelectionProps {
  title: string;
  options: Option[];
  style?: StyleProp<ViewStyle>;
  sortMode: string;
  setSortMode: (e: SortMode) => void;
}

export const OptionSelection = ({
  title,
  options,
  style,
  sortMode,
  setSortMode,
}: OptionSelectionProps) => {
  return (
    <View style={style}>
      <Text style={styles.title}>{title}</Text>
      {options.map(({ text, onPress }: Option, index: number) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setSortMode(text);
            onPress();
          }}
        >
          <Text style={sortMode === text ? styles.selectedText : styles.text}>{text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...text.standard,
    color: colors.background,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  text: {
    ...text.standard,
    color: colors.background,
    paddingVertical: 5,
  },
  selectedText: {
    ...text.standard,
    color: colors.background,
    textDecorationLine: 'underline',
    paddingVertical: 5,
  },
});
