import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("Authentication", () => {

  test("Success-Auth", async ({ page }) => {
    // Initialize the LoginPage object
    const loginPage = new LoginPage(page);
    
    // Perform complete successful login flow
    await loginPage.performSuccessfulLogin();
  });

  test("Success-Auth-Detailed", async ({ page }) => {
    // Initialize the LoginPage object
    const loginPage = new LoginPage(page);
    
    // Navigate to login page step by step
    await loginPage.navigateToLogin();
    
    // Fill and submit login credentials
    await loginPage.login('practice', 'SuperSecretPassword!');
    
    // Verify successful login
    await loginPage.verifySuccessfulLogin();
  });
});
