//triba učitat prvo index.html inače se neće ovo ispisat
window.onload = async function () {              //async - sluzi za obiljezavanje funkcija koje sadrze pozive s await
  let table = document.getElementById("table");
  let counter = 0;
  let cell1;
  let cell2;
  let cell3;
  let cell4;
  let row;

  let portali = {
    Index: 'https://www.index.hr/rss',
    Telegram: ['https://www.telegram.hr/feed', 'https://telesport.telegram.hr/feed/'],
    sata24: ['https://www.24sata.hr/feeds/aktualno.xml', 'https://www.24sata.hr/feeds/najnovije.xml', 'https://www.24sata.hr/feeds/news.xml', 'https://www.24sata.hr/feeds/show.xml', 'https://www.24sata.hr/feeds/sport.xml', 'https://www.24sata.hr/feeds/lifestyle.xml', 'https://www.24sata.hr/feeds/tech.xml', 'https://www.24sata.hr/feeds/fun.xml'],
    DnevnikHr: 'https://dnevnik.hr/assets/feed/articles',
    Dnevno: 'https://www.dnevno.hr/feed/',
  }

  let userChoice = [portali.Dnevno, portali.Index];
  console.log(userChoice);
  try {                                          
    const database = firebase.database();

    // ODI SAN NAPRAVIA DA SE VIJESTI U BAZU ŠALJU SVAKO 10 MINUTI  
    const promise = await hello(userChoice);                

    promise.forEach(function (arrayItem) {      

      database.ref('vijesti/' + counter).set({
        naslov: arrayItem.title,
        link: arrayItem.link,
        kategorija: arrayItem.category,
        kontent: arrayItem.content,
      });

      row = table.insertRow(counter);
      cell1 = row.insertCell(0);
      cell2 = row.insertCell(1);
      cell3 = row.insertCell(2);
      cell4 = row.insertCell(3);

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
