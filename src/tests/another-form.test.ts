import { BASE_URL, ENV } from "@config/env";
import { test, expect, Locator, Page } from '@playwright/test';
import { locales } from "zod/v4/core";

async function findLinkThenClick(page:Page, linkName:string) {
    const theLink: Locator = await page.getByRole('link', {name: linkName}).first();
    await expect(theLink).toBeVisible();
    await theLink.click();
    await page.waitForLoadState('domcontentloaded');
}

async function gotoTextInputFormPage(page: Page) {
    await page.goto(ENV.BASE_URL);
    await page.waitForLoadState('domcontentloaded');

    await findLinkThenClick(page, 'Pages');
    await findLinkThenClick(page, 'Forms');
    await findLinkThenClick(page, 'Text Inputs');

    const textInputHeader: Locator = await page.getByRole('heading', {name: 'Text Inputs Form'});
    await expect(textInputHeader).toBeVisible();
}

async function fillForm(page: Page) {
    await page.locator('#ajax-submitted-form #text-input').fill('Name');
    await page.locator('#ajax-submitted-form #search-input').fill('Search');
    await page.locator('#ajax-submitted-form #password-input').fill('Password');
    await page.locator('#ajax-submitted-form #email-input').fill('a@gmail.com');
    await page.locator('#ajax-submitted-form #url-input').fill('https://testpages.eviltester.com/pages/forms/text-inputs/');
    await page.locator('#ajax-submitted-form #tel-input').fill('tel');
    await page.locator('#ajax-submitted-form #text-default-input').fill('None (text)');
}

test.describe("Sample-form-test", () => {

    // Sample-Test-Case
    test('Sample-Input-form', async ({ page }) => {
        await page.goto(ENV.BASE_URL);
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveTitle('Software Testing Practice Pages, Apps, and Challenges');

        const pageLink: Locator = await page.getByRole('link', {name: 'Pages'}).first();
        await expect(pageLink).toBeVisible();
        await pageLink.click();
        await page.waitForLoadState('domcontentloaded');

        const formLink: Locator = await page.getByRole('link',{name: 'Forms'}).first();
        await expect(formLink).toBeVisible();
        await formLink.click();
        await page.waitForLoadState('domcontentloaded');

        const textInputlink: Locator = await page.getByRole('link', {name: 'Text Inputs'}).first();
        await expect(textInputlink).toBeVisible();
        await textInputlink.click();
        await page.waitForEvent('domcontentloaded');
    });

    test('Sample-Input-form-Submit', async ({ page }) => {
        await gotoTextInputFormPage(page);
 
        await fillForm(page);

        const submitbutton: Locator = await page.getByRole('button', {name: 'submit'});
        await expect(submitbutton).toBeVisible();
        await submitbutton.click();
        await page.waitForLoadState('domcontentloaded');

        const submitHeader: Locator = await page.getByRole('heading', {name: 'Submitted Values'});
        await expect(submitHeader).toBeVisible();
    });

});