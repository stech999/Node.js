// Урок 3. Модули и фреймворк Express(WIP)
// Напишите HTTP сервер на express и реализуйте два обработчика “/” и “/about”, где:

// — На каждой странице реализован счетчик просмотров
// — Значение счетчика необходимо сохранять в файл каждый раз, когда обновляется страница
// — Также значение счетчика должно загружаться из файла, когда запускается обработчик страницы
// — Таким образом счетчик не должен обнуляться каждый раз, когда перезапускается сервер.

const http = require('http');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'countPage.json');

const pageViews = {
    countMain: 0,
    countAbout: 0,
    count404: 0
};

const dataJson = fs.readFileSync(filePath, 'utf-8');
const dataResult = JSON.parse(dataJson);

const server = http.createServer((req, res) => { // функция обработчик
    console.log('Запрос получен');

    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });

        fs.writeFileSync(filePath, JSON.stringify(pageViews, 2));
        pageViews.countMain = dataResult.countMain;

        res.end(`<h1> Добро пожаловать на мой сайт!</h1>
        <h3>Просмотров: ${dataResult.countMain}</h3>
        <h2>Корневая страница</h2>
        <a href="/about">Ссылка на страницу "about"</a>`)

        dataResult.countMain++;
    } else if (req.url === '/about') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        fs.writeFileSync(filePath, JSON.stringify(pageViews, 2));
        pageViews.countAbout = dataResult.countAbout;

        res.end(`<h2>Cтраница about</h2>
        <h3>Просмотров: ${dataResult.countAbout}</h3>
        <a href="/">Ссылка на страницу "/"</a>`)

        dataResult.countAbout++;
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=UTF-8',
        });

        fs.writeFileSync(filePath, JSON.stringify(pageViews, 2));
        pageViews.count404 = dataResult.count404;

        res.end(`<h3>Просмотров: ${dataResult.count404}</h3>
        <h1>Страница не найдена!</h1>`)
        dataResult.count404++;
    }
})

const port = 3000;

server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
})