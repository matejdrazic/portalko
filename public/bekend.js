let Parser = require('rss-parser');
let parser = new Parser({
  customFields: {
    item: ['content', 'enclosure'],
  }
});
let articles = [];

let portali = {
  Index: 'https://www.index.hr/rss',
  Telegram: ['https://www.telegram.hr/feed', 'https://telesport.telegram.hr/feed/'],
  sata24: ['https://www.24sata.hr/feeds/aktualno.xml', 'https://www.24sata.hr/feeds/najnovije.xml', 'https://www.24sata.hr/feeds/news.xml', 'https://www.24sata.hr/feeds/show.xml', 'https://www.24sata.hr/feeds/sport.xml', 'https://www.24sata.hr/feeds/lifestyle.xml', 'https://www.24sata.hr/feeds/tech.xml', 'https://www.24sata.hr/feeds/fun.xml'],
  DnevnikHr: 'https://dnevnik.hr/assets/feed/articles',
  Dnevno: 'https://www.dnevno.hr/feed/',
}

async function check() {
  let feed = await parser.parseURL(portali.Index);
  let feed2 = await parser.parseURL(portali.Dnevno);
  let feed3 = await parser.parseURL(portali.Telegram[0]);
  let feed4 = await parser.parseURL(portali.Telegram[1]);
  let feed5 = await parser.parseURL(portali.sata24[2]);
  let feed6 = await parser.parseURL(portali.sata24[4]);
  let feed7 = await parser.parseURL(portali.sata24[6]); 

  feed.items.forEach(item => {
    //console.log(item.title + ':' + item.link + ':' + item.content + ':' + item.pubDate);
    articles.push(item);
  });

  feed2.items.forEach(item => {
    //console.log(item.title + ':' + item.link + ':' + item.categories + ':' + item.content + ':' + item.pubDate);
    articles.push(item);
  });

  feed3.items.forEach(item => {
    //console.log(item.title + ':' + item.link + ':' + item.categories + ':' + item.content + ':' + item.pubDate);
    articles.push(item);
  });

  feed4.items.forEach(item => {
    //console.log(item.title + ':' + item.link + ':' + item.enclosure + ':' + item.pubDate);
    articles.push(item);
  });

  feed5.items.forEach(item => {
    //console.log(item.title + ':' + item.link + ':' + item.content + ':' + item.pubDate);
    articles.push(item);
  });

  feed6.items.forEach(item => {
    //console.log(item.title + ':' + item.link + ':' + item.content + ':' + item.pubDate);
    articles.push(item);
  });

  feed7.items.forEach(item => {
    //console.log(item.title + ':' + item.link + ':' + item.content + ':' + item.pubDate);
    articles.push(item);
    let datum = new Date(item.pubDate).getTime();
    console.log(datum);
  });

  /* articles.sort(function(a,b){
    return new Date(b.pubDate) - new Date(a.pubDate);
  });  
  console.log(articles); */

  /* var someDate = new Date(dateString);
  someDate = someDate.getTime(); */
}

check();
