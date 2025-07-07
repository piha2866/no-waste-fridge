import { device, expect, element, by } from 'detox';

describe('content_details_screen', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {});

  it('should show all elements (except for content editing buttons)', async () => {
    await element(by.id('add-content-button')).tap();
    await expect(element(by.id('home-button'))).toBeVisible();
    await expect(element(by.id('content_details_image'))).toBeVisible();
    await expect(element(by.id('delete-button'))).not.toBeVisible();
    await expect(element(by.id('content-copy-button'))).not.toBeVisible();
    await expect(element(by.id('restore-button'))).not.toBeVisible();
    await expect(element(by.id('done-button'))).not.toBeVisible();
    await expect(element(by.id('arrow-back-button'))).not.toBeVisible();

    await expect(element(by.id('content_details_title_field'))).toBeVisible();
    await expect(element(by.id('content_details_description_field'))).toBeVisible();
    await expect(element(by.id('content_details_opening_date_button'))).toBeVisible();
    await expect(element(by.id('content_details_opening_date_output'))).toBeVisible();
    await expect(element(by.id('content_details_expiration_date_button'))).toBeVisible();
    await expect(element(by.id('content_details_expiration_date_output'))).toBeVisible();
    await element(by.id('home-button')).tap();
  });

  it('should show all elements (including content editing buttons)', async () => {
    await element(by.id('note-1')).tap();
    await expect(element(by.id('home-button'))).toBeVisible();
    await expect(element(by.id('content_details_image'))).toBeVisible();
    await expect(element(by.id('delete-button'))).toBeVisible();
    await expect(element(by.id('content-copy-button'))).toBeVisible();
    await expect(element(by.id('restore-button'))).toBeVisible();
    await expect(element(by.id('done-button'))).not.toBeVisible();
    await expect(element(by.id('arrow-back-button'))).not.toBeVisible();

    await expect(element(by.id('content_details_title_field'))).toBeVisible();
    await expect(element(by.id('content_details_description_field'))).toBeVisible();
    await expect(element(by.id('content_details_opening_date_button'))).toBeVisible();
    await expect(element(by.id('content_details_opening_date_output'))).toBeVisible();
    await expect(element(by.id('content_details_expiration_date_button'))).toBeVisible();
    await expect(element(by.id('content_details_expiration_date_output'))).toBeVisible();
    await element(by.id('home-button')).tap();
  });

  it('should enable editing of opening date using datetimepicker', async () => {
    await element(by.id('note-1')).tap();
    await element(by.id('content_details_opening_date_button')).tap();
    await expect(element(by.id('content_details_opening_date_spinner'))).toBeVisible();
    await element(by.text('OK')).tap();
    await expect(element(by.id('content_details_opening_date_spinner'))).not.toBeVisible();
  });
});
