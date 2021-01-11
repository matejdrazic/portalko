//triba učitat prvo index.html inače se neće ovo ispisat
window.onload = async function () {              //async - sluzi za obiljezavanje funkcija koje sadrze pozive s await
  let table = document.getElementById("table");
  let counter = 0;
  let row;
  let picture;
  let content;
  let title;
  let paragraph;
  let guid;
  let category;

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

      //console.log(arrayItem.content);

      database.ref('vijesti/' + counter).set({
        naslov: arrayItem.title,
        link: arrayItem.link,
        kategorija: arrayItem.category,
        kontent: arrayItem.content,
      });

      row = document.createElement("div");
      row.classList = "clanak";
      table.appendChild(row);

      picture = document.createElement("div");
      picture.id = "slika-clanka";
      row.appendChild(picture);

      content = document.createElement("div");
      content.id = "sadrzaj-clanka";
      row.appendChild(content);

      title = document.createElement("h2");
      title.id = "naslov-clanka";
      content.appendChild(title);

      paragraph = document.createElement("p");
      paragraph.id = "opis-clanka";
      content.appendChild(paragraph);

      guid = document.createElement("a");
      guid.id = "link-clanka";
      content.appendChild(guid);

      category = document.createElement("small");
      category.id = "kategorija-clanka";
      content.appendChild(category);


      var getNews = database.ref('vijesti/' + counter);
      getNews.on('value', (snapshot) => {
        var data = snapshot.val();
        title.innerHTML = data.naslov;
        category.innerHTML = data.kategorija;
        guid.innerHTML = data.link;
        picture.innerHTML = data.kontent;
        paragraph.innerHTML = picture.textContent;
      });

      counter++;
    });

  } catch (error) {                               //ako dode do iznimke u bloku try, preskače se ostatak bloka try i prelazi u blok catch
    console.log("Error: " + error)
  }

  document.querySelector("#search-box").addEventListener("keyup", e => {
    let query = e.currentTarget.value;
    //console.log(query.toUpperCase());

    let cards = document.querySelectorAll(".clanak #sadrzaj-clanka");
    for( let card of cards) {
      //console.log(card.textContent.toUpperCase());
        if (card.textContent.indexOf(query >= 0)) {
            card.parentElement.style.display = "block"
        } else {
            card.parentElement.style.display = "none";
        }
    }
})

}
