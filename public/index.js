window.onload = async function () {
  let table = document.getElementById("table");
  let row;
  let picture;
  let content;
  let title;
  let paragraph;
  let guid;
  let category;
  let counter = 0;
  let articles = [];

  const database = firebase.database();

  database.ref('vijesti')
  .limitToFirst(240)
  .orderByChild('pubdate')
  .once("value", function (snapshot) {
      snapshot.forEach((clanak)=>{
          News(clanak.val());
      });
  });

  /* function get() {
    return new Promise((resolve, reject) => {
      database.ref('vijesti').once("value", function (snapshot) {
        //console.log(snapshot.val());
        resolve(snapshot.val());
      });
    });
  }

  get().then((data) =>{
    for (let cl in data)
    console.log(cl);
  }); */


  function News(cl) {

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

    title.innerHTML = cl.naslov;
    category.innerHTML = cl.kategorija;
    guid.innerHTML = cl.link;
    picture.innerHTML = cl.content;
    paragraph.innerHTML = cl.textContent;

  }

  document.querySelector('#Sport').addEventListener('click', () => {
    var paras = document.getElementsByClassName('clanak');
    while (paras[0]) {
      paras[0].parentNode.removeChild(paras[0]);
    }
    database.ref('vijesti').once("value", function (snapshot) {
      snapshot.forEach((clanak)=>{
        if(clanak.val().kategorija == 'Sport')
          News(clanak.val());
      });
    });
  });

  document.querySelector('#Tech').addEventListener('click', () => {
    var paras = document.getElementsByClassName('clanak');
    while (paras[0]) {
      paras[0].parentNode.removeChild(paras[0]);
    }
    database.ref('vijesti').once("value", function (snapshot) {
      snapshot.forEach((clanak)=>{
        if(clanak.val().kategorija == 'Tech')
          News(clanak.val());
      });
    });
  });

  document.querySelector('#Magazin').addEventListener('click', () => {
    var paras = document.getElementsByClassName('clanak');
    while (paras[0]) {
      paras[0].parentNode.removeChild(paras[0]);
    }
    database.ref('vijesti').once("value", function (snapshot) {
      snapshot.forEach((clanak)=>{
        if(clanak.val().kategorija == 'Magazin' || clanak.val().kategorija == 'Ljubimci')
          News(clanak.val());
      });
    });
  });

  document.querySelector('#Vijesti').addEventListener('click', () => {
    var paras = document.getElementsByClassName('clanak');
    while (paras[0]) {
      paras[0].parentNode.removeChild(paras[0]);
    }
    database.ref('vijesti').once("value", function (snapshot) {
      snapshot.forEach((clanak)=>{
        if(clanak.val().kategorija == 'Vijesti')
          News(clanak.val());
      });
    });
  });

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


}

