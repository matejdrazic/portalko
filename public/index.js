//triba učitat prvo index.html inače se neće ovo ispisat
window.onload = async function () {              //async - sluzi za obiljezavanje funkcija koje sadrze pozive s await
  let table = document.getElementById("table");
  let counter = 0;
  let cell1;
  let cell2;
  let cell3;
  let cell4;
  let row;
  //let x = document.getElementById("naslov");

  const button = document.getElementById("button");

  let portali = {
    Index: 'https://www.index.hr/rss',
    Telegram: ['https://www.telegram.hr/feed', 'https://telesport.telegram.hr/feed/'],
    sata24: ['https://www.24sata.hr/feeds/aktualno.xml', 'https://www.24sata.hr/feeds/najnovije.xml', 'https://www.24sata.hr/feeds/news.xml', 'https://www.24sata.hr/feeds/show.xml', 'https://www.24sata.hr/feeds/sport.xml', 'https://www.24sata.hr/feeds/lifestyle.xml', 'https://www.24sata.hr/feeds/tech.xml', 'https://www.24sata.hr/feeds/fun.xml'],
    DnevnikHr: 'https://dnevnik.hr/assets/feed/articles',
    Dnevno: 'https://www.dnevno.hr/feed/',
  }

  let userChoice = [portali.Dnevno, portali.Index];
  try {
    const database = firebase.database();

    let promise = await hello(userChoice);

    promise.forEach(function (arrayItem) {

      baza.ref('vijesti/' + counter).set({
        naslov: vijest.title,
        link: vijest.link,
        kategorija: vijest.category,
        kontent: vijest.content,
      });

    var getNews = database.ref('vijesti/' + counter);
    getNews.on('value', (snapshot) => {
      var data = snapshot.val();
      cell1.innerHTML = data.naslov;
      cell2.innerHTML = data.kategorija;
      cell3.innerHTML = data.link;
      cell4.innerHTML = data.kontent;
    });
    counter++;

  });
  } catch (error) {                               //ako dode do iznimke u bloku try, preskače se ostatak bloka try i prelazi u blok catch
    console.log("Error: " + error)
  }

}
