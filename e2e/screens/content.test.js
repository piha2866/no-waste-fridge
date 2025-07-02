import { device, expect, element, by } from 'detox';
import { formatDateToDDMMYYYY } from '../../app/utils/date_formatting';

describe('proper home screen', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {});

  it('should show title', async () => {
    await expect(element(by.text('Your fridges content'))).toBeVisible();
  });

  it('should show notes saved in db', async () => {
    await expect(element(by.id('note-1'))).toBeVisible();
  });

  it('should have add button going to content-details screen', async () => {
    await expect(element(by.id('add-content-button'))).toBeVisible();
    await element(by.id('add-content-button')).tap();
    await expect(element(by.id('arrow-back-button'))).toBeVisible();
  });
});

describe('delete note', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  it('should delete note using detail-screens trashbin', async () => {
    await element(by.text('Ideas')).tap();
    await element(by.id('delete-button')).tap();
    await expect(element(by.text('Groceries'))).toBeVisible();
    await expect(element(by.text('Ideas'))).not.toBeVisible();
  });
});

describe('insert note', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  it.only('should be able to add a note from scratch', async () => {
    const title = 'Test Note';
    const desc = 'This is a test note.';
    const date = new Date();
    const openingDate = formatDateToDDMMYYYY(date);
    date.setFullYear(date.getFullYear() + 1);
    const expirationDate = formatDateToDDMMYYYY(date);
    await expect(element(by.text(title))).not.toBeVisible();
    await expect(element(by.text(desc))).not.toBeVisible();
    await element(by.id('add-content-button')).tap();
    await element(by.id('content_details_title_field')).typeText(title);
    await element(by.id('content_details_description_field')).typeText(desc);
    await element(by.id('content_details_expiration_date_button')).tap();
    await element(by.text('OK')).tap();
    await expect(element(by.text(title))).toBeVisible();
    await expect(element(by.text(desc))).toBeVisible();
    await expect(element(by.text(openingDate))).toBeVisible();
    await expect(element(by.text(expirationDate))).toBeVisible();
    await element(by.id('arrow-back-button')).tap();

    await expect(element(by.text(title))).toBeVisible();
    await element(by.text(title)).tap();

    await expect(element(by.text(title))).toBeVisible();
    await expect(element(by.text(desc))).toBeVisible();
    await expect(element(by.text(openingDate))).toBeVisible();
    await expect(element(by.text(expirationDate))).toBeVisible();
  });
});
