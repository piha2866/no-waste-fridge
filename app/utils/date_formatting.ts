export function formatDateToDDMMYYYY(date: Date): string {
  try {
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    if (day === 'NaN') throw Error('Invalid date');
    return `${day}-${month}-${year}`;
  } catch (error) {
    console.log(error);
    return '';
  }
}

export function calcNewExpirationDate(
  openingDate: Date,
  expirationDate: Date,
  newOpeningDate = new Date(),
): Date {
  const croppedOpeningDate = new Date(
    openingDate.getFullYear(),
    openingDate.getMonth(),
    openingDate.getDate(),
  );
  const croppedExpirationDate = new Date(
    expirationDate.getFullYear(),
    expirationDate.getMonth(),
    expirationDate.getDate(),
  );
  const croppedNewOpeningDate = new Date(
    newOpeningDate.getFullYear(),
    newOpeningDate.getMonth(),
    newOpeningDate.getDate(),
  );
  const diffMs = croppedExpirationDate.getTime() - croppedOpeningDate.getTime();
  return new Date(croppedNewOpeningDate.getTime() + diffMs);
}
