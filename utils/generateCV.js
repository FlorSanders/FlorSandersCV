const fs = require("fs");
const path = require("path");
const hbs = require("handlebars");
const puppeteer = require("puppeteer");
require("./load-helpers.js");

// Make build folder if it doesn't yet exist
const buildFolder = path.join("build");
if (!fs.existsSync(buildFolder)) {
  fs.mkdirSync(buildFolder);
}

/**
 * Turn CV data and handlebars template into a html page and write it to disk.
 * @param {object} cv - CV data (see ../assets/cv.json)
 * @param {string} template - Handlebars CV template
 * @returns {string} HTML code (also written to ../build/cv.html)
 */
const generateHTML = (cv, template) => {
  const html = hbs.compile(template)(cv);
  fs.writeFileSync(path.join("build", "cv.html"), html);
  return html;
};

/**
 * Generate PDF from html source and write to disk
 * @param {string} html - HTML source code
 * @returns {object} PDF file (also written to ../build/cv.pdf)
 */
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
  const cv = JSON.parse(fs.readFileSync(path.join("assets", "cv.json")));
  const templateContent = fs.readFileSync(templatePath, "utf-8");
  const html = generateHTML(cv, templateContent);
  const pdf = await generatePDF(html);
  return pdf;
};

module.exports = { generateHTML, generatePDF, generateCV };
