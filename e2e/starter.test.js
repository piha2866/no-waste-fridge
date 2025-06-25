import { device, expect, element, by } from 'detox';

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
    await expect(element(by.id('content-details-back-button'))).toBeVisible();
  });
});
