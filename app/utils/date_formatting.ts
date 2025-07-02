export function formatDateToDDMMYYYY(date: Date): string {
  try {
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    if (day === 'NaN') throw Error('Invalid date');
    return `${day}-${month}-${year}`;
  } catch (error) {
    console.log('DATEE', date);
    console.log(error);
    return '';
  }
}
