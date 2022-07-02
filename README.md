# FlorSandersCV

Welcome! 

This is the repository for my completely and utterly overengineered CV!  
All data is contained in [cv.json](./assets/cv.json). A PDF can be generated from multiple templates using the CLI tool!

## 🚀 Quick start

Curious to dive in?  
Here's how you get started!

```shell
# 1. Clone the repository
git clone git@github.com:FlorSanders/FlorSandersCV.git
# 2. Change directory
cd FlorSandersCV
# 3. Install dependencies
npm i
# 4. Generate a CV
node index.js -t compact
```

A PDF of the CV is now available in the `build` folder.

## 🔥 Advanced usage

When building new templates, the tool can also be used in *watch mode*, by adding the `--watch` or `-w` flag to the command.

The result can either be observed live in `build/cv.pdf` or as a html in `build/cv.html`.

## 🛠️ Built with

This tool stands on the shoulders of giants!  
Special thanks goes out to the creators of:

- [Handlebars](https://handlebarsjs.com/)
- [Puppeteer](https://pptr.dev/)
- [Commander](https://github.com/tj/commander.js)
- [Filewatcher](https://github.com/fgnass/filewatcher)


