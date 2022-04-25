import './style.scss'
import { pets } from './pets';
// Slider
const sliderField = document.querySelector('.slider-field');
const sliderFieldPets = document.querySelector('.slider-field-pets');
const sliderBtns = document.querySelectorAll('.slider-btn');
let currentPets = [];


sliderBtns[0].onclick = () =>{
    getRandomPets();
    renderRandomCards(currentPets);
    showHideFormLeft();
}
sliderBtns[1].onclick = () =>{
    getRandomPets();
    renderRandomCards(currentPets);
    showHideFormRight();
}

function getRandomPets(){
        if(currentPets.length === 0){
            pets.sort(() => Math.random() - 0.5);
            currentPets = pets.slice(0, 3);
        } else {
            const newCurrentPets = [];
            pets.forEach((item) => {
                if(!currentPets.includes(item)){
                    newCurrentPets.push(item);
                }
            });
            newCurrentPets.sort(() => Math.random() - 0.5);
            currentPets = newCurrentPets.slice(0, 3);
        }
};

function showHideFormLeft(){
    sliderField.classList.remove('animation-right-show');
    sliderField.classList.add('animation-left-hide');
    
    setTimeout(()=>{
        renderRandomCards(currentPets);
        sliderField.classList.remove('animation-left-hide');
        sliderField.classList.add('animation-left-show');
     }, 200);
}
function showHideFormRight(){
    sliderField.classList.remove('animation-left-show');
    sliderField.classList.add('animation-right-hide');
    
    setTimeout(()=>{
        renderRandomCards(currentPets);
        sliderField.classList.remove('animation-right-hide');
        sliderField.classList.add('animation-right-show');
     }, 200);
}

function renderRandomCards(pets){
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
};

if(sliderField){
    getRandomPets();
    renderRandomCards(currentPets);
}
//Burger
const burgerMenuBtn = document.getElementById('burger-menu');
const navigation = document.getElementById('navigation');
const wrap = document.getElementById('wrap');
const petCards = document.querySelectorAll('.pet-card');
let isPopupHidden = true;
let isNavHidden = true;

document.addEventListener('click', () => {
    if (!isPopupHidden){
        closePopup();
    }

    if(!isNavHidden){
        hide();
    }
});
burgerMenuBtn.addEventListener('click', toggleNav);

function toggleNav(){
    navigation.classList.contains('show-nav') ? hide() : show();
}
function hide(){
    navigation.classList.remove('show-nav');
    burgerMenuBtn.classList.remove('burger-rotate');
    wrap.classList.remove('stop-scroll');
    document.body.classList.remove('stop-scroll');
    isNavHidden = true;
}
function show(){
    navigation.classList.add('show-nav');
    burgerMenuBtn.classList.add('burger-rotate');
    wrap.classList.add('stop-scroll');
    document.body.classList.add('stop-scroll');
    setTimeout(()=>{
        isNavHidden = false;
    }, 500)
}
petCards.forEach((item, index) => {
    item.onclick = function(){
        openCard(pets[index], item);
    };
});
function openCard(item, card){
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
function closePopup(){
    isPopupHidden = true;
    wrap.classList.remove('stop-scroll');
    document.body.classList.remove('stop-scroll');
    document.querySelector('.pet-card-popup').remove();
}
// Pagination
const paginationPets = [...pets, ...pets, ...pets, ...pets, ...pets, ...pets];
const clientWidth = document.documentElement.clientWidth;
let startPaginationPets = [];
let numberOfPages = 0;
let currentPage = 0;
renderPaginationItems(clientWidth, currentPage);
renderPagination(currentPage, numberOfPages);
initBtns(currentPage, numberOfPages);

function renderPagination(currentPage, numberOfPages){
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
function initBtns(currentPage, numberOfPages){
    const toFirstPageBtn = document.getElementById('to-first-page');
    const toLastPageBtn = document.getElementById('to-last-page');
    const toOnePageForwardBtn = document.getElementById('to-one-page-forward');
    const toOnePageBackBtn = document.getElementById('to-one-page-back');
    toFirstPageBtn.onclick = () => {
        currentPage = 0;
        console.log(currentPage);
        updatePagination(currentPage, toFirstPageBtn, toOnePageBackBtn, toOnePageForwardBtn, toLastPageBtn, clientWidth);
    }
    toLastPageBtn.onclick = () => {
        currentPage = numberOfPages;
        console.log(currentPage);
        updatePagination(currentPage, toFirstPageBtn, toOnePageBackBtn, toOnePageForwardBtn, toLastPageBtn, clientWidth);
    }
    toOnePageForwardBtn.onclick = () => {
        currentPage++;
        console.log(currentPage);
        updatePagination(currentPage, toFirstPageBtn, toOnePageBackBtn, toOnePageForwardBtn, toLastPageBtn, clientWidth);
    }
    toOnePageBackBtn.onclick = () => {
        currentPage--;
        console.log(currentPage);
        updatePagination(currentPage, toFirstPageBtn, toOnePageBackBtn, toOnePageForwardBtn, toLastPageBtn, clientWidth);
    }
}
function createPetCard(item){
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
function renderPaginationItems(width, currentPage){
    sliderFieldPets.innerHTML = '';
    if(width >= 1280){
        numberOfPages = 5;
        startPaginationPets = paginationPets.slice(currentPage * 8, currentPage * 8 + 8);
        startPaginationPets.forEach((item) => {
            sliderFieldPets.append(createPetCard(item));
        });
        
    }
    if(width <= 1280 && width >= 768){
        numberOfPages = 7;
        startPaginationPets = paginationPets.slice(currentPage * 6, currentPage * 6 + 6);
        startPaginationPets.forEach((item) => {
            sliderFieldPets.append(createPetCard(item));
        });
        console.log(paginationPets);
        console.log(startPaginationPets);
    }
    if( width <= 768){
        numberOfPages = 15;
        startPaginationPets = paginationPets.slice(currentPage * 3, currentPage * 3 + 3);
        startPaginationPets.forEach((item) => {
            sliderFieldPets.append(createPetCard(item));
        });
    }
}
function updatePagination(currentPage, first, back, forward, last, width){
    let num = 0;
    if(width >= 1280){
        num = 5
    }
    if(width < 1280 && width >= 768){
        num = 7
    }
    if(width <= 768){
        num = 15
    }
    if(currentPage > 0){
        first.removeAttribute("disabled");
        back.removeAttribute("disabled");
    }
    if(currentPage === 0){
        first.setAttribute("disabled", "disabled");
        back.setAttribute("disabled", "disabled");
    }
    if(currentPage === num){
       last.setAttribute("disabled", "disabled");
       forward.setAttribute("disabled", "disabled");
    }

    if(currentPage < num){
        last.removeAttribute("disabled");
        forward.removeAttribute("disabled");
    }

    document.querySelector('.number-page').innerHTML = currentPage+1;
    renderPaginationItems(clientWidth, currentPage);
}

