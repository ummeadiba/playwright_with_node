import { ENV } from "@config/env";
import { test, expect } from '@playwright/test';

test.describe("Registration", () => {//Script name

    test('Success-Registration', async ({ page }) => {//test case name
        // Navigate to the application's base URL
        await page.goto(ENV.BASE_URL);
        await page.waitForLoadState('domcontentloaded');//wait for content loading
        
        // Locate and verify the registration page link is visible
        const regLink = page.getByRole('link', {name: 'Test Register Page'});
        await expect(regLink).toBeVisible();
        
        // Click on the registration link to navigate to registration page
        await regLink.click();

        // Wait for navigation to complete and verify we're on the correct page
        await page.waitForURL(ENV.BASE_URL + '/register');
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveTitle('Test Register Page for Automation Testing Practice');

        // Fill in the registration form with test data
        // Using timestamp as username to ensure uniqueness
        await page.getByLabel('Username').fill(Date.now().toString());
        await page.getByLabel('Password', { exact: true }).fill('123456');
        await page.getByLabel('Confirm Password').fill('123456');

        // Locate and verify the register button
        const registerButton = page.getByRole('button', {name: 'Register'});
        await expect(registerButton).toBeVisible();
        
        // Submit the registration form
        await registerButton.click();
        
        // Verify successful registration by checking redirection and success message
        await expect(page).toHaveURL(ENV.BASE_URL + '/login');
        await expect(page.getByText('Successfully registered, you can log in now.')).toBeVisible();
    });
});