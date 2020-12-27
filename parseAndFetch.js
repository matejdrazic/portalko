function  hello() {
  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

  let articles = [];

  let parser = new RSSParser({
    customFields: {
      item: ['content'],
    }
  });

  return new Promise((resolve, reject) => {                 //promises su programski entiteti unutar kojih se postavlja posao koji moze potrajati      
                                                            //posao se obavlja unutar izvršne funkcije, nakon što je posao završen obećanje prelazi u stanje uspjeha ili neuspjeha
    parser.parseURL(CORS_PROXY + 'https://www.index.hr/rss', function (err, feed) {
      if (err)
        throw err;

      //console.log(feed.items.length);
      //console.log(feed.items);
      //console.log(feed.items[5]);

      for(let i = 0; i < feed.items.length; i++) {
        let article = {
          "title" : feed.items[i].title,
          "category" : feed.items[i].categories,
          "link" : feed.items[i].guid,
          "content" : feed.items[i].content,
        }
        articles.push(article);
      }

      //console.log(articles);

      if(feed.items.length != 0) 
        resolve(articles)
      else 
        reject("Empty articles")
    
    });
  
  })

}

