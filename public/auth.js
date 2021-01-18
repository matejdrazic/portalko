//get data firestore
/*db.collection('portali').get().then(snapshot => { 
    //console.log(snapshot.docs);
    setupGuides(snapshot.docs);
});

const setupGuides = (data) => {
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      console.log(guide);
      const li = `
      <li>
        <div>${guide.title}</div>
        <div>${guide.content}</div>
      </li>
      `;

      html += li
    });

    guidList.innerHTML = html;
}
*/

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});


//skrivanje i stvaranje elemenata ovisno o statusu loggedin/loggedout
const loggedOutLink = document.querySelector('.logged-out');
const loggedInLink = document.querySelector('.logged-in');


//listen for auth status changes
auth.onAuthStateChanged(user => {
  //console.log(user);
  if (user) {
    console.log('user logged in:', user)
    setupUI(user);
  } else {
    console.log('user logged out');
    setupUI();
  }
});

const setupUI = (user) => {
  if(user) {
    // toggle UI elements
    loggedInLink.style.display = 'block';
    loggedOutLink.style.display = 'none';
  } else {
    loggedInLink.style.display = 'none';
    loggedOutLink.style.display = 'block';
  }
}

//signup
let signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = signupForm['signup-email'].value;
    const f_pass = signupForm['signup-fristPass'].value;
    const s_pass = signupForm['signup-secondPass'].value;

    //console.log(email, f_pass, s_pass);

    //sign up the user
    if (f_pass == s_pass && email.includes('@') && email.includes('.') && email.length > 5) {
        auth.createUserWithEmailAndPassword(email, s_pass).then(cred => {
            console.log(cred.user);
            signupForm.reset();
            window.location.replace('index.html');
        });
    } else {
        alert("Neispravna šifra/mail!!");
        e.preventDefault();
    }
});

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        //console.log(cred.user);
        loginForm.reset();
        window.location.replace('index.html');
    });
});

