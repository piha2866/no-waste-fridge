import RNDateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { formatDateToDDMMYYYY } from '../../utils/date_formatting';
import text from '../styles/text';

interface DateTimePickerCombiFieldProps {
  name: string;
  value: string;
  testId: string;
  id: string;
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
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  return (
    <View style={styles.dateView} id={id} testID={`${testId}_button`}>
      <TouchableOpacity onPress={() => setShow(true)}>
        <Text style={styles.standard}>{name}</Text>
        <Text testID={`${testId}_output`}>{formatDateToDDMMYYYY(date)}</Text>
      </TouchableOpacity>
      {show && (
        <RNDateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={handleChange}
          testID={`${testId}_spinner`}
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
