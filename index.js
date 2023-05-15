const express = require('express');
const cookieParser = require('cookie-parser');

// Создаем приложение
const app = express();

// Отключение CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // Для запросов типа OPTIONS отправляем только заголовки и статус 204 No Content
  if (req.method === 'OPTIONS') {
    res.send(204);
  } else {
    next();
  }
});

// Используем middleware для парсинга cookie
app.use(cookieParser());

// Обработчик для страницы входа
app.post('/login', (req, res) => {
  // Получаем данные пользователя из формы
  console.log(req.query);
  const { username, password } = req.query;

  // Проверяем, что пароль совпадает
  if (password === '1') {
    // Устанавливаем cookie с именем пользователя
    res.cookie('username', username, { maxAge: 3600000 });
    res.send('RIGHT PASSWORD');
  } else {
    res.send('WRONG PASSWORD');
  }
});

// Обработчик для страницы выхода
app.post('/logout', (req, res) => {
  // Удаляем cookie с именем пользователя
  res.clearCookie('username');
  res.send('LOGOUT SUCCESS');
});

// Запускаем сервер
app.listen(3000, () => {
  console.log('Сервер запущен!');
});
