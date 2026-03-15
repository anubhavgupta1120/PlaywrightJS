# Playwright with JavaScript

A hands-on course for learning [Playwright](https://playwright.dev/) browser automation using JavaScript.

## 📁 Project Structure

```
PlaywrightCourse/
├── Playwright_JavaScript_Notes.md - Comprehensive Playwright course notes and cheat sheet
└── Chapter_01_Basics_JavaScript/
    ├── 01_basic.js              - Hello World intro
    ├── 02_JS_Step_By_Step.js    - JavaScript fundamentals (variables, loops, functions)
    ├── 03_verify_setup.js       - Verify Node.js environment setup
    └── 04_hot_code.js           - Functions and iteration practice
└── Chapter_02_JS_core_Concepts/
    ├── 05_core_JS_comment.js    - Single and multi-line comments
    ├── 06_core_JS_identifiers.js- Identifiers, literals, operators, and naming rules
    ├── 07_core_JS_keywords.js   - JavaScript keywords
    └── 08_let_var_const.js      - Variables and scope (let, var, const)
└── tests/
    ├── playwright_basic.spec.js  - Locators, assertions, UI element handling, child windows
    ├── playwright_locator.spec.js- getBy locators (getByLabel, getByPlaceholder, etc.)
    └── E2E_functionality.spec.js - Full E2E e-commerce flow (Cart, Checkout, Orders)
```

## 🛠 Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [Playwright](https://playwright.dev/docs/intro)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/anubhavgupta1120/PlaywrightJS.git
   cd PlaywrightJS
   ```

2. **Install Playwright**
   ```bash
   npm init playwright@latest
   ```

3. **Run a script**
   ```bash
   node Chapter_01_Basics_JavaScript/01_basic.js
   ```

## 📚 Chapters

### Chapter 01 — Basics
Covers JavaScript fundamentals and environment setup as a foundation for Playwright automation.

### Chapter 02 — JS Core Concepts
Covers JavaScript core concepts including comments, identifiers, literals, operators, keywords, naming conventions, and variable declarations (let, var, const).

### Playwright Tests (`tests/`)
Hands-on Playwright testing examples:
- **`playwright_basic.spec.js`**: Covers browsers contexts, dropdowns, radio buttons, checkpoints, and handling child windows/tabs.
- **`playwright_locator.spec.js`**: Demonstrates Playwright's recommended `getBy` locators — `getByLabel`, `getByPlaceholder`, checkboxes, radio buttons, and dropdowns.
- **`E2E_functionality.spec.js`**: Demonstrates a complete End-to-End flow of an e-commerce platform including adding to cart, filling out forms, handling dynamic dropdowns, capturing Order IDs, and validating order history.

## 📝 License

This project is for educational purposes.
