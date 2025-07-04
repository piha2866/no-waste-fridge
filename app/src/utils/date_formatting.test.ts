import { calcNewExpirationDate, formatDateToDDMMYYYY } from './date_formatting';

describe('formatDateToDDMMYYYY', () => {
  it('formats a valid date correctly', () => {
    const date = new Date(2024, 0, 5); // Jan 5, 2024
    expect(formatDateToDDMMYYYY(date)).toBe('05-01-2024');
  });

  it('formats a date with double-digit day/month correctly', () => {
    const date = new Date(2024, 11, 25); // Dec 25, 2024
    expect(formatDateToDDMMYYYY(date)).toBe('25-12-2024');
  });

  it('returns empty string for invalid date', () => {
    const invalidDate = new Date('invalid');
    expect(formatDateToDDMMYYYY(invalidDate)).toBe('');
  });

  it('handles leap year correctly', () => {
    const date = new Date(2024, 1, 29); // Feb 29, 2024 (leap year)
    expect(formatDateToDDMMYYYY(date)).toBe('29-02-2024');
  });
});

describe('calcNewExpirationDate', () => {
  it('adds the duration from openingDate-expirationDate to newOpeningDate', () => {
    const opening = new Date(2024, 0, 1); // Jan 1, 2024
    const expiration = new Date(2024, 0, 11); // Jan 11, 2024 (10 days later)
    const newOpening = new Date(2025, 6, 1); // July 1, 2025

    const result = calcNewExpirationDate(opening, expiration, newOpening);
    expect(result).toEqual(new Date(2025, 6, 11)); // July 11, 2025
  });

  it('uses today as default newOpeningDate if not provided', () => {
    const today = new Date();
    const croppedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const opening = new Date(2023, 5, 1);
    const expiration = new Date(2023, 5, 6); // 5 days later

    const result = calcNewExpirationDate(opening, expiration);
    const expected = new Date(croppedToday.getTime() + 5 * 24 * 60 * 60 * 1000); // +5 days

    expect(result).toEqual(expected);
  });

  it('returns same date when expiration and opening dates are equal', () => {
    const date = new Date(2023, 3, 15); // April 15, 2023
    const newOpening = new Date(2025, 1, 1); // Feb 1, 2025

    const result = calcNewExpirationDate(date, date, newOpening);
    expect(result).toEqual(new Date(2025, 1, 1));
  });

  it('ignores time and only considers date part of input', () => {
    const opening = new Date(2024, 4, 1, 23, 59); // May 1, 2024, late night
    const expiration = new Date(2024, 4, 3, 0, 1); // May 3, 2024, early morning
    const newOpening = new Date(2025, 0, 1, 12); // Jan 1, 2025, noon

    const result = calcNewExpirationDate(opening, expiration, newOpening);
    expect(result).toEqual(new Date(2025, 0, 3)); // Jan 3, 2025
  });
});
