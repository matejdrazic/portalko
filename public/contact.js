$(document).ready(function (){
     $('.submit').click(function(){
         console.log('Clicked it!');

         let email = $('.email').val()
         let f_name = $('.name').val()
         let l_name = $('.surname').val()
         let message = $('.message').val()
         let statusElm =$('.status')
         statusElm.empty()

        if(email.length > 5 && email.includes('@') && email.includes('.')){
             statusElm.append('<div>Email is valid</div>')
         } else {
            event.preventDefault()
            statusElm.append('<div>Email is not valid</div>')
         }

        if(message.length > 20){
            statusElm.append('<div>Message is valid</div>')
        } else {
            event.preventDefault()
            statusElm.append('<div>Message is not valid</div>')
        }

        if(f_name.length >= 2){
            statusElm.append('<div>First name is valid</div>')
        } else {
            event.preventDefault()
            statusElm.append('<div>First name is not valid</div>')
        }

        if(l_name.length >= 2){
            statusElm.append('<div>Last name is valid</div>')
        } else {
            event.preventDefault()
            statusElm.append('<div>Last name is not valid</div>')
        }
     })
})

//logout
const logout = document.getElementById('logout');
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
    console.log('user logged in:', user.email)
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