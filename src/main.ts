import fs from "fs";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { config } from "dotenv";
import { dataType } from "./types";

config();

const app = puppeteer;

app.use(StealthPlugin());

app
  .launch({ headless: true, executablePath: process.env.BROWSER })
  .then(async (browser: { newPage: () => any }) => {
    const page = await browser.newPage();

    await page.setViewport({ width: 1200, height: 600 });

    await page.goto(process.env.BASE_URL, {
      timeout: 0,
    });

    const productName = await page.evaluate(
      () => document?.querySelector(".product-name").textContent
    );

    const productPrice = await page.evaluate(
      () => document?.querySelector(".product-price").textContent
    );

    let obj = {
      product_name: productName,
      product_price: productPrice,
    };

    const data: dataType[] = [];

    data.push(obj);

    console.log(data);

    let json = JSON.stringify(data);
    fs.writeFileSync("product.json", json);

    await page.waitForTimeout(5000);
  });
