window.onload = async function () {
  let table = document.getElementById("table");
  let counter = 0;
  let row;
  let picture;
  let content;
  let title;
  let paragraph;
  let guid;
  let category;
  let articles = [];

  const database = firebase.database();
  //DA VIDIMO KOJIH 10 CE UVATIT
  let clanci = database.ref('/vijesti');

  //OVO IH SORTIRA PO VRIMENU
  /* clanci.orderByChild('pubdate')
   .limitToLast(30)
   .once('value',
     function (snapshot) {
       snapshot.forEach(function (clanak) {
         console.log(clanak.val());
       })
     }); */


  clanci.orderByChild('kategorija')
    .equalTo('Sport')
    .limitToLast(30)
    .once('value',
      function (snapshot) {
        snapshot.forEach(function (clanak) {
          console.log(clanak.val());
        })
      });

  //OVO RADI ZA KATEGORIJE
  /* clanci.orderByChild('pubdate')
    .limitToLast(30)
    .once('value',
      function (snapshot) {
        snapshot.forEach(function (clanak) {
          if(clanak.val().kategorija == "Sport")
          console.log(clanak.val());
        })
      });
 */







  //dohvatDesetClanaka();
  async function dohvatDesetClanaka() {
    const promise = await hello(database, counter);

    promise.forEach(function (arrayItem) {


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

      title.innerHTML = arrayItem.title;
      category.innerHTML = arrayItem.category;
      guid.innerHTML = arrayItem.link;
      picture.innerHTML = arrayItem.content;
      paragraph.innerHTML = picture.textContent;
      counter++;
    });
  }

  document.querySelector("#search-box").addEventListener("keyup", e => {
    let query = e.currentTarget.value;

    let cards = document.querySelectorAll(".clanak #sadrzaj-clanka");
    for (let card of cards) {
      if (card.textContent.toUpperCase().indexOf(query.toUpperCase()) >= 0) {
        card.parentElement.style.display = "block";
      } else {
        card.parentElement.style.display = "none";
      }
    }
  });

  let loadMore = document.querySelector("#ucitaj-jos").addEventListener('click', e => {
    dohvatDesetClanaka();

  });
}
