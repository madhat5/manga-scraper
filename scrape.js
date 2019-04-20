// MANGA SCRAPE

const fs = require('fs');
// const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');
const jsonframe = require('jsonframe-cheerio');

var mangaIndex = [];

let i = 1;
for (i; i < 64; i++) {
const options = {
// var options = {
  uri:'https://myanimelist.net/manga/genre/1/Action',
  qs: {
    page: i
  },
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
        _s: ".seasonal-anime",
        _d: [{
          "title": ".link-title < html",
          "url": "a.link-title @ href",
          // "url": ".title-text a @ href",
          "author": ".producer",
          "imageUrl": "img.image @ src",
          "score": ".score < html"
        }]
      }
    };

    // push to array?
    var mangaList = $('body').scrape(frame);
    // console.log(mangaList);
    mangaIndex.push(mangaList);

    // // put 2nd request in a for loop with URL + i, and new cheerio.load(body2)?
    // let i = 1;
    // for (i; i < 64; i++) {
    //   const options2 = {
    //     uri:'https://myanimelist.net/manga/genre/1/Action',
    //     qs: {
    //       page: i
    //     },
    //     transform: function (body2) {
    //       return cheerio.load(body2);
    //     }
    //   };
    //
    //   rp(options2)
    //   .then(($) => {
    //
    //     // TEST
    //     // console.log($);
    //
    //     // jsonframe SETUP
    //     jsonframe($)
    //
    //     var frame = {
    //       "manga": {
    //         _s: ".seasonal-anime",
    //         _d: [{
    //           "title": ".link-title < html",
    //           "url": "a.link-title @ href",
    //           // "url": ".title-text a @ href",
    //           "author": ".producer",
    //           "imageUrl": "img.image @ src",
    //           "score": ".score < html"
    //         }]
    //       }
    //     };
    //
    //     var mangaList2 = $('body').scrape(frame);
    //     // console.log(mangaList2);
    //     mangaIndex.push(mangaList2);
    //     // console.log(mangaIndex[5]);
    //
    //
    //     if (i == 64 ) {
    //       function writeFile() {
    //         fs.writeFile("data.json", JSON.stringify(mangaIndex, null, 4), (err) => {
    //           console.log(
    //             '====================================' + '\n' +
    //             'File write success!' + '\n' +
    //             'Data file located in data.json ' +
    //             '(' + mangaIndex.length + ' items)' + '\n' + '====================================' );
    //         });
    //       }
    //
    //       writeFile();
    //     }
    //   })
    // }

    // writeFile
    // add if after loop then writefile?
        if (i == 64 ) {
    function writeFile() {
      fs.writeFile("data.json", JSON.stringify(mangaIndex, null, 4), (err) => {
        console.log(
          '====================================' + '\n' +
          'File write success!' + '\n' +
          'Data file located in data.json ' +
          '(' + mangaIndex.length + ' items)' + '\n' + '====================================' );
      });
    }
  }

    writeFile();
  })
  .catch((err) => {
    console.log(err);
  });
}
