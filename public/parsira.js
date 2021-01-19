//BUG
/* let Parser = require('rss-parser');
let parser = new Parser();

(async () => {

  let feed = await parser.parseURL('https://www.bug.hr/rss');
  console.log(feed.title);

  feed.items.forEach(item => {
    console.log(item.title + ':' + item.link + ':' + item.categories + ':' + item.content + ':' + item.enclosure)
  });

})(); */


//SLOBODNA
let Parser = require('rss-parser');
let parser = new Parser();

(async () => {

  let feed = await parser.parseURL('https://slobodnadalmacija.hr/feed/category/119');
  console.log(feed.title);

  feed.items.forEach(item => {
    console.log(item.title + ':' + item.link + ':' + item.enclosure)
  });

})();