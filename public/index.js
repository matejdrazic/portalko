window.onload = async function () {       
  let table = document.getElementById("table");
  let counter = 150;
  let row;
  let picture;
  let content;
  let title;
  let paragraph;
  let guid;
  let category;

    const database = firebase.database();
    dohvatDesetClanaka();
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

  //search container pretrazivac
  document.querySelector("#search-box").addEventListener("keyup", e => {
    let query = e.currentTarget.value;

    let cards = document.querySelectorAll(".clanak #sadrzaj-clanka");
    for( let card of cards) {
      if (card.textContent.toUpperCase().indexOf(query.toUpperCase()) >= 0){
        card.parentElement.style.display = "block";
      } else {
        card.parentElement.style.display = "none";    
      }
    }
  });

  let loadMore = document.querySelector("#ucitaj-jos").addEventListener('click', e => {
    dohvatDesetClanaka();
  });

  //logout
  const logout = document.querySelector('#logout');
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
  });

  
  //skrivanje i stvaranje elemenata ovisno o statusu loggedin/loggedout
  const loggedOutLink = document.querySelector('.logged-out');
  const loggedInLinks = document.querySelectorAll('.logged-in');


  //listen for auth status changes
  auth.onAuthStateChanged(user => {
    if (user) {
      //get data
      db.collection('portali').doc(user.email).get().then(snapshot => { 
        console.log("Logirani korisnik " + user.email + " je odabrao ove portale :" + snapshot.data().choosen);
        setupUI(user);
      });


      //spremanje u bazu odabranih portala svaki put kad se stisne submit u formi
      document.querySelector("body > section > div > div > a").addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.bg-modal').style.display = 'none';
        let markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
        let odabrani = [];
        for(let i = 0; i < markedCheckbox.length; i++) {
          odabrani[i] = markedCheckbox[i].className;
        }

        console.log("Novo odabrani poratali korisnika " + user.email + " su: " + odabrani);

        // Add a new document in collection "cities"
        db.collection("portali").doc(user.email).set({
          choosen: odabrani,
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });

      });

    } else {
      console.log('User logged out');
      setupUI();
    }
  });

  //funkcija koja miče/dodaje botune ovisno o tome jeli iko logiran
  const setupUI = (user) => {
    if(user) {
      // toggle UI elements
      loggedInLinks.forEach(item => item.style.display = "block");
      loggedOutLink.style.display = 'none';
    } else {
      loggedInLinks.forEach(item => item.style.display = "none");
      loggedOutLink.style.display = 'block';
    }
  }


  //forma za izbor portala
  document.getElementById('button').addEventListener('click', function() {
    document.querySelector('.bg-modal').style.display = 'flex';
  });

  document.querySelector("body > section > div > div > i").addEventListener('click', function() {
    document.querySelector('.bg-modal').style.display = 'none';
  });

  

}
