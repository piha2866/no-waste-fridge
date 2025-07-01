import RNDateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import text from '../styles/text';

interface DateTimePickerCombiFieldProps {
  name: string;
  value: string;
  testId?: string;
  id?: string;
}

function formatDateToDDMMYYYY(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export default function DateTimePickerCombiField({
  name,
  value,
  id,
  testId,
}: DateTimePickerCombiFieldProps): React.JSX.Element {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(value || new Date()));

  const handleChange = (_event: any, selectedDate?: Date): void => {
    if (selectedDate) {
      setDate(selectedDate);
      setShow(false);
    }
  };
  return (
    <View style={styles.dateView} id={id} testID={testId}>
      <TouchableOpacity onPress={() => setShow(true)}>
        <Text style={styles.standard}>{name}</Text>
        <Text>{formatDateToDDMMYYYY(date)}</Text>
      </TouchableOpacity>
      {show && (
        <RNDateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={handleChange}
          testID="datetimepicker_spinner"
        />
      )}
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
});
