import { pets } from './pets_collection';
export default function initPagination() {
  // Pagination
  const sliderFieldPets = document.querySelector('.slider-field-pets');
  const paginationPets = [...pets, ...pets, ...pets, ...pets, ...pets, ...pets];
  const clientWidth = document.documentElement.clientWidth;
  let startPaginationPets = [];
  let numberOfPages = 0;
  let currentPage = 0;
  renderPaginationItems(clientWidth, currentPage);
  renderPagination(currentPage, numberOfPages);
  initBtns(currentPage, numberOfPages);

  function renderPagination(currentPage, numberOfPages) {
    const pagination = document.createElement('div');
    pagination.classList.add('pagination');
    pagination.innerHTML = `
            <button id="to-first-page" disabled>&#60;&#60;</button>
            <button id="to-one-page-back" disabled>&#60;</button>
            <button class="number-page">${currentPage + 1}</button>
            <button id="to-one-page-forward">&#62;</button>
            <button id="to-last-page">&#62;&#62;</button>
    `;
    document.querySelector('.friends').append(pagination);
  }
  function initBtns(currentPage, numberOfPages) {
    const toFirstPageBtn = document.getElementById('to-first-page');
    const toLastPageBtn = document.getElementById('to-last-page');
    const toOnePageForwardBtn = document.getElementById('to-one-page-forward');
    const toOnePageBackBtn = document.getElementById('to-one-page-back');
    toFirstPageBtn.onclick = () => {
      currentPage = 0;
      console.log(currentPage);
      updatePagination(
        currentPage,
        toFirstPageBtn,
        toOnePageBackBtn,
        toOnePageForwardBtn,
        toLastPageBtn,
        clientWidth
      );
    };
    toLastPageBtn.onclick = () => {
      currentPage = numberOfPages;
      console.log(currentPage);
      updatePagination(
        currentPage,
        toFirstPageBtn,
        toOnePageBackBtn,
        toOnePageForwardBtn,
        toLastPageBtn,
        clientWidth
      );
    };
    toOnePageForwardBtn.onclick = () => {
      currentPage++;
      console.log(currentPage);
      updatePagination(
        currentPage,
        toFirstPageBtn,
        toOnePageBackBtn,
        toOnePageForwardBtn,
        toLastPageBtn,
        clientWidth
      );
    };
    toOnePageBackBtn.onclick = () => {
      currentPage--;
      console.log(currentPage);
      updatePagination(
        currentPage,
        toFirstPageBtn,
        toOnePageBackBtn,
        toOnePageForwardBtn,
        toLastPageBtn,
        clientWidth
      );
    };
  }
  function createPetCard(item) {
    const petCard = document.createElement('div');
    petCard.innerHTML = `
    <div class="pet-card">
        <div class="pet-img">
            <img src=${item.img} alt="Katrine">
        </div>
        <p>${item.name}</p>
        <button>Learn more</button>
    </div>
    `;
    return petCard;
  }
  function renderPaginationItems(width, currentPage) {
    sliderFieldPets.innerHTML = '';
    if (width >= 1280) {
      numberOfPages = 5;
      startPaginationPets = paginationPets.slice(
        currentPage * 8,
        currentPage * 8 + 8
      );
      startPaginationPets.forEach((item) => {
        sliderFieldPets.append(createPetCard(item));
      });
    }
    if (width <= 1280 && width >= 768) {
      numberOfPages = 7;
      startPaginationPets = paginationPets.slice(
        currentPage * 6,
        currentPage * 6 + 6
      );
      startPaginationPets.forEach((item) => {
        sliderFieldPets.append(createPetCard(item));
      });
      console.log(paginationPets);
      console.log(startPaginationPets);
    }
    if (width <= 768) {
      numberOfPages = 15;
      startPaginationPets = paginationPets.slice(
        currentPage * 3,
        currentPage * 3 + 3
      );
      startPaginationPets.forEach((item) => {
        sliderFieldPets.append(createPetCard(item));
      });
    }
  }
  function updatePagination(currentPage, first, back, forward, last, width) {
    let num = 0;
    if (width >= 1280) {
      num = 5;
    }
    if (width < 1280 && width >= 768) {
      num = 7;
    }
    if (width <= 768) {
      num = 15;
    }
    if (currentPage > 0) {
      first.removeAttribute('disabled');
      back.removeAttribute('disabled');
    }
    if (currentPage === 0) {
      first.setAttribute('disabled', 'disabled');
      back.setAttribute('disabled', 'disabled');
    }
    if (currentPage === num) {
      last.setAttribute('disabled', 'disabled');
      forward.setAttribute('disabled', 'disabled');
    }

    if (currentPage < num) {
      last.removeAttribute('disabled');
      forward.removeAttribute('disabled');
    }

    document.querySelector('.number-page').innerHTML = currentPage + 1;
    renderPaginationItems(clientWidth, currentPage);
  }
}
