import { ENV } from "@config/env";
import { test, expect } from '@playwright/test';

test.describe("Form-validation", () => {//Script name

    test('Success-validation', async ({ page }) => {//test case name
        // Navigate to the application's base URL
        await page.goto(ENV.BASE_URL);
        await page.waitForLoadState('domcontentloaded');//wait for content loading
        
        // Locate and verify the registration page link is visible
        const regLink = page.getByRole('link', {name: 'Form Validation'});
        await expect(regLink).toBeVisible();
        
        // Click on the registration link to navigate to registration page
        await regLink.click();

        // Wait for navigation to complete and verify we're on the correct page
        await page.waitForURL(ENV.BASE_URL + '/form-validation');
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveTitle('Form Validation page for Automation Testing Practice');

        // Fill in the registration form with test data
        // Using timestamp as username to ensure uniqueness
        await page.getByLabel('Contact Name').fill(Date.now().toString());
        await page.locator('[name="contactnumber"]').fill('012-1111111');
        await page.locator('[name="pickupdate"]').fill('2025-12-19');
        await page.selectOption('#validationCustom04', 'card');

        // Locate and verify the register button
        const registerButton = page.getByRole('button', {name: 'Register'});
        await expect(registerButton).toBeVisible();
        
        // Submit the registration form
        await registerButton.click();
        
        // Verify successful registration by checking redirection and success message
        await expect(page).toHaveURL(ENV.BASE_URL + '/form-confirmation');
        await expect(page.getByText('Form Confirmation page for Automation Testing Practice')).toBeVisible();
    });

    test('Error-validation', async ({ page }) => {//test case name
        // Navigate to the application's base URL
        await page.goto(ENV.BASE_URL);
        await page.waitForLoadState('domcontentloaded');//wait for content loading
        
        // Locate and verify the registration page link is visible
        const regLink = page.getByRole('link', {name: 'Form Validation'});
        await expect(regLink).toBeVisible();
        
        // Click on the registration link to navigate to registration page
        await regLink.click();

        // Wait for navigation to complete and verify we're on the correct page
        await page.waitForURL(ENV.BASE_URL + '/form-validation');
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveTitle('Form Validation page for Automation Testing Practice');


        // Locate and verify the register button
        const registerButton = page.getByRole('button', {name: 'Register'});
        await expect(registerButton).toBeVisible();
        
        // Submit the registration form
        await registerButton.click();
        
        // Verify successful registration by checking redirection and success message
        await expect(page).toHaveURL(ENV.BASE_URL + '/form-validation');
        await expect(page.getByText('Please provide your Contact number.')).toBeVisible();
        await expect(page.getByText('Please provide valid Date.')).toBeVisible();
        await expect(page.getByText('Please select the Paymeny Method.')).toBeVisible();

        await page.locator('[name="contactnumber"]').fill('012-1111111');
        await expect(page.getByText('Please provide valid Date.')).toBeVisible();
        await expect(page.getByText('Please select the Paymeny Method.')).toBeVisible();
        
        await page.getByLabel('Contact Name').fill('');
        await registerButton.click();
        await expect(page.getByText('Please enter your Contact name.')).toBeVisible();

    });
});