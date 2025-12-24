import { BasePage } from "./BasePage";
import { ENV } from "@config/env";
import { expect } from "@playwright/test";

export class LoginPage extends BasePage {

  /**
   * Navigate to the homepage and then to the login page
   */
  async navigateToLogin() {
    // Navigate to the homepage
    await this.open(ENV.BASE_URL);
    await this.page.waitForLoadState('domcontentloaded');

    // Verify the login page link is visible and click it
    const loginLink = this.page.getByRole('link', { name: 'Test Login Page' });
    await expect(loginLink).toBeVisible();
    
    // Navigate to the login page
    await loginLink.click();

    // Wait for navigation to complete and verify we're on the login page
    await this.page.waitForURL(`${ENV.BASE_URL}/login`);
    await this.page.waitForLoadState('load');
  }

  /**
   * Fill and submit login credentials
   * @param username - The username to login with
   * @param password - The password to login with
   */
  async login(username: string, password: string) {
    // Locate and verify the login button exists
    const loginButton = this.page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeVisible();

    // Fill in the login credentials
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    
    // Submit the login form
    await loginButton.click();
  }

  /**
   * Verify successful login by checking for success message
   */
  async verifySuccessfulLogin() {
    await expect(this.page.getByText('You logged into a secure area!')).toBeVisible();
  }

  /**
   * Complete login flow with navigation, credentials, and verification
   * @param username - The username to login with (default: 'practice')
   * @param password - The password to login with (default: 'SuperSecretPassword!')
   */
  async performSuccessfulLogin(username: string = 'practice', password: string = 'SuperSecretPassword!') {
    await this.navigateToLogin();
    await this.login(username, password);
    await this.verifySuccessfulLogin();
  }

  /**
   * Get login form elements for custom interactions
   */
  get loginElements() {
    return {
      usernameField: this.page.getByLabel('Username'),
      passwordField: this.page.getByLabel('Password'),
      loginButton: this.page.getByRole('button', { name: 'Login' }),
      loginLink: this.page.getByRole('link', { name: 'Test Login Page' }),
      successMessage: this.page.getByText('You logged into a secure area!')
    };
  }
}