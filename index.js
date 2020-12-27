//triba učitat prvo index.html inače se neće ovo ispisat
window.onload = async function() {              //async - sluzi za obiljezavanje funkcija koje sadrze pozive s await
  let table = document.getElementById("table");
  let counter = 0;
  let cell1;
  let cell2;
  let cell3;
  let cell4;
  let row;

  let portali = {
    Index : 'https://www.index.hr/rss',
    Telegram : 'https://www.telegram.hr/feed',
    sata24 : ['https://www.24sata.hr/feeds/aktualno.xml', 'https://www.24sata.hr/feeds/najnovije.xml', 'https://www.24sata.hr/feeds/news.xml', 'https://www.24sata.hr/feeds/show.xml', 'https://www.24sata.hr/feeds/sport.xml', 'https://www.24sata.hr/feeds/lifestyle.xml', 'https://www.24sata.hr/feeds/tech.xml', 'https://www.24sata.hr/feeds/fun.xml'],
    DnevnikHr : 'https://dnevnik.hr/assets/feed/articles',
    Dnevno : 'https://www.dnevno.hr/feed/',
  }

  let userChoice = [portali.Telegram, portali.Dnevno];
  
  try {                                           // u bloku try navodi se kod koji potencijalno dovodi do iznimke
    const promise = await hello(userChoice);                 // await - koristi se za funkcije koje mogu trajati dugo

    promise.forEach(function (arrayItem) {        // ako ne dode do oznimke u bloku try  ne izvodi se kod u bloku catch
      row = table.insertRow(counter);
      console.log("zasto zavrsis odi");
      cell1 = row.insertCell(0);
      cell2 = row.insertCell(1);
      cell3 = row.insertCell(2);
      cell4 = row.insertCell(3);
        
      cell1.innerHTML = arrayItem.title;
      cell2.innerHTML = arrayItem.link;
      cell3.innerHTML = arrayItem.category;
      cell4.innerHTML = arrayItem.content;
  
      counter++;
    });
  } catch (error) {                               //ako dode do iznimke u bloku try, preskače se ostatak bloka try i prelazi u blok catch
    console.log("Error: " + error)
  }
}