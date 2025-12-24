import { test} from '@playwright/test';
import { OtpPage } from "../pages/OtpPage";

test.describe("OTP-validation", () => {

    test('Success-validation', async ({ page }) => {
        const otpPage = new OtpPage(page);
        await otpPage.waitUpToOtpLoginPage('practice@expandtesting.com');
        await otpPage.expectOtpLoginPage();
        await otpPage.fillOtpAndClick('214365');
        await otpPage.expectSecureLoginPage();
    });

    test('Invalid-Email', async ({ page }) => {
        const otpPage = new OtpPage(page);
        await otpPage.waitUpToOtpLoginPage('abc');
        await otpPage.expectInvalidEmailAlert();
    });

    test('No-OTP', async ({ page }) => {
        const otpPage = new OtpPage(page);
        await otpPage.waitUpToOtpLoginPage('practice@expandtesting.com');
        await otpPage.expectOtpLoginPage();
        await otpPage.fillOtpAndClick('');
        await otpPage.expectNoOtpAlert();
    });

    test('Invalid-OTP', async ({ page }) => {
        const otpPage = new OtpPage(page);
        await otpPage.waitUpToOtpLoginPage('practice@expandtesting.com');
        await otpPage.expectOtpLoginPage();
        await otpPage.fillOtpAndClick('123');
        await otpPage.expectInvalidOtpAlert();
    });
});