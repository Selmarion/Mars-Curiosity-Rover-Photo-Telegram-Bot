# Используем легкий образ Node.js 14 на основе Alpine Linux
FROM node:14-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код в контейнер
COPY . .

# Экспонируем порт 3050, на котором будет работать приложение
EXPOSE 3050

# Запускаем бот
CMD ["node", "NASA_bot.js"]
