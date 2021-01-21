window.onload = async function () {
  let table = document.getElementById("table");

  const database = firebase.database();

  function News(cl) {

    let vrijeme = new Date();
    let sada = vrijeme.getTime();
    let vrijemeIzdavanjaUMS = sada - cl.pubdate;
    let vrijemeIzdavanjeUM = (vrijemeIzdavanjaUMS / 60000);
    //console.log(Math.round(vrijemeIzdavanjeUM))
    let mathRound = Math.round(vrijemeIzdavanjeUM);

    table.innerHTML += `
    <a href=${cl.link} target='blank' onClick=''>
    <div class="clanak">
    <div id="slika-clanka">
    ${cl.content.url ? `<img src=${cl.content.url} />` : cl.content}
    </div>
    <div id="sadrzaj-clanka"><h2 id="naslov-clanka">${cl.naslov}</h2>
    <p id="opis-clanka">${cl.portal}      ${mathRound} min</p>
    <small id="kategorija-clanka">${cl.kategorija}</small>
    </div>
    </div>
    </a>`
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
          table.innerHTML = "";
          database.ref('vijesti')
            .orderByChild('pubdate')
            .once("value", function (snapshot) {
              snapshot.forEach((clanak) => {
                for (let i = 0; i < snapshot_firestore.data().choosen.length; i++) {
                  if (clanak.val().portal == snapshot_firestore.data().choosen[i] && (clanak.val().kategorija == 'Sport' || clanak.val().kategorija[0] == 'Sport'))
                    News(clanak.val());
                }
              });
            });
        });

        document.querySelector('#Tech').addEventListener('click', () => {
          table.innerHTML = "";
          database.ref('vijesti')
            .orderByChild('pubdate')
            .once("value", function (snapshot) {
              snapshot.forEach((clanak) => {
                for (let i = 0; i < snapshot_firestore.data().choosen.length; i++) {
                  if (clanak.val().portal == snapshot_firestore.data().choosen[i] && (clanak.val().kategorija == 'Tech' || clanak.val().kategorija[0] == 'Tehnologije' || clanak.val().kategorija[0] == 'Znanost'))
                    News(clanak.val());
                }
              });
            });
        });

        document.querySelector('#Magazin').addEventListener('click', () => {
          table.innerHTML = "";
          database.ref('vijesti')
          .orderByChild('pubdate')
          .once("value", function (snapshot) {
            snapshot.forEach((clanak) => {
              for (let i = 0; i < snapshot_firestore.data().choosen.length; i++) {
                if (clanak.val().portal == snapshot_firestore.data().choosen[i] && (clanak.val().kategorija[0] == 'Život' || clanak.val().kategorija == 'Ljubimci' || clanak.val().kategorija[0] == 'Magazin'))
                  News(clanak.val());
              }
            });
          });
        });

        document.querySelector('#Vijesti').addEventListener('click', () => {
          table.innerHTML = "";
          database.ref('vijesti')
          .orderByChild('pubdate')
          .once("value", function (snapshot) {
            snapshot.forEach((clanak) => {
              for (let i = 0; i < snapshot_firestore.data().choosen.length; i++) {
                if (clanak.val().portal == snapshot_firestore.data().choosen[i] && (clanak.val().kategorija == 'Vijesti' || clanak.val().kategorija[0] == 'Politika & Kriminal' || clanak.val().kategorija[0] == 'Hrvatska'))
                  News(clanak.val());
              }
            });
          });
        });

        document.querySelector('#Showbiz').addEventListener('click', () => {
          table.innerHTML = "";
          database.ref('vijesti')
          .orderByChild('pubdate')
          .once("value", function (snapshot) {
            snapshot.forEach((clanak) => {
              for (let i = 0; i < snapshot_firestore.data().choosen.length; i++) {
                if (clanak.val().portal == snapshot_firestore.data().choosen[i] && (clanak.val().kategorija == 'Lifestyle' || clanak.val().kategorija == 'Show'))
                  News(clanak.val());
              }
            });
          });
        });

        document.querySelector('#Biznis').addEventListener('click', () => {
          table.innerHTML = "";
          database.ref('vijesti')
          .orderByChild('pubdate')
          .once("value", function (snapshot) {
            snapshot.forEach((clanak) => {
              for (let i = 0; i < snapshot_firestore.data().choosen.length; i++) {
                if (clanak.val().portal == snapshot_firestore.data().choosen[i] && (clanak.val().kategorija[0] == 'Biznis' || clanak.val().kategorija == 'Biznis'))
                  News(clanak.val());
              }
            });
          });
        });



        } else {
          database.ref('vijesti')
            .orderByChild('pubdate')
            .limitToLast(18)
            .once("value", function (snapshot) {
              snapshot.forEach((clanak) => {
                News(clanak.val());
              });
            });

            document.querySelector('#Sport').addEventListener('click', () => {
              table.innerHTML = "";
              database.ref('vijesti')
                .orderByChild('pubdate')
                .once("value", function (snapshot) {
                  snapshot.forEach((clanak) => {
                    if (clanak.val().kategorija == 'Sport' || clanak.val().kategorija[0] == 'Sport')
                      News(clanak.val());
                  });
                });
            });
    
            document.querySelector('#Tech').addEventListener('click', () => {
              table.innerHTML = "";
              database.ref('vijesti')
                .orderByChild('pubdate')
                .once("value", function (snapshot) {
                  snapshot.forEach((clanak) => {
                    if (clanak.val().kategorija == 'Tech' || clanak.val().kategorija[0] == 'Tehnologije' || clanak.val().kategorija[0] == 'Znanost')
                      News(clanak.val());
                  });
                });
            });
    
            document.querySelector('#Magazin').addEventListener('click', () => {
              table.innerHTML = "";
              database.ref('vijesti')
              .orderByChild('pubdate')
              .once("value", function (snapshot) {
                snapshot.forEach((clanak) => {
                  if (clanak.val().kategorija[0] == 'Život' || clanak.val().kategorija == 'Ljubimci' || clanak.val().kategorija[0] == 'Magazin')
                    News(clanak.val());
                });
              });
            });
    
            document.querySelector('#Vijesti').addEventListener('click', () => {
              table.innerHTML = "";
              database.ref('vijesti')
              .orderByChild('pubdate')
              .once("value", function (snapshot) {
                snapshot.forEach((clanak) => {
                    if (clanak.val().kategorija == 'Vijesti' || clanak.val().kategorija[0] == 'Politika & Kriminal' || clanak.val().kategorija[0] == 'Hrvatska')
                      News(clanak.val());
                });
              });
            });
    
            document.querySelector('#Showbiz').addEventListener('click', () => {
              table.innerHTML = "";
              database.ref('vijesti')
              .orderByChild('pubdate')
              .once("value", function (snapshot) {
                snapshot.forEach((clanak) => {
                    if (clanak.val().kategorija == 'Lifestyle' || clanak.val().kategorija == 'Show')
                      News(clanak.val());
                });
              });
            });
    
            document.querySelector('#Biznis').addEventListener('click', () => {
              table.innerHTML = "";
              database.ref('vijesti')
              .orderByChild('pubdate')
              .once("value", function (snapshot) {
                snapshot.forEach((clanak) => {
                    if (clanak.val().portal == snapshot_firestore.data().choosen[i] && (clanak.val().kategorija[0] == 'Biznis' || clanak.val().kategorija == 'Biznis'))
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
      .limitToLast(18)
      .once("value", function (snapshot) {
        snapshot.forEach((clanak) => {
          News(clanak.val());
        });
      });

      document.querySelector('#Sport').addEventListener('click', () => {
        table.innerHTML = "";
        database.ref('vijesti')
          .orderByChild('pubdate')
          .once("value", function (snapshot) {
            snapshot.forEach((clanak) => {
              if (clanak.val().kategorija == 'Sport' || clanak.val().kategorija[0] == 'Sport')
                News(clanak.val());
            });
          });
      });

      document.querySelector('#Tech').addEventListener('click', () => {
        table.innerHTML = "";
        database.ref('vijesti')
          .orderByChild('pubdate')
          .once("value", function (snapshot) {
            snapshot.forEach((clanak) => {
              if (clanak.val().kategorija == 'Tech' || clanak.val().kategorija[0] == 'Tehnologije' || clanak.val().kategorija[0] == 'Znanost')
                News(clanak.val());
            });
          });
      });

      document.querySelector('#Magazin').addEventListener('click', () => {
        table.innerHTML = "";
        database.ref('vijesti')
        .orderByChild('pubdate')
        .once("value", function (snapshot) {
          snapshot.forEach((clanak) => {
            if (clanak.val().kategorija[0] == 'Život' || clanak.val().kategorija == 'Ljubimci' || clanak.val().kategorija[0] == 'Magazin')
              News(clanak.val());
          });
        });
      });

      document.querySelector('#Vijesti').addEventListener('click', () => {
        table.innerHTML = "";
        database.ref('vijesti')
        .orderByChild('pubdate')
        .once("value", function (snapshot) {
          snapshot.forEach((clanak) => {
              if (clanak.val().kategorija == 'Vijesti' || clanak.val().kategorija[0] == 'Politika & Kriminal' || clanak.val().kategorija[0] == 'Hrvatska')
                News(clanak.val());
          });
        });
      });

      document.querySelector('#Showbiz').addEventListener('click', () => {
        table.innerHTML = "";
        database.ref('vijesti')
        .orderByChild('pubdate')
        .once("value", function (snapshot) {
          snapshot.forEach((clanak) => {
              if (clanak.val().kategorija == 'Lifestyle' || clanak.val().kategorija == 'Show')
                News(clanak.val());
          });
        });
      });

      document.querySelector('#Biznis').addEventListener('click', () => {
        table.innerHTML = "";
        database.ref('vijesti')
        .orderByChild('pubdate')
        .once("value", function (snapshot) {
          snapshot.forEach((clanak) => {
              if (clanak.val().kategorija[0] == 'Biznis' || clanak.val().kategorija == 'Biznis')
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