function hello(database, counter) {

  let articles = [];

  return new Promise((resolve, reject) => {                 //promises su programski entiteti unutar kojih se postavlja posao koji moze potrajati   

    for(let i = counter; i < counter+10; i++) {
    
      var getNews = database.ref('vijesti/' + i);
      
      getNews.on('value', (snapshot) => {
        var data = snapshot.val();

        let article = {
          "title" : data.naslov,
          "category" : data.kategorija,
          "link" :  data.link,
          "content" : data.content,
        }
  
        articles.push(article);

      });
  
    }

    setTimeout(function(){

      if (articles.length == 10)
        resolve(articles)
      else
        reject("Empty articles")
    }, 1000)
    
  })
}

