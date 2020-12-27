function  hello() {
  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

  let parser = new RSSParser({
    customFields: {
      item: ['content'],
    }
  });

  return new Promise((resolve, reject) => {

    parser.parseURL(CORS_PROXY + 'https://www.index.hr/rss', function (err, feed) {
      if (err)
        throw err;

        if(feed.items.length != 0) resolve(feed.items)
        else reject("Empty articles")
    });
  })
}

