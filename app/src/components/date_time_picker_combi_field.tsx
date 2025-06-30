import { StyleSheet, Text, TextInput, View } from 'react-native';

import text from '../styles/text';

interface DateTimePickerCombiFieldProps {
  name: string;
  value: Date;
  testId: string;
  id: string;
}

export default function DateTimePickerCombiField({
  name,
  value,
  id,
  testId,
}: DateTimePickerCombiFieldProps): React.JSX.Element {
  return (
    <View style={styles.dateView} id={id} testID={testId}>
      <Text style={styles.standard}>{name}</Text>
      <TextInput placeholder="DD.MM.YYYY" value={String(value)} />
    </View>
  );
}

const styles = StyleSheet.create({
  standard: { ...text.standard },
  dateView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexShrink: 1,
    flexGrow: 1,
  },
  detailsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
