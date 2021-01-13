
const registration = document.querySelector('.submit').addEventListener('click', (e) => {
    const emailReg = document.querySelector('.emailReg').value;
    const passOne = document.querySelector('.firstPass').value;
    const passTwo = document.querySelector('.secondPass').value;

    auth.createUserWithEmailAndPassword(emailReg, passOne).then(cred => {
        
        
        console.log(cred);
    });
});

const login = document.querySelector('.prijava').addEventListener('click', (e) => {
    let email = document.querySelector('.email').value;
    let password = document.querySelector('.password').value;
    console.log(password);
});