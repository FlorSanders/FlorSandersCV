const hbs = require("handlebars");
const fs = require("fs");

const partials = ["section", "column", "columns", "list"];

for (const partial of partials) {
  const content = fs.readFileSync(`./templates/modern/${partial}.hbs`, "utf-8");
  hbs.registerPartial(partial, content);
}
