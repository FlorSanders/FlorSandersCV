const commander = require("commander");
const filewatcher = require("filewatcher");
const path = require("path");
const fs = require("fs");
const { generateCV } = require("./utils/generateCV.js");

// Parse CLI arguments
commander
  .name("flor-sanders-cv")
  .description("CLI tool to generate a PDF CV from a handlebars template.")
  .version("1.0.0")
  .option("-w, --watch", "Add to continuously watch for changes.")
  .option("-t, --template <string>", "Select which template to use", "modern")
  .parse(process.argv);

// Application
const main = async (options) => {
  const { template, watch } = options;
  try {
    // Check if template exists
    const templatePath = path.join("templates", `${template}.hbs`);
    if (!fs.existsSync(templatePath))
      throw new Error(`Template ${template} does not exist`);
    // Build CV
    if (watch) {
      // Continuously
      const watcher = filewatcher();
      watcher.add(path.join("cv.json"));
      watcher.add(templatePath);
      watcher.on("change", (_file, stat) => {
        if (stat) generateCV(templatePath);
      });
    } else {
      // Once
      await generateCV(templatePath);
    }
  } catch ({ message }) {
    console.error(message);
  }
};

// Run application
if (require.main === module) {
  main(commander.opts());
}
