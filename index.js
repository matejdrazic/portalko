function hello () {

  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

  let parser = new RSSParser({
      customFields: {
        item: ['content'],
      }
    });

    //sve vijesti
    var articles = [];
    var article;

    parser.parseURL(CORS_PROXY + 'https://www.index.hr/rss', function(err, feed) {
      if (err) throw err;
      feed.items.forEach(function(entry) {

      //treba spremat clanak u article, onda sve article u articles i to vratit
      
      

      console.log(entry.title);
      articles.push(article);

      })
    });

  return articles;
}

var val = hello(); //odi su svi clanci obradeni u parseAndFetch

//triba učitat prvo index.html inače se neće ovo ispisat
window.onload = function(){
    var table = document.getElementById("table");
    var counter = 0;
    var cell1;
    var cell2;
    var cell3;
    var cell4;
    var row;
 
    //probat ću ovo stavit u drugu funkciju paf.js
/* let parser = new RSSParser({
  customFields: {
    item: ['content', 'contentSnippet'],
  }
}); */

var naslov = document.getElementById("naslov");
  naslov.innerHTML = 'Portalko';

  val.forEach(function (arrayItem) {
    
    row = table.insertRow(counter);

    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell3 = row.insertCell(2);

    console.log(arrayItem.naslov);
    
    cell1.innerHTML = arrayItem.naslov;
    cell2.innerHTML = arrayItem.slika;
    cell3.innerHTML = arrayItem.link;

    counter++;
});

/* parser.parseURL(CORS_PROXY + 'https://www.index.hr/rss', function(err, feed) {
  if (err) throw err;
  feed.items.forEach(function(entry) {
  
    row = table.insertRow(counter);

    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell3 = row.insertCell(2);
    cell4 = row.insertCell(3);
    
    cell1.innerHTML = entry.title;
    cell2.innerHTML = entry.guid;
    cell3.innerHTML = entry.categories;
    cell4.innerHTML = entry.content;
 
    counter++;
  })
}); */
}


