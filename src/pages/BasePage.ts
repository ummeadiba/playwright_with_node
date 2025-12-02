import { Page } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async open(url: string) {
    await this.page.goto(url);
  }

  async click(selector: string) {
    await this.page.locator(selector).click();
  }

  async fill(selector: string, value: string) {
    await this.page.locator(selector).fill(value);
  }

  async text(selector: string) {
    return this.page.locator(selector).innerText();
  }
}
