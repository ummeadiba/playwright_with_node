import { BasePage } from "./BasePage";
import { FormControls } from "./components/formControls";
import { ENV } from "@config/env";

export class FormPage extends BasePage {
  controls = new FormControls(this.page);

  async openForm() {
    await this.open(`${ENV.BASE_URL}/form`);
  }

  async fillForm(data: any) {
    await this.controls.input("#name", data.name);
    await this.controls.input("#email", data.email);
    await this.controls.submit("#submitBtn");
  }
}
