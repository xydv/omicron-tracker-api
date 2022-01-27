const PORT = process.env.PORT || 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();

// const newspapers = [
//   {
//     name: "cityam",
//     address: "https://newsnodes.com/omicron_tracker/",
//     base: "",
//   },
// ];

const articles = [];

// newspapers.forEach((newspaper) => {
axios.get("https://newsnodes.com/omicron_tracker/").then((response) => {
  const html = response.data;
  // console.log(html);
  const $ = cheerio.load(html);

  // $("tbody", html).each(function () {
  // console.log(this);
  // console.log(this.name);
  // const newhtml = this;
  // articles.push(newhtml);

  // });
  // });
  // });
  // get country
  // var countries = [];
  // $("#datatab a").each(function () {
  //   countries.push($(this).text().trim());
  // });
  // // console.log(countries);
  // const fcountry = countries.filter((country) => {
  //   return country != "source";
  // });
  // get cases
  var cases = [];
  $("#datatab .u-text-r").each(function () {
    cases.push($(this).text().trim());
  });
  const fcases = cases.filter((cse) => {
    //cse short for case because case is taken
    return cse != "" && cse != "-" && !cse.includes("%") && cse !="source" && !cse.includes("(");
  });

  app.get("/", (req, res) => {
    // res.send(fcountry.slice(0, 150));
    res.send(fcases);
  });

  // app.get("/news/:newspaperId", (req, res) => {
  //   const newspaperId = req.params.newspaperId;

  //   const newspaperAddress = newspapers.filter(
  //     (newspaper) => newspaper.name == newspaperId
  //   )[0].address;
  //   const newspaperBase = newspapers.filter(
  //     (newspaper) => newspaper.name == newspaperId
  //   )[0].base;

  //   axios
  //     .get(newspaperAddress)
  //     .then((response) => {
  //       const html = response.data;
  //       const $ = cheerio.load(html);
  //       const specificArticles = [];

  //       $('a:contains("climate")', html).each(function () {
  //         const title = $(this).text();
  //         const url = $(this).attr("href");
  //         specificArticles.push({
  //           title,
  //           url: newspaperBase + url,
  //           source: newspaperId,
  //         });
  //       });
  //       res.json(specificArticles);
  //     })
  //     .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
