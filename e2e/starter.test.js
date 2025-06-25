import { device, expect, element, by } from 'detox';

describe('Example', () => {
  beforeAll(async () => {});

  beforeEach(async () => {
    await device.launchApp({ newInstance: true });
  });

  it('should test something', async () => {
    await expect(element(by.text('Your fridges content')));
  });

  it('should test something 2', async () => {
    await expect(element(by.text('Your fridges content'))).toExist();
  });

  it('should test something 3', async () => {
    await expect(element(by.text('Your fridges content'))).toBeVisible();
  });
});
