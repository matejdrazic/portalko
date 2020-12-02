function  hello() {
  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

  let articles = [];  //array u koji cemo spremati objekte

  let parser = new RSSParser({
    customFields: {
      item: ['content'],
    }
  });

  parser.parseURL(CORS_PROXY + 'https://www.index.hr/rss', function(err, feed) {
    if (err) throw err;
    feed.items.forEach(function(entry) {
      let article = {
        title : entry.title,
        guid : entry.guid,
        category : entry.categories,
        content : entry.content,
      };
      articles.push(article);
    })
  });

  return articles;
}

