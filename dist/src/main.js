"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = puppeteer_extra_1.default;
app.use((0, puppeteer_extra_plugin_stealth_1.default)());
app
    .launch({ headless: true, executablePath: process.env.BROWSER })
    .then(async (browser) => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 600 });
    await page.goto(process.env.BASE_URL, {
        timeout: 0,
    });
    const productName = await page.evaluate(() => document === null || document === void 0 ? void 0 : document.querySelector(".product-name").textContent);
    const productPrice = await page.evaluate(() => document === null || document === void 0 ? void 0 : document.querySelector(".product-price").textContent);
    let obj = {
        product_name: productName,
        product_price: productPrice,
    };
    const data = [];
    data.push(obj);
    console.log(data);
    let json = JSON.stringify(data);
    fs_1.default.writeFileSync("product.json", json);
    await page.waitForTimeout(5000);
});
