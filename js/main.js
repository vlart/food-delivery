'use-strict';

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeModalAuth = document.querySelector('.close-auth');
const loginForm = document.querySelector('#logInForm');
const loginNameInput = document.querySelector('#login')
const userName = document.querySelector('.user-name')
const buttonOut = document.querySelector('.button-out')
const warnMessage = document.querySelector('.warn-message');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('Username');



function toggleModal() {
  modal.classList.toggle("is-open");
}

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


const createCardRestaurant = () => {
  const card = `
    <a class="card card-restaurant">
      <img src="img/pizza-burger/preview.jpg" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">PizzaBurger</h3>
          <span class="card-tag tag">45 мин</span>
        </div>
        <div class="card-info">
          <div class="rating">
            4.5
          </div>
          <div class="price">От 700 ₽</div>
          <div class="category">Пицца</div>
        </div>
      </div>
    </a>
  `;

  cardsRestaurants.insertAdjacentHTML('afterbegin', card);
}

createCardRestaurant()

const createCartGood = () => {
  const card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML('beforeend', `
      <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg">Пицца Классика</h3>
        </div>
        <div class="card-info">
          <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
            грибы.
          </div>
        </div>
        <div class="card-buttons">
          <button class="button button-primary button-add-cart">
            <span class="button-card-text">В корзину</span>
            <span class="button-cart-svg"></span>
          </button>
          <strong class="card-price-bold">510 ₽</strong>
        </div>
      </div>
  `);

  cardsMenu.insertAdjacentElement('beforeend', card);
}

const openGoods = (e) => {
  const target = e.target;
  const restaurant = target.closest('.card-restaurant');

  if (restaurant) {
    cardsMenu.textContent = ''

    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');
    
    createCartGood();
    createCartGood();
    createCartGood();
  }
  
}



cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

cardsRestaurants.addEventListener('click', openGoods);

logo.addEventListener('click', function(){
  containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
})

