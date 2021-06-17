'use strict';

let divRow = document.querySelectorAll('.col.mb-4'),
    arr = {},
    massiv = [];

function translit(word) {
    let converter = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
        'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
        'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
        'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
        'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch',
        'ш': 'sh', 'щ': 'sch', 'ь': '', 'ы': 'y', 'ъ': '',
        'э': 'e', 'ю': 'yu', 'я': 'ya'
    };

    word = word.toLowerCase();

    var answer = '';
    for (var i = 0; i < word.length; ++i) {
        if (converter[word[i]] == undefined) {
            answer += word[i];
        } else {
            answer += converter[word[i]];
        }
    }

    answer = answer.replace(/[^-0-9a-z]/g, '-');
    answer = answer.replace(/[-]+/g, '-');
    answer = answer.replace(/^\-|-$/g, '');
    return answer;
}

//console.log(divRow);

divRow.forEach((item) => {
    arr = {};
    //console.log(item);
    // console.log(name);
    // console.log(img);
    // console.log(url);
    // console.log(nameTraslit);

    let name = item.querySelector('a>.card>.card-footer>div>h6').textContent,
        nameTraslit = translit(name),
        url = 'https://etipro.ru' + item.querySelector('a').getAttribute('href'),
        img = item.querySelector('a>.card>.card_category_image>img').getAttribute('src');



    arr['name'] = name;
    arr['nameTranslit'] = nameTraslit;
    arr['img'] = img;
    arr['URL'] = url;


    massiv.push(arr);
});

// console.log(massiv);

let json = JSON.stringify(massiv);

console.log(json);



