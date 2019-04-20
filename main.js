// MANGA SCRAPE

const fs = require('fs');
const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');
const jsonframe = require('jsonframe-cheerio');

const options = {
  uri:'https://myanimelist.net/manga/genre/1/Action',
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(($) => {
    // TEST
    // console.log($);

    // jsonframe SETUP
    jsonframe($)

    var frame = {
      "manga": {
        _s : ".seasonal-anime",
        _d : [{
          "title" : ".link-title < html",
          "url" : "a.link-title @ href",
          // "url": ".title-text a @ href",
          "author" : ".producer",
          "imageUrl" : "img.image @ src",
          "score" : ".score < html"
        }]
      }
    };

    var mangaList = $('body').scrape(frame);
    // console.log(mangaList);

    // writeFile

    function writeFile() {
      // Will write the json file
      fs.writeFile("data.json", JSON.stringify(mangaList, null, 4), (err) => {
        console.log("File successfully written!");
      });
    }

    writeFile();
  })
  .catch((err) => {
    console.log(err);
  });
