import { Page, expect } from "@playwright/test";

export class FormControls {
  constructor(private page: Page) {}

  // ========== INPUT METHODS ==========
  
  /**
   * Fill text input field
   */
  async input(selector: string, val: string) {
    await this.page.locator(selector).fill(val);
  }

  /**
   * Fill input field and press Enter
   */
  async inputAndEnter(selector: string, val: string) {
    await this.page.locator(selector).fill(val);
    await this.page.locator(selector).press('Enter');
  }

  /**
   * Clear input field
   */
  async clearInput(selector: string) {
    await this.page.locator(selector).clear();
  }

  /**
   * Type text character by character (slower but more realistic)
   */
  async typeText(selector: string, text: string, delay: number = 100) {
    await this.page.locator(selector).type(text, { delay });
  }

  /**
   * Fill textarea element
   */
  async fillTextarea(selector: string, text: string) {
    await this.page.locator(selector).fill(text);
  }

  // ========== BUTTON METHODS ==========

  /**
   * Submit form using submit button
   */
  async submit(selector: string) {
    await this.page.locator(selector).click();
  }

  /**
   * Click any button element
   */
  async clickButton(selector: string) {
    await this.page.locator(selector).click();
  }

  /**
   * Double click element
   */
  async doubleClick(selector: string) {
    await this.page.locator(selector).dblclick();
  }

  // ========== SELECT/DROPDOWN METHODS ==========

  /**
   * Select option by visible text
   */
  async selectByText(selector: string, text: string) {
    await this.page.locator(selector).selectOption({ label: text });
  }

  /**
   * Select option by value
   */
  async selectByValue(selector: string, value: string) {
    await this.page.locator(selector).selectOption({ value: value });
  }

  /**
   * Select option by index
   */
  async selectByIndex(selector: string, index: number) {
    await this.page.locator(selector).selectOption({ index: index });
  }

  /**
   * Select multiple options
   */
  async selectMultiple(selector: string, options: string[]) {
    await this.page.locator(selector).selectOption(options);
  }

  // ========== CHECKBOX/RADIO METHODS ==========

  /**
   * Check checkbox or radio button
   */
  async check(selector: string) {
    await this.page.locator(selector).check();
  }

  /**
   * Uncheck checkbox
   */
  async uncheck(selector: string) {
    await this.page.locator(selector).uncheck();
  }

  /**
   * Toggle checkbox state
   */
  async toggle(selector: string) {
    const isChecked = await this.page.locator(selector).isChecked();
    if (isChecked) {
      await this.uncheck(selector);
    } else {
      await this.check(selector);
    }
  }

  // ========== FILE UPLOAD METHODS ==========

  /**
   * Upload single file
   */
  async uploadFile(selector: string, filePath: string) {
    await this.page.locator(selector).setInputFiles(filePath);
  }

  /**
   * Upload multiple files
   */
  async uploadMultipleFiles(selector: string, filePaths: string[]) {
    await this.page.locator(selector).setInputFiles(filePaths);
  }

  /**
   * Clear file input
   */
  async clearFileInput(selector: string) {
    await this.page.locator(selector).setInputFiles([]);
  }

  // ========== VALIDATION METHODS ==========

  /**
   * Get input value
   */
  async getValue(selector: string): Promise<string> {
    return await this.page.locator(selector).inputValue();
  }

  /**
   * Get element text content
   */
  async getText(selector: string): Promise<string> {
    return await this.page.locator(selector).textContent() || '';
  }

  /**
   * Get selected option text
   */
  async getSelectedText(selector: string): Promise<string> {
    return await this.page.locator(`${selector} option:checked`).textContent() || '';
  }

  /**
   * Check if checkbox/radio is checked
   */
  async isChecked(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isChecked();
  }

  /**
   * Check if element is visible
   */
  async isVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  /**
   * Check if element is enabled
   */
  async isEnabled(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isEnabled();
  }

  /**
   * Check if element is disabled
   */
  async isDisabled(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isDisabled();
  }

  // ========== WAIT METHODS ==========

  /**
   * Wait for element to be visible
   */
  async waitForVisible(selector: string, timeout: number = 30000) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   */
  async waitForHidden(selector: string, timeout: number = 30000) {
    await this.page.locator(selector).waitFor({ state: 'hidden', timeout });
  }

  /**
   * Wait for element to be enabled
   */
  async waitForEnabled(selector: string, timeout: number = 30000) {
    await this.page.locator(selector).waitFor({ state: 'attached', timeout });
    await expect(this.page.locator(selector)).toBeEnabled({ timeout });
  }

  // ========== ASSERTION METHODS ==========

  /**
   * Assert element has specific value
   */
  async assertValue(selector: string, expectedValue: string) {
    await expect(this.page.locator(selector)).toHaveValue(expectedValue);
  }

  /**
   * Assert element has specific text
   */
  async assertText(selector: string, expectedText: string) {
    await expect(this.page.locator(selector)).toHaveText(expectedText);
  }

  /**
   * Assert element is visible
   */
  async assertVisible(selector: string) {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  /**
   * Assert element is hidden
   */
  async assertHidden(selector: string) {
    await expect(this.page.locator(selector)).toBeHidden();
  }

  /**
   * Assert checkbox/radio is checked
   */
  async assertChecked(selector: string) {
    await expect(this.page.locator(selector)).toBeChecked();
  }

  /**
   * Assert checkbox/radio is unchecked
   */
  async assertUnchecked(selector: string) {
    await expect(this.page.locator(selector)).not.toBeChecked();
  }

  /**
   * Assert element is enabled
   */
  async assertEnabled(selector: string) {
    await expect(this.page.locator(selector)).toBeEnabled();
  }

  /**
   * Assert element is disabled
   */
  async assertDisabled(selector: string) {
    await expect(this.page.locator(selector)).toBeDisabled();
  }

  // ========== UTILITY METHODS ==========

  /**
   * Hover over element
   */
  async hover(selector: string) {
    await this.page.locator(selector).hover();
  }

  /**
   * Focus on element
   */
  async focus(selector: string) {
    await this.page.locator(selector).focus();
  }

  /**
   * Blur (remove focus from) element
   */
  async blur(selector: string) {
    await this.page.locator(selector).blur();
  }

  /**
   * Scroll element into view
   */
  async scrollIntoView(selector: string) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Get element count
   */
  async getElementCount(selector: string): Promise<number> {
    return await this.page.locator(selector).count();
  }

  /**
   * Take screenshot of specific element
   */
  async screenshotElement(selector: string, path?: string) {
    return await this.page.locator(selector).screenshot({ path });
  }
}
