const hbs = require("handlebars");
const fs = require("fs");
const path = require("path");

const helpers = [
  {
    label: "img",
    helper: (filename) => {
      const imgBase64 = fs.readFileSync(
        path.join("assets", filename),
        "base64"
      );
      return `data:image/png;base64,${imgBase64}`;
    },
  },
  {
    label: "years",
    helper: (start, end) => {
      const startYear = new Date(start).getFullYear();
      const endYear =
        end && end !== "present" ? new Date(end).getFullYear() : "present";
      if (startYear === endYear) {
        return endYear;
      } else {
        return `${startYear} - ${endYear}`;
      }
    },
  },
  {
    label: "date",
    helper: (isoDate) => {
      const date = new Date(isoDate);
      return date.toLocaleDateString("en", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  {
    label: "joinList",
    helper: (list, joiner) => {
      return list.join(joiner);
    },
  },
];

for (const { label, helper } of helpers) {
  hbs.registerHelper(label, helper);
}
