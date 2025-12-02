import { test, expect } from "@playwright/test";
import { FormPage } from "@pages/FormPage";
import { loadExcel } from "@data/excelLoader";

test.describe("Form Tests", () => {

  test("Submit using Excel data", async ({ page }) => {
    const excelData = await loadExcel("src/data/testData.xlsx");
    for (const data of excelData) {
      const form = new FormPage(page);

      await form.openForm();
      await form.fillForm(data);

      const msg = await page.locator("#success").innerText();
      expect(msg).toContain("Success");
    }
  });

});
