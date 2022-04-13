const cheerio = require("cheerio");
const fs = require("fs");

let $ = cheerio.load(fs.readFileSync("./collegers.html").toString());

$.html();

let p = $("tbody").children().children().children("a");

let names = [];

p.each((idx, el) => {
  names[idx] = $(el).text();
});

names.pop();

fs.writeFileSync("./allSchools.json", JSON.stringify(names));
