import { Page } from "@playwright/test";

export class FormControls {
  constructor(private page: Page) {}

  async input(selector: string, val: string) {
    await this.page.locator(selector).fill(val);
  }

  async submit(selector: string) {
    await this.page.locator(selector).click();
  }
}
