
// JS модальное окно

 // Получаем модальное окно
 var modal = document.getElementById("myModal");

  // Показываем модальное окно через 3 секунды после загрузки страницы
  window.onload = function() {
    setTimeout(function() {
        modal.style.display = "block";
    }, 2000); // 3000 миллисекунд = 3 секунды
}

 // Получаем элемент <span>, который закрывает модальное окно
 var span = document.getElementsByClassName("close")[0];

 // Когда пользователь кликает на <span> (x), закрываем модальное окно
 span.onclick = function() {
     modal.style.display = "none";
 }

 // Когда пользователь кликает в любое место вне окна, закрываем его
 window.onclick = function(event) {
     if (event.target == modal) {
         modal.style.display = "none";
     }
 }




// JS для увеличения картинок

document.querySelectorAll('.picture').forEach(picture => {
    picture.addEventListener('click', () => {
        picture.classList.toggle('scale');
    });

});


// JS для стрелочек

// 1
    
    const arrow = document.querySelector('.arrow');
    const firstElements = document.querySelectorAll('.first');

    arrow.addEventListener('click', () => {
        firstElements.forEach(element => {
            element.classList.toggle('none');
        });
    });

// 2

const arrow2 = document.querySelector('.arrow2');
const firstElements2 = document.querySelectorAll('.second');

arrow2.addEventListener('click', () => {
    firstElements2.forEach(element => {
        element.classList.toggle('none2');
    });
});

// 3

const arrow3 = document.querySelector('.arrow3');
const firstElements3 = document.querySelectorAll('.third');

arrow3.addEventListener('click', () => {
    firstElements3.forEach(element => {
        element.classList.toggle('none3');
    });
});

// 4

const arrow4 = document.querySelector('.arrow4');
const firstElements4 = document.querySelectorAll('.first4');

arrow4.addEventListener('click', () => {
    firstElements4.forEach(element => {
        element.classList.toggle('none4');
    });
});

// 5 Картинки

const arrow5 = document.querySelector('.arrow5');
const firstElements5 = document.querySelectorAll('.none5');

arrow5.addEventListener('click', () => {
    firstElements5.forEach(element => {
        element.classList.toggle('pictures');
    });
});


// 6 Обо Мне

const arrow6 = document.querySelector('.arrow6');
const firstElements6 = document.querySelectorAll('.none6');

arrow6.addEventListener('click', () => {
    firstElements6.forEach(element => {
        element.classList.toggle('none6');
    });
});

// 7 Контакты

const arrow7 = document.querySelector('.arrow7');
const firstElements7 = document.querySelectorAll('.none7');

arrow7.addEventListener('click', () => {
    firstElements7.forEach(element => {
        element.classList.toggle('none7');
    });
});


// Отмена анимации в блоке Контакты при нажатии на стрелку

const arrow8 = document.querySelector('.arrow7');
const firstElements8 = document.querySelectorAll('.contacts .title h2');

arrow8.addEventListener('click', () => {
    firstElements8.forEach(element => {
        element.classList.toggle('animation');
    });
});
