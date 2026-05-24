import { ENV } from "@config/env";
import { test, expect, Locator, Page } from '@playwright/test';

test.describe("Forget-Password", () => { //

    // Success-Forget-Password
    test('Success-Forget-Password', async ({ page }) => {
        const baseUrl:string = ENV.BASE_URL;

        await page.goto(baseUrl);
        await page.waitForLoadState('domcontentloaded');
        
        const fgPassLink:Locator = await page.getByRole('link', {name: 'Forgot Password Form'});
        await expect(fgPassLink).toBeVisible();
        await fgPassLink.click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveTitle('Forgot Password form page for Automation Testing Practice');

        await page.getByLabel('E-mail').fill('abc@gmail.com');
        const getPassBtn:Locator = await page.getByRole('button', {name: 'Retrieve password'});
        await expect(getPassBtn).toBeVisible();
        await getPassBtn.click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveTitle('Email sent notifications page for Automation Testing Practice');
    });
});