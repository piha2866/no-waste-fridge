import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import DateTimePickerCombiField, { formatDateToDDMMYYYY } from './date_time_picker_combi_field';

describe('formatDateToDDMMYYYY', () => {
  it('formats a regular date correctly', () => {
    const date = new Date('2025-06-26');
    expect(formatDateToDDMMYYYY(date)).toBe('26-06-2025');
  });

  it('pads single-digit day and month', () => {
    const date = new Date('2025-01-05');
    expect(formatDateToDDMMYYYY(date)).toBe('05-01-2025');
  });

  it('handles invalid date input gracefully', () => {
    expect(formatDateToDDMMYYYY(new Date('bug'))).toBe('');
  });
});

describe('DateTimePickerCombiField', () => {
  it('displays the formatted date correctly', () => {
    const { getByText } = render(
      <DateTimePickerCombiField
        name="Start Date"
        value="2025-06-26T00:00:00Z"
        testId="test"
        id="test"
      />,
    );
    expect(getByText('Start Date')).toBeTruthy();
    expect(getByText('26-06-2025')).toBeTruthy(); // Adjust depending on format
  });

  it('shows the picker when pressed', () => {
    const { getByText, queryByTestId } = render(
      <DateTimePickerCombiField
        name="Start Date"
        value="2025-06-26T00:00:00Z"
        testId="test"
        id="test"
      />,
    );
    fireEvent.press(getByText('Start Date'));
    expect(queryByTestId('test_spinner')).toBeTruthy();
  });

  it('updates the date when picker value changes', () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <DateTimePickerCombiField
        name="Start Date"
        value="2025-06-26T00:00:00Z"
        testId="test"
        id="test"
      />,
    );
    fireEvent.press(getByText('Start Date'));

    const picker = getByTestId('test_spinner');
    expect(picker).toBeTruthy();
    fireEvent(picker, 'onChange', {
      nativeEvent: { timestamp: new Date('2025-11-12') },
      type: 'set',
    });

    expect(getByText('12-11-2025')).toBeTruthy();
    expect(queryByTestId('test_spinner')).toBeNull();
  });

  it('does not update the date when picker is dismissed', () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <DateTimePickerCombiField
        name="Start Date"
        value="2025-06-26T00:00:00Z"
        testId="test"
        id="test"
      />,
    );
    fireEvent.press(getByText('Start Date'));

    const picker = getByTestId('test_spinner');
    expect(picker).toBeTruthy();
    fireEvent(picker, 'onChange', {
      type: 'dismissed',
      nativeEvent: {},
    });

    expect(getByText('26-06-2025')).toBeTruthy();
    expect(queryByTestId('test_spinner')).toBeNull();
  });
});
