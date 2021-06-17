'use strict';

let bottomUpArrow = document.querySelector('.bottomUpArrow'),
    main = document.querySelector('.main'),
    itemCard = main.querySelectorAll('.item-card'),
    arr = [];

const bottomToggle = () => {
    bottomUpArrow.classList.toggle('bottomActiv');
};

const searchElemP = () => {
    let p = main.querySelector('.container>h2');

    if (p) {
        let classP = p.className,
            contentP = p.textContent;

        return { classP, contentP };
    }
};

// рендер входит до 3 вложения дальше ошибка
const render = (naimId, sbros = false) => {
    let dbLoop = '',
        dbLoopTitle = '',
        ahref = '#',
        breadCrumsContent = '';

    if (searchElemP() && sbros != true) {

        let arr = searchElemP();
        breadCrumsContent = arr.contentP;
        dbLoop = dataDb[arr.classP]['items'][naimId]['items'];
        dbLoopTitle = dataDb[arr.classP]['items'][naimId]['name'];

    } else {
        arr = [];
        dbLoop = dataDb[naimId]['items'];
        dbLoopTitle = dataDb[naimId]['name'];
    }

    main.textContent = '';
    main = document.querySelector('.main');

    let breadCrumsHome = document.createElement('div');
    breadCrumsHome.innerHTML = `
            <div class="breadcrumbs-home container"><a href="/index.html">Все товары</a></div>
            `;

    let conteainer = document.createElement('div');
    conteainer.classList.add('container');

    let breadCrums = document.createElement('h2');
    breadCrums.classList.add(naimId);

    if (breadCrumsContent) {
        breadCrums.textContent = breadCrumsContent + ` > ` + dbLoopTitle;
    } else {
        breadCrums.textContent = dbLoopTitle;
    }


    let row = document.createElement('div');
    row.classList.add('row', 'justify-content-start', 'items');

    for (let key in dbLoop) {

        if (dbLoop[key].URL) {
            ahref = dbLoop[key].URL;
        }

        row.innerHTML += `
            <div class="col-6 col-sm-4 col-md-3 col-xl-2 item-card">
                <div class="item" id="${key}">
                    <a href="${ahref}">
                        <div class="item-img">
                            <img src="${dbLoop[key].img}" loading="lazy" alt="${dbLoop[key].name}">
                        </div>
                        <hr>
                        <div class="item-title">
                            <h3>${dbLoop[key].name}</h3>
                        </div>
                    </a>
                </div>            
            </div>
            `;
    }

    conteainer.append(breadCrums);
    conteainer.append(row);
    main.append(breadCrumsHome);
    main.append(conteainer);
    if (ahref === '#') addEventCart();
    addEventP();
};

// СОБЫТИЯ 
// скрол появление кнопки 
document.addEventListener('scroll', () => {

    if (window.scrollY >= 500) {

        if (!bottomUpArrow.classList.contains('bottomActiv')) {
            bottomToggle();
        }
    } else {
        if (bottomUpArrow.classList.contains('bottomActiv')) {
            bottomToggle();
        }
    }
});

// плавное прокручивание кнопки до якоря
bottomUpArrow.addEventListener('click', function (e) {
    e.preventDefault();

    const blockID = 'sumb';

    document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// функция запуска слушателя на карточку
function addEventCart() {
    itemCard = main.querySelectorAll('.item-card');

    itemCard.forEach(item => {
        item.addEventListener('click', (event) => {
            if (item.querySelector('.item').id) {
                event.preventDefault();
                let naimId = item.querySelector('.item').id;
                render(naimId);
            }
        });
    });
}

// функция запуска слушателя на на наличие p тега хлебных крох
function addEventP() {
    let paragrof = main.querySelector('.container>h2');

    if (paragrof) {
        arr.push(paragrof.className);

    } else {
        arr = [];
    }

    if (arr.length > 1) {
        paragrof.style.cursor = "pointer";
        paragrof.addEventListener('click', (e) => {
            e.preventDefault();
            // arr.pop();
            render(arr[0], true);

        });
    } else {
        paragrof.style.cursor = "";
    }
}

addEventCart();