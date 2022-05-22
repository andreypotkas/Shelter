export default function initBurgerMenu() {
  //Burger
  const burgerMenuBtn = document.getElementById('burger-menu');
  const navigation = document.getElementById('navigation');
  const wrap = document.getElementById('wrap');
  const petCards = document.querySelectorAll('.pet-card');
  let isPopupHidden = true;
  let isNavHidden = true;

  document.addEventListener('click', () => {
    if (!isPopupHidden) {
      closePopup();
    }

    if (!isNavHidden) {
      hide();
    }
  });
  burgerMenuBtn.addEventListener('click', toggleNav);

  function toggleNav() {
    navigation.classList.contains('show-nav') ? hide() : show();
  }
  function hide() {
    navigation.classList.remove('show-nav');
    burgerMenuBtn.classList.remove('burger-rotate');
    wrap.classList.remove('stop-scroll');
    document.body.classList.remove('stop-scroll');
    isNavHidden = true;
  }
  function show() {
    navigation.classList.add('show-nav');
    burgerMenuBtn.classList.add('burger-rotate');
    wrap.classList.add('stop-scroll');
    document.body.classList.add('stop-scroll');
    setTimeout(() => {
      isNavHidden = false;
    }, 500);
  }
  petCards.forEach((item, index) => {
    item.onclick = function () {
      openCard(pets[index], item);
    };
  });
  function openCard(item, card) {
    const container = document.createElement('div');
    container.classList.add('pet-card-popup');
    container.innerHTML = `
    <div class="close-card">
        <button onclick(closePopup) class="close-card-btn">&#10006;</button>
    </div>
    <div class="card-content">
        <div class="card-img">
            <img src=${item.img} alt="s"/>
        </div>
        <div class="card-description">
            <div class="card-name">
                <h2>${item.name}</h2>
                <h3>${item.type} - ${item.breed}</h3>
            </div>
            
                <div class="card-descr1">
                    ${item.description}
                </div>
                <div class="card-descr2">
                    <ul>
                        <li>Age: ${item.age}</li>
                        <li>Inoculations: ${item.inoculations}</li>
                        <li>Diseases: ${item.diseases}</li>
                        <li>Parasites: ${item.parasites}</li>
                    </ul>
                </div>
            
        </div>
    </div>
    `;
    wrap.classList.add('stop-scroll');
    document.body.classList.add('stop-scroll');
    card.parentNode.append(container);
    setTimeout(() => {
      isPopupHidden = false;
    }, 500);
  }
  function closePopup() {
    isPopupHidden = true;
    wrap.classList.remove('stop-scroll');
    document.body.classList.remove('stop-scroll');
    document.querySelector('.pet-card-popup').remove();
  }
}
