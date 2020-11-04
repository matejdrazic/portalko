 
// Note: some RSS feeds can't be loaded in the browser due to CORS security.
// To get around this, you can use a proxy.
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

//triba učitat prvo index.html inače se neće ovo ispisat
window.onload = function(){
    var table = document.getElementById("table");
    var row = table.insertRow(0);

var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);

 
let parser = new RSSParser();
parser.parseURL(CORS_PROXY + 'https://www.index.hr/rss', function(err, feed) {
  if (err) throw err;
  console.log(feed.title);
  feed.items.forEach(function(entry) {
    console.log(entry.title + ':' + entry.link);
    
    cell1.innerHTML = entry.title;
    cell2.innerHTML = entry.link;

    //Ovo ti pokazuje samo zadnju vijest jer ih stalno mijenja! 
    //document.body.innerHTML = entry.title + ':' + entry.link; 
  })
});
}

 
