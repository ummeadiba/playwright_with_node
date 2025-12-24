import { ENV } from "@config/env";
import { Page, expect } from "@playwright/test";

/**
 * OtpPage class handles One Time Password (OTP) authentication flow
 * Provides methods to navigate to OTP login, send OTP, verify OTP codes,
 * and validate various error states during the OTP authentication process
 */
export class OtpPage {
    /**
     * Creates an instance of OtpPage
     * @param page - Playwright Page instance for browser interactions
     */
    constructor(protected page: Page) {}

    /**
     * Navigates to the OTP login page and initiates the OTP sending process
     * This method performs the complete flow from homepage to OTP code request:
     * 1. Navigates to base URL
     * 2. Clicks on OTP login link
     * 3. Fills email address
     * 4. Clicks send OTP button to request OTP code
     * 
     * @param email - Email address to send the OTP code to
     * @returns Promise that resolves when OTP request is sent
     */
    async waitUpToOtpLoginPage (email: string) {
        await this.page.goto(ENV.BASE_URL, {waitUntil: 'domcontentloaded'});
    
        const otpLink = await this.page.getByRole('link', {name: 'OTP: One Time Password'});
        await expect(otpLink).toBeVisible();
        await otpLink.click();
    
        await this.page.waitForURL(ENV.BASE_URL + '/otp-login', {waitUntil: 'domcontentloaded'});
        const otpButton = await this.page.getByRole('button', {name: 'Send OTP Code'});
        await expect(otpButton).toBeVisible();
        await this.page.getByLabel('Your Email Address').fill(email);
        await otpButton.click();
    }
    
    /**
     * Verifies that the user is on the OTP verification page
     * Checks that the page URL contains '/otp-login' and the OTP verification heading is visible
     * 
     * @returns Promise that resolves when verification page is confirmed to be loaded
     */
    async expectOtpLoginPage () {
        await this.page.waitForURL(ENV.BASE_URL + '/otp-login', {waitUntil: 'domcontentloaded'});
        await expect(this.page.getByRole('heading', {name: 'OTP Verification'})).toBeVisible();
    }
    
    /**
     * Fills the OTP code input field and submits it for verification
     * This method enters the received OTP code and clicks the verify button
     * 
     * @param otpCode - The 6-digit OTP code to be entered and verified
     * @returns Promise that resolves when OTP verification is submitted
     */
    async fillOtpAndClick (otpCode: string) {
        await this.page.getByPlaceholder('Enter OTP code').fill(otpCode);
        const verifyOtpBtn = await this.page.getByRole('button', {name: 'Verify OTP Code'});
        await expect(verifyOtpBtn).toBeVisible();
        await verifyOtpBtn.click();
    }
    
    /**
     * Verifies successful OTP authentication by checking for the secure area page
     * Confirms that the user has been redirected to the secure area after successful OTP verification
     * 
     * @returns Promise that resolves when secure area page is confirmed to be loaded
     * @note The URL check is commented out but could be enabled for additional verification
     */
    async expectSecureLoginPage () {
        //await expect(this.page.url()).toContain('secure');
        await expect(this.page.getByRole('heading', {name: 'Secure Area page for Automation Testing Practice'})).toBeVisible();
    }
    
    /**
     * Verifies that an invalid email address error message is displayed
     * Used to validate email format validation on the OTP request form
     * 
     * @returns Promise that resolves when the invalid email error message is confirmed visible
     */
    async expectInvalidEmailAlert () {
        await expect(this.page.getByText('Please enter a valid email address.')).toBeVisible();
    }
    
    /**
     * Verifies that an empty OTP field error message is displayed
     * Used to validate that OTP code is required before submission
     * 
     * @returns Promise that resolves when the missing OTP error message is confirmed visible
     */
    async expectNoOtpAlert () {
        await expect(this.page.getByText('Please enter a correct 6-digit OTP code.')).toBeVisible();
    }
    
    /**
     * Verifies that an incorrect OTP code error message is displayed
     * Used to validate that invalid OTP codes are properly rejected
     * 
     * @returns Promise that resolves when the invalid OTP error message is confirmed visible
     */
    async expectInvalidOtpAlert () {
        await expect(this.page.getByText('The provided OTP code is incorrect. Please check your code and try again.')).toBeVisible();
    }
}