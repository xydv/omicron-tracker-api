const PORT = process.env.PORT || 5000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
let countries = [];
let cases = [];
let finaljson = [];
// Create A `/` Endpoint
app.get("/", async (req, res) => {
  // Axios Get Request!!
  await axios.get("https://newsnodes.com/omicron_tracker/").then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    // Get Country!!
    $("#datatab tr").each(function () {
      countries.push($(this).children("td").first().text().trim());
    });
    // Get Cases!!
    $("#datatab tr").each(function () {
      cases.push($(this).children("td").next().first().text().trim());
    });
    // Create A JSON From Arrays!!
    const numCountries = countries.length;
    // Loop Through Number Of Countries
    for (let index = 0; index < numCountries; index++) {
      // Object Create
      let object = {
        country: countries[index],
        cases: cases[index],
      };
      finaljson.push(object);
    }
  });
  res.send(finaljson.slice(1, 151));
});
// Listen App!!
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
