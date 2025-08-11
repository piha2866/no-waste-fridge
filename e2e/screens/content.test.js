import { device, expect, element, by } from 'detox';
import { formatDateToDDMMYYYY } from '../../app/src/utils/date_formatting';

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
    await expect(element(by.id('home-button'))).toBeVisible();
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

  it('should be able to add a note from scratch', async () => {
    const title = 'Test Note';
    const desc = 'This is a test note.';
    const date = formatDateToDDMMYYYY(new Date());
    await expect(element(by.text(title))).not.toBeVisible();
    await expect(element(by.text(desc))).not.toBeVisible();
    await element(by.id('add-content-button')).tap();
    await element(by.id('content_details_title_field')).typeText(title);
    await element(by.id('content_details_description_field')).typeText(desc);
    await element(by.id('content_details_opening_date_output')).tap();
    await expect(element(by.id('content_details_opening_date_spinner'))).toBeVisible();
    await element(by.text('OK')).tap();
    await expect(element(by.text(title))).toBeVisible();
    await expect(element(by.text(desc))).toBeVisible();
    await expect(element(by.id('content_details_opening_date_output'))).toHaveText(date);
    await expect(element(by.id('content_details_expiration_date_output'))).toHaveText(date);
    await element(by.id('home-button')).tap();

    await element(by.text(title)).tap();

    await expect(element(by.text(title))).toBeVisible();
    await expect(element(by.text(desc))).toBeVisible();
    await expect(element(by.id('content_details_opening_date_output'))).toHaveText(date);
    await expect(element(by.id('content_details_expiration_date_output'))).toHaveText(date);
    await element(by.id('home-button')).tap();
  });

  it('should be able to clone a note', async () => {
    const title = 'Test Note';
    const title2 = ' 2';
    await element(by.text(title)).tap();
    await element(by.id('content-copy-button')).tap();

    await expect(element(by.id('arrow-back-button'))).toBeVisible();
    await expect(element(by.id('home-button'))).toBeVisible();
    await expect(element(by.id('content_details_image'))).toBeVisible();
    // check content of clone note
    await expect(element(by.id('content_details_title_field'))).toBeVisible();
    await expect(element(by.id('content_details_description_field'))).toBeVisible();
    await expect(element(by.id('content_details_opening_date_button'))).toBeVisible();
    await expect(element(by.id('content_details_opening_date_output'))).toBeVisible();
    await expect(element(by.id('content_details_expiration_date_button'))).toBeVisible();
    await expect(element(by.id('content_details_expiration_date_output'))).toBeVisible();
    await expect(element(by.id('done-button'))).toBeVisible();
    await expect(element(by.id('delete-button'))).not.toBeVisible();
    await expect(element(by.id('content-copy-button'))).not.toBeVisible();
    await expect(element(by.id('restore-button'))).not.toBeVisible();

    await expect(element(by.id('content_details_title_field'))).toHaveText(title);

    await element(by.id('content_details_title_field')).typeText(title2);
    await element(by.id('content_details_description_field')).typeText('test');
    await element(by.id('home-button')).tap();
    await expect(element(by.text(title + title2))).toBeVisible();
  });

  it('should be able to reset a note to the new date', async () => {
    const title = 'Ideas';
    const date = new Date();
    const openingDate = formatDateToDDMMYYYY(date);
    await element(by.text(title)).tap();
    await element(by.id('restore-button')).tap();

    await expect(element(by.id('arrow-back-button'))).toBeVisible();
    await expect(element(by.id('home-button'))).toBeVisible();
    await expect(element(by.id('content_details_image'))).toBeVisible();
    // check content of clone note
    await expect(element(by.id('content_details_title_field'))).toBeVisible();
    await expect(element(by.id('content_details_description_field'))).toBeVisible();
    await expect(element(by.id('content_details_opening_date_button'))).toBeVisible();
    await expect(element(by.id('content_details_opening_date_output'))).toBeVisible();
    await expect(element(by.id('content_details_expiration_date_button'))).toBeVisible();
    await expect(element(by.id('content_details_expiration_date_output'))).toBeVisible();
    await expect(element(by.id('done-button'))).not.toBeVisible();
    await expect(element(by.id('delete-button'))).toBeVisible();
    await expect(element(by.id('content-copy-button'))).toBeVisible();
    await expect(element(by.id('restore-button'))).toBeVisible();

    await expect(element(by.id('content_details_title_field'))).toHaveText(title);
    await expect(element(by.id('content_details_opening_date_output'))).toHaveText(openingDate);
    await element(by.id('home-button')).tap();
    await expect(element(by.text(title))).toBeVisible();
    // check the the reset was actually saved
    await element(by.text(title)).tap();
    await expect(element(by.id('content_details_opening_date_output'))).toHaveText(openingDate);
  });
});
