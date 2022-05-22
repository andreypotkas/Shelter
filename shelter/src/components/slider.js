import { pets } from './pets_collection';
export default function initSlider() {
  const sliderField = document.querySelector('.slider-field');
  const sliderBtns = document.querySelectorAll('.slider-btn');
  let currentPets = [];

  sliderBtns[0].onclick = () => {
    getRandomPets();
    renderRandomCards(currentPets);
    showHideFormLeft();
  };
  sliderBtns[1].onclick = () => {
    getRandomPets();
    renderRandomCards(currentPets);
    showHideFormRight();
  };

  function getRandomPets() {
    if (currentPets.length === 0) {
      pets.sort(() => Math.random() - 0.5);
      currentPets = pets.slice(0, 3);
    } else {
      const newCurrentPets = [];
      pets.forEach((item) => {
        if (!currentPets.includes(item)) {
          newCurrentPets.push(item);
        }
      });
      newCurrentPets.sort(() => Math.random() - 0.5);
      currentPets = newCurrentPets.slice(0, 3);
    }
  }

  function showHideFormLeft() {
    sliderField.classList.remove('animation-right-show');
    sliderField.classList.add('animation-left-hide');

    setTimeout(() => {
      renderRandomCards(currentPets);
      sliderField.classList.remove('animation-left-hide');
      sliderField.classList.add('animation-left-show');
    }, 200);
  }
  function showHideFormRight() {
    sliderField.classList.remove('animation-left-show');
    sliderField.classList.add('animation-right-hide');

    setTimeout(() => {
      renderRandomCards(currentPets);
      sliderField.classList.remove('animation-right-hide');
      sliderField.classList.add('animation-right-show');
    }, 200);
  }

  function renderRandomCards(pets) {
    sliderField.innerHTML = `
                    <div class="pet-card">
                        <div class="pet-img">
                            <img src=${pets[0].img}>
                        </div>
                        <p>${pets[0].name}</p>
                        <button>Learn more</button>
                    </div>
                    <div class="pet-card second">
                        <div class="pet-img">
                            <img src="${pets[1].img}" alt="Jenifer">
                        </div>
                        <p>${pets[1].name}</p>
                        <button>Learn more</button>
                    </div>
                    <div class="pet-card third">
                        <div class="pet-img">
                            <img src="${pets[2].img}" alt="Woody">
                        </div>
                        <p>${pets[2].name}</p>
                        <button>Learn more</button>
                    </div>
        `;
  }

  if (sliderField) {
    getRandomPets();
    renderRandomCards(currentPets);
  }
}
