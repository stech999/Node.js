// Домашнее задание №1
// Напишите HTTP сервер и реализуйте два обработчика, где:
// - По URL “/” будет возвращаться страница, на которой есть гиперссылка на
// вторую страницу по ссылке “/about”
//     - А по URL “/about” будет возвращаться страница, на которой есть гиперссылка
// на первую страницу “/”
//     - Также реализуйте обработку несуществующих роутов(404).
// * На каждой странице реализуйте счетчик просмотров.Значение счетчика
// должно увеличиваться на единицу каждый раз, когда загружается страница


const http = require('http');
const pageViews = {
    countMain: 0,
    countAbout: 0,
    count404: 0
};
// let countMain = 0;
// let countAbout = 0;
// let count404 = 0;
const server = http.createServer((req, res) => { // функция обработчик
    console.log('Запрос получен');
    
    if (req.url === '/') {
        pageViews.countMain++;
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        
        res.end(`<h1> Добро пожаловать на мой сайт!</h1>
        <h3>Просмотров: ${pageViews.countMain}</h3>
        <h2>Корневая страница</h2>
        <a href="/about">Ссылка на страницу "about"</a>`)
    } else if (req.url === '/about') {
        pageViews.countAbout++;
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });

        res.end(`<h2>Cтраница about</h2>
        <h3>Просмотров: ${pageViews.countAbout}</h3>
        <a href="/">Ссылка на страницу "/"</a>`)
    } else {
        pageViews.count404++;
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.end(`<h3>Просмотров: ${pageViews.count404}</h3>
        <h1>Страница не найдена!</h1>`)
    }
})

const port = 3000;

server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
})

