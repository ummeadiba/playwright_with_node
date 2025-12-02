# **README.md**

```markdown
# Playwright with Node.js

A modern, modular **Playwright** automation framework built with **Node.js** and **TypeScript**. Designed for maintainable, scalable, and 2026-ready automation projects.  

It supports:

- Page Object Model (POM) with **Component Objects**
- Data-driven testing using **ExcelJS** and JSON
- Environment configuration with **Zod** validation
- TypeScript path aliases for clean imports
- Playwright HTML reporter, screenshots, and video capture
- Local file or HTTP server testing
```

---

## 📁 Project Structure

```markdown
.
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── .env
├── src/
│   ├── config/
│   ├── core/
│   ├── pages/
│   ├── data/
│   ├── utils/
│   └── tests/
└── LICENSE
```

---

## ⚡ Getting Started

1. Clone the repository:

```bash
git clone https://github.com/ummeadiba/playwright_with_node.git
cd playwright_with_node
````

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

4. Configure environment variables in `.env`:

```
BASE_URL=http://localhost:8080
HEADLESS=true
```

5. Run tests:

```bash
npx playwright test
```

Or in **headed mode**:

```bash
npx playwright test --headed
```

---

## 📦 Dependencies

* [Playwright](https://playwright.dev)
* [TypeScript](https://www.typescriptlang.org)
* [ExcelJS](https://www.npmjs.com/package/exceljs)
* [Zod](https://github.com/colinhacks/zod)
* [dotenv](https://www.npmjs.com/package/dotenv)

---

## 📝 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.