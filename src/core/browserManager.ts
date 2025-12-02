import { Browser, chromium, BrowserContext, Page } from "@playwright/test";
import { ENV } from "@config/env";

export class BrowserManager {
  private browser!: Browser;

  async launch() {
    this.browser = await chromium.launch({
      headless: ENV.HEADLESS === "true"
    });
  }

  async newContext(): Promise<BrowserContext> {
    return this.browser.newContext();
  }

  async newPage(): Promise<Page> {
    const context = await this.newContext();
    return context.newPage();
  }

  async close() {
    await this.browser?.close();
  }
}
