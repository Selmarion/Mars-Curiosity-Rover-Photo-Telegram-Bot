const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Замените 'YOUR_TELEGRAM_BOT_TOKEN' на ваш токен Telegram Bot
const bot = new TelegramBot('YOUR_TELEGRAM_BOT_TOKEN', {polling: true});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Привет! «Кьюрио́сити» — марсоход третьего поколения, разработанный для исследования кратера Гейла на Марсе в рамках миссии НАСА "Марсианская научная лаборатория". Марсоход представляет собой автономную химическую лабораторию в несколько раз больше и тяжелее предыдущих марсоходов «Спирит» и «Оппортьюнити".\n\nЯ бот, который может помочь вам получить информацию о фотографиях, сделанных марсоходом Curiosity на Марсе. Просто отправьте команду /new, чтобы получить текущую фотографию с Марса.\n\nДля получения справки, используйте команду /help. \n\nВведите дату в формате ГГГГ-ММ-ДД:');
});

bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Этот бот предназначен для получения фотографий с Марса. Отправьте команду /new и введите дату в формате ГГГГ-ММ-ДД, чтобы получить фотографии за эту дату.');
});

bot.onText(/\/new/, (msg) => {
    bot.sendMessage(msg.chat.id, 'введите дату в формате ГГГГ-ММ-ДД, чтобы получить фотографии за эту дату.');
});


bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const date = msg.text;

    // Отправка запроса к API свой ключ можно получить https://api.nasa.gov/
    axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=YOUR_TELEGRAM_BOT_TOKEN`)
        .then(response => {
            const photos = response.data.photos;
            photos.forEach(photo => {
                axios.get(photo.img_src, {responseType: 'stream'})
                    .then(response => {
                        const filename = path.join('data', path.basename(photo.img_src));
                        const writer = fs.createWriteStream(filename);
                        response.data.pipe(writer);
                        writer.on('finish', () => {
                            bot.sendPhoto(chatId, filename).then(() => {
                                setTimeout(() => {
                                    fs.unlinkSync(filename);
                                }, 60000); // Увеличено время до удаления файла до 60 секунд
                            });
                        });
                    })
                    .catch(error => console.error(`Ошибка при скачивании фотографии: ${error}`));
            });
        })
        .catch(error => console.error(`Ошибка при отправке запроса к API: ${error}`));
});

// Удаление всех файлов в папке 'data' кроме файла 'keep' спустя 60 секунд
setTimeout(() => {
    fs.readdir('data', (err, files) => {
        if (err) throw err;

        for (const file of files) {
            if (file !== 'keep') {
                fs.unlink(path.join('data', file), err => {
                    if (err) throw err;
                });
            }
        }
    });
}, 60000);