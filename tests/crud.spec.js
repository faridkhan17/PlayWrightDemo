import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login'


test.beforeEach( async ({ page }) => {
  const Login = new LoginPage(page)

  await Login.gotoLoginPage()
  await Login.login('standard_user', 'secret_sauce')
  await page.getByText('Products').isVisible();

});

test('add a product to cart', async({page}) => {

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  const cartValue = await page.locator('.shopping_cart_badge').textContent();
  expect(cartValue).toBe('1');
  await page.locator('#shopping_cart_container > a').click();
  const productName = await page.locator('.inventory_item_name').textContent();
  expect(productName).toBe('Sauce Labs Backpack');

})

test('delete a product from cart', async({page}) => {

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  const cartValue = await page.locator('.shopping_cart_badge').textContent();
  expect(cartValue).toBe('1');
  await page.locator('#shopping_cart_container > a').click();
  const productName = await page.locator('.inventory_item_name').textContent();
  expect(productName).toBe('Sauce Labs Backpack');
  await page.locator('#remove-sauce-labs-backpack').click();
  await page.locator('.removed_cart_item').isVisible();

})