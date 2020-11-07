 
// Note: some RSS feeds can't be loaded in the browser due to CORS security.
// To get around this, you can use a proxy.
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

//triba učitat prvo index.html inače se neće ovo ispisat
window.onload = function(){
    var table = document.getElementById("table");
    var counter = 0;
    var cell1;
    var cell2;
    var cell3;
    var cell4;
    var row;
 
let parser = new RSSParser({
  customFields: {
    item: ['content', 'contentSnippet'],
  }
});
parser.parseURL(CORS_PROXY + 'https://www.index.hr/rss', function(err, feed) {
  if (err) throw err;
  var naslov = document.getElementById("naslov");
  naslov.innerHTML = feed.title;
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
});
}

 
