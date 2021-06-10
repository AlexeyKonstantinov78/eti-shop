'use strict';

let url = 'https://etipro.ru';

function getItemsCard(url) {
    let http = new XMLHttpRequest();
    http.withCredentials = true;

    http.open('GET', url, true);  // составить асинхронный (по умолчанию true) GET запрос страницы

    http.onreadystatechange = function () {  // обратная связь: отдаёт ответ на запрос
        console.log(this.readyState);
        console.log(this.status);

        if (this.readyState == 4 && this.status == 200) {  // отследить момент, когда пришёл полный ответ
            console.log(this.responseText);  // this.responseText — ответ в виде текста
        }
    }

    http.send(null);  // отправить запрос
};


async function getHttp(url) {
    let res = await fetch(url, {
        credentials: "include"
    }
    );
    console.log(res.ok);

};

fetch(
    url,
    {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
    }

)
    .then(resp => resp.text())
    .then(console.log);


console.log('привет');
getItemsCard(url);
getHttp(url);


