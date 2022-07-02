const fs = require("fs");
const path = require("path");
const hbs = require("handlebars");
const puppeteer = require("puppeteer");

// Make build folder if it doesn't yet exist
const buildFolder = path.join("build");
if (!fs.existsSync(buildFolder)) {
  fs.mkdirSync(buildFolder);
}

require("./load-helpers.js");
require("./templates/modern/load-helpers.js");

const generateHTML = (cv, template) => {
  const html = hbs.compile(template)(cv);
  fs.writeFileSync(path.join("build", "cv.html"), html);
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
    path: path.join("build", "cv.pdf"),
  });
  await page.close();
  await browser.close();
  return pdf;
};

const generateCV = async (templatePath) => {
  const cv = JSON.parse(fs.readFileSync("./cv.json"));
  const templateContent = fs.readFileSync(templatePath, "utf-8");
  const html = generateHTML(cv, templateContent);
  const pdf = await generatePDF(html);
  return pdf;
};

module.exports = { generateHTML, generatePDF, generateCV };
