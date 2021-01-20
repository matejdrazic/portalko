window.onload = async function () {
  let table = document.getElementById("table");
  let row;
  let picture;
  let content;
  let title;
  let paragraph;
  let guid;
  let category;

  const database = firebase.database();

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
    paragraph.innerHTML = cl.portal;
  }

   //search container pretrazivac
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

  //logout
  const logout = document.querySelector('#logout');
  logout.addEventListener('click', (e) => {
    auth.signOut();
    setTimeout(function(){ location.reload();}, 50)
  });

  //skrivanje i stvaranje elemenata ovisno o statusu loggedin/loggedout
  const loggedOutLink = document.querySelector('.logged-out');
  const loggedInLinks = document.querySelectorAll('.logged-in');

  //listen for auth status changes
  auth.onAuthStateChanged(user => {
    if (user) {
      //get data
      db.collection('portali').doc(user.email).get().then(snapshot_firestore => {
        console.log("Logirani korisnik " + user.email + " je odabrao ove portale :" + snapshot_firestore.data().choosen);
        setupUI(user);

        if (snapshot_firestore.data().choosen.length != 0) {
          database.ref('vijesti').once("value", function (snapshot) {
            snapshot.forEach((clanak) => {
              for (let i = 0; i < snapshot_firestore.data().choosen.length; i++) {
                if (clanak.val().portal == snapshot_firestore.data().choosen[i])
                  News(clanak.val());
              }
            });
          });

        //tabovi
        document.querySelector('#Sport').addEventListener('click', () => {
          var paras = document.getElementsByClassName('clanak');
          while (paras[0]) {
            paras[0].parentNode.removeChild(paras[0]);
          }
          database.ref('vijesti').once("value", function (snapshot) {
            snapshot.forEach((clanak) => {
              for (let i = 0; i < snapshot_firestore.data().choosen.length; i++) {
                if (clanak.val().portal == snapshot_firestore.data().choosen[i] && clanak.val().kategorija == 'Sport')
                  News(clanak.val());
              }
            });
          });
        });

        document.querySelector('#Tech').addEventListener('click', () => {
          var paras = document.getElementsByClassName('clanak');
          while (paras[0]) {
            paras[0].parentNode.removeChild(paras[0]);
          }
          database.ref('vijesti').once("value", function (snapshot) {
            snapshot.forEach((clanak) => {
              for (let i = 0; i < snapshot_firestore.data().choosen.length; i++) {
                if (clanak.val().portal == snapshot_firestore.data().choosen[i] && clanak.val().kategorija == 'Tech')
                  News(clanak.val());
              }
            });
          });
        });

        document.querySelector('#Magazin').addEventListener('click', () => {
          var paras = document.getElementsByClassName('clanak');
          while (paras[0]) {
            paras[0].parentNode.removeChild(paras[0]);
          }
          database.ref('vijesti').once("value", function (snapshot) {
            snapshot.forEach((clanak) => {
              for (let i = 0; i < snapshot_firestore.data().choosen.length; i++) {
                if (clanak.val().portal == snapshot_firestore.data().choosen[i] && clanak.val().kategorija == 'Magazin')
                  News(clanak.val());
              }
            });
          });
        });

        document.querySelector('#Vijesti').addEventListener('click', () => {
          var paras = document.getElementsByClassName('clanak');
          while (paras[0]) {
            paras[0].parentNode.removeChild(paras[0]);
          }
          database.ref('vijesti').once("value", function (snapshot) {
            snapshot.forEach((clanak) => {
              for (let i = 0; i < snapshot_firestore.data().choosen.length; i++) {
                if (clanak.val().portal == snapshot_firestore.data().choosen[i] && clanak.val().kategorija == 'Vijesti')
                  News(clanak.val());
              }
            });
          });
        });



        } else {
          database.ref('vijesti')
            .orderByChild('pubdate')
            .limitToFirst(10)
            .once("value", function (snapshot) {
              snapshot.forEach((clanak) => {
                News(clanak.val());
              });
            });

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
          
        }

        

      });



      //spremanje u bazu odabranih portala svaki put kad se stisne submit u formi
      document.querySelector("body > section > div > div > a").addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.bg-modal').style.display = 'none';
        let markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
        let odabrani = [];
        for (let i = 0; i < markedCheckbox.length; i++) {
          odabrani[i] = markedCheckbox[i].className;
        }

        console.log("Novo odabrani poratali korisnika " + user.email + " su: " + odabrani);

        // Add a new document in collection "portali"
        db.collection("portali").doc(user.email).set({
          choosen: odabrani,
        })
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });

        setTimeout(function () { location.reload(); }, 500)

      });

    } else {
      database.ref('vijesti')
        .orderByChild('pubdate')
        .limitToFirst(10)
        .once("value", function (snapshot) {
          snapshot.forEach((clanak) => {
            News(clanak.val());
          });
        });

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