import { device, expect, element, by } from 'detox';

describe('content_details_screen', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {});

  it('should show all elements (except for content editing buttons)', async () => {
    await element(by.id('add-content-button')).tap();
    await expect(element(by.id('arrow-back-button'))).toBeVisible();
    await expect(element(by.id('content_details_image'))).toBeVisible();

    await expect(element(by.id('content_details_title_field'))).toBeVisible();
    await expect(element(by.id('content_details_description_field'))).toBeVisible();
    await expect(element(by.id('content_details_opening_date_input_field'))).toBeVisible();
    await expect(element(by.id('content_details_expiration_date_input_field'))).toBeVisible();
    await element(by.id('arrow-back-button')).tap();
  });

  it('should show all elements (including content editing buttons)', async () => {
    await element(by.id('note-1')).tap();
    await expect(element(by.id('arrow-back-button'))).toBeVisible();
    await expect(element(by.id('content_details_image'))).toBeVisible();
    await expect(element(by.id('delete-button'))).toBeVisible();
    await expect(element(by.id('content-copy-button'))).toBeVisible();
    await expect(element(by.id('restore-button'))).toBeVisible();

    await expect(element(by.id('content_details_title_field'))).toBeVisible();
    await expect(element(by.id('content_details_description_field'))).toBeVisible();
    await expect(element(by.id('content_details_opening_date_input_field'))).toBeVisible();
    await expect(element(by.id('content_details_expiration_date_input_field'))).toBeVisible();
    await element(by.id('arrow-back-button')).tap();
  });
});
