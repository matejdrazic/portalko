    function hello () {
        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

        let parser = new RSSParser({
            customFields: {
              item: ['content'],
            }
          });

          let clanak = [{
              naslov,
              slika,
              link
          }]

          parser.parseURL(CORS_PROXY + 'https://www.index.hr/rss', function(err, feed) {
            if (err) throw err;
            feed.items.forEach(function(entry) {
                console.log(feed.title);
            clanak.push(entry.title, entry.content, entry.link);
              
            })
          });

        return clanak;
    }

 