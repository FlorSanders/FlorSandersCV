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
    label: "duration",
    helper: (start, end) => {
      const regex = new RegExp("\\d{4}-\\d{2}-\\d{2}");
      const startMoment = regex.test(start)
        ? new Date(start).toLocaleDateString("en", {
            year: "numeric",
            month: "short",
            timeZone: "UTC",
          })
        : start;
      const endMoment = regex.test(end)
        ? new Date(end).toLocaleDateString("en", {
            year: "numeric",
            month: "short",
            timeZone: "UTC",
          })
        : end;
      if (startMoment === endMoment) {
        return endMoment;
      } else {
        return `${startMoment} - ${endMoment}`;
      }
    },
  },
  {
    label: "years",
    helper: (start, end) => {
      const regex = new RegExp("\\d{4}-\\d{2}-\\d{2}");
      const startYear = regex.test(start)
        ? new Date(start).getFullYear()
        : start;
      const endYear = regex.test(end) ? new Date(end).getFullYear() : end;
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
        timeZone: "UTC",
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
