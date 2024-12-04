const correctPassword = '54321!'; 
const deletePassword = 'DelAut!'; 
let isAuthorized = false;
let userName = '';

// Функция для загрузки отзывов из localStorage
function loadReviews() {
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
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
                    const index = storedReviews.findIndex(r => r.author === author && r.text === text);
                    if (index !== -1) {
                        storedReviews.splice(index, 1); // Удаляем отзыв из массива
                        localStorage.setItem('reviews', JSON.stringify(storedReviews)); // Сохраняем обновленный массив в localStorage
                        reviewsDiv.removeChild(review); // Удаляем отзыв с страницы
                    }
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
document.getElementById('addReview').addEventListener('click', function () {
    const reviewInput = document.getElementById('reviewInput');
    const reviewsDiv = document.getElementById('reviews');

    if (reviewInput.value.trim() && isAuthorized) {
        const review = document.createElement('div');
        review.className = 'review';

        const authorDiv = document.createElement('div');
        authorDiv.className = 'author';
        authorDiv.textContent = userName;

        review.textContent = reviewInput.value;
        review.prepend(authorDiv); // Добавить имя автора
        reviewsDiv.appendChild(review);

        // Сохранение отзыва в localStorage
        const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        storedReviews.push({ author: userName, text: reviewInput.value });
        localStorage.setItem('reviews', JSON.stringify(storedReviews));

        reviewInput.value = ''; // Очистить поле ввода
    }
});

// Загрузка отзывов при загрузке страницы
window.onload = loadReviews;
