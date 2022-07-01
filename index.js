const fs = require("fs");
const hbs = require("handlebars");
const puppeteer = require("puppeteer");

require("./load-helpers.js");
require("./templates/modern/load-helpers.js");

const generateHTML = (cv, template) => {
  const html = hbs.compile(template)(cv);
  return html;
};

const generatePDF = async (html) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-gpu",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
    // headless: false,
  });
  const page = await browser.newPage();
  await page.setContent(html);
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    path: "./cv.pdf",
  });
};

const cv = JSON.parse(fs.readFileSync("./cv.json"));
const template = fs.readFileSync("./templates/modern/template.hbs", "utf-8");
const html = generateHTML(cv, template);
fs.writeFileSync("./index.html", html);
generatePDF(html).then(() => {});
