const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}


// Add authorization

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeModalAuth = document.querySelector('.close-auth');
const loginForm = document.querySelector('#logInForm');
const loginNameInput = document.querySelector('#login')
const userName = document.querySelector('.user-name')
const buttonOut = document.querySelector('.button-out')
const warnMessage = document.querySelector('.warn-message');

let login = localStorage.getItem('Username')

const toggleModalAuth = () => {
  modalAuth.classList.toggle('is-open');
}

const authorized = () => {
  const logOut = () => {
    login = '';
    localStorage.removeItem('Username');
    console.log('oooops',localStorage.getItem('Username'));
    
    warnMessage.style.display = ''
    buttonOut.removeEventListener('click', logOut);
    buttonAuth.style.display = '';
    userName.style.display = ''
    buttonOut.style.display = '';
    checkAuth();
  }

  userName.textContent = login;

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  buttonOut.addEventListener('click', logOut);
}

const notAuthorized = () => {

  const logIn = (e) => {
    e.preventDefault();
    login = loginNameInput.value.trim();
    login ? toggleModalAuth() : warnMessage.style.display = 'block';
    localStorage.setItem('Username', login)
    buttonAuth.removeEventListener('click', toggleModalAuth);
    closeModalAuth.removeEventListener('click', toggleModalAuth);
    loginForm.removeEventListener('submit', logIn);
    loginForm.reset();
    checkAuth();
  }
  buttonAuth.addEventListener('click', toggleModalAuth);
  closeModalAuth.addEventListener('click', toggleModalAuth);
  loginForm.addEventListener('submit', logIn);
}

const checkAuth = () => login ? authorized() : notAuthorized();

checkAuth();