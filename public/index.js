//triba učitat prvo index.html inače se neće ovo ispisat
window.onload = async function () {              //async - sluzi za obiljezavanje funkcija koje sadrze pozive s await
  let table = document.getElementById("table");
  let counter = 0;
  let cell1;
  let cell2;
  let cell3;
  let cell4;
  let row;

  const button = document.querySelector("#button");
  button.addEventListener('click', () => {
    const f = firebase.functions().httpsCallable('parseAndSave');
    f();
  });

  let portali = {
    Index: 'https://www.index.hr/rss',
    Telegram: ['https://www.telegram.hr/feed', 'https://telesport.telegram.hr/feed/'],
    sata24: ['https://www.24sata.hr/feeds/aktualno.xml', 'https://www.24sata.hr/feeds/najnovije.xml', 'https://www.24sata.hr/feeds/news.xml', 'https://www.24sata.hr/feeds/show.xml', 'https://www.24sata.hr/feeds/sport.xml', 'https://www.24sata.hr/feeds/lifestyle.xml', 'https://www.24sata.hr/feeds/tech.xml', 'https://www.24sata.hr/feeds/fun.xml'],
    DnevnikHr: 'https://dnevnik.hr/assets/feed/articles',
    Dnevno: 'https://www.dnevno.hr/feed/',
  }
  
  try {
    const database = firebase.database();

    row = table.insertRow(counter);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell3 = row.insertCell(2);
    cell4 = row.insertCell(3);

    var getNews = database.ref('vijesti/' + counter);

    //ne on nego ono da jednon dohvati
    getNews.once('value').then((snapshot) => {
      var data = snapshot.val();
      cell1.innerHTML = data.naslov;
      cell2.innerHTML = data.kategorija;
      cell3.innerHTML = data.link;
      cell4.innerHTML = data.content;
    });
} catch (error) {
  console.log("Error: " + error)
}

}
