// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Подключение к MongoDB
mongoose.connect('https://sokolovwebs.github.io/Profi-Groomer//api/reviews', { useNewUrlParser: true, useUnifiedTopology: true });

// Определение схемы для отзывов
const reviewSchema = new mongoose.Schema({
    author: String,
    text: String
});

const Review = mongoose.model('Review', reviewSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Эндпоинты
app.get('/api/reviews', async (req, res) => {
    const reviews = await Review.find();
    res.json(reviews);
});

app.post('/api/reviews', async (req, res) => {
    const review = new Review(req.body);
    await review.save();
    res.status(201).send(review);
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});



const correctPassword = '54321!';
const deletePassword = 'DelAut!';
let isAuthorized = false;
let userName = '';

// Функция для загрузки отзывов с сервера
async function loadReviews() {
    const response = await fetch('https://sokolovwebs.github.io/Profi-Groomer/api/reviews'); // измените на ваш адрес сервера
    const storedReviews = await response.json();
    const reviewsDiv = document.getElementById('reviews');

    storedReviews.forEach(({ author, text }) => {
        const review = document.createElement('div');
        review.className = 'review';

        const authorDiv = document.createElement('div');
        authorDiv.className = 'author';
        authorDiv.textContent = author;

        review.textContent = text;
        review.prepend(authorDiv);
        reviewsDiv.appendChild(review);

        // Переменная для отслеживания количества нажатий
        let clickCount = 0;
        const clickLimit = 5; // Требуемое количество нажатий для удаления

        // Удаление отзыва при тройном нажатии
        review.onclick = function () {
            clickCount++;
            if (clickCount === clickLimit) {
                const passwordForDeletion = prompt("Введите пароль для удаления отзыва:");
                if (passwordForDeletion === deletePassword) {
                    // Удаление отзыва из базы данных
                    // Необходимо реализовать логику для удаления отзыва с сервера
                } else {
                    alert('Неверный пароль!');
                }
                // Сброс счётчика
                clickCount = 0;
            }

            // Сбрасываем счётчик через 1 секунду, если не было третьего нажатия
            setTimeout(() => {
                clickCount = 0;
            }, 1000);
        };
    });
}

// Авторизация пользователя
document.getElementById('authorize').addEventListener('click', function () {
    const nameInput = document.getElementById('nameInput');
    const passwordInput = document.getElementById('passwordInput');

    if (passwordInput.value === correctPassword && nameInput.value.trim()) {
        isAuthorized = true;
        userName = nameInput.value;
        document.getElementById('reviewInput').disabled = false;
        document.getElementById('addReview').disabled = false;
        nameInput.value = ''; // Очистить поле имени
        passwordInput.value = ''; // Очистить поле пароля
        alert('Вы успешно авторизовались!');
    } else {
        alert('Неверное имя или пароль!');
    }
});

// Добавление отзыва
document.getElementById('addReview').addEventListener('click', async function () {
    const reviewInput = document.getElementById('reviewInput');
    const reviewsDiv = document.getElementById('reviews');

    if (reviewInput.value.trim() && isAuthorized) {
        const review = {
            author: userName,
            text: reviewInput.value
        };

        // Сохранение отзыва на сервере
        await fetch('https://sokolovwebs.github.io/Profi-Groomer/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        });

        // Обновление интерфейса
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review';

        const authorDiv = document.createElement('div');
        authorDiv.className = 'author';
        authorDiv.textContent = userName;

        reviewDiv.textContent = reviewInput.value;
        reviewDiv.prepend(authorDiv);
        reviewsDiv.appendChild(reviewDiv);

        reviewInput.value = ''; // Очистить поле ввода
    }
});

// Загрузка отзывов при загрузке страницы
window.onload = loadReviews;
