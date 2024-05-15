// Данный файл - лишь собрание подключений готовых компонентов.
// Рекомендуется создавать отдельный файл в папке components и подключать все там

// Определение операционной системы на мобильных
import { mobileCheck } from "./functions/mobile-check";
console.log(mobileCheck())

// Определение ширины экрана
// import { isMobile, isTablet, isDesktop } from './functions/check-viewport';
// if (isDesktop()) {
//   console.log('...')
// }

// Троттлинг функции (для ресайза, ввода в инпут, скролла и т.д.)
// import { throttle } from './functions/throttle';
// let yourFunc = () => { console.log('throttle') };
// let func = throttle(yourFunc);
// window.addEventListener('resize', func);

// Фикс фулскрин-блоков
// import './functions/fix-fullheight';

// Реализация бургер-меню
import { burger } from './functions/burger';

// Реализация остановки скролла (не забудьте вызвать функцию)
// import { disableScroll } from './functions/disable-scroll';

// Реализация включения скролла (не забудьте вызвать функцию)
// import { enableScroll } from './functions/enable-scroll';

// Реализация модального окна
// import GraphModal from 'graph-modal';
// const modal = new GraphModal();

// Реализация табов
// import GraphTabs from 'graph-tabs';
// const tabs = new GraphTabs('tab');

// Получение высоты шапки сайта (не забудьте вызвать функцию)
// import { getHeaderHeight } from './functions/header-height';

// Подключение плагина кастом-скролла
// import 'simplebar';

// Подключение плагина для позиционирования тултипов
// import { createPopper, right} from '@popperjs/core';
// createPopper(el, tooltip, {
//   placement: 'right'
// });

// Подключение свайпера
// import Swiper, { Navigation, Pagination } from 'swiper';
// Swiper.use([Navigation, Pagination]);
// const swiper = new Swiper(el, {
//   slidesPerView: 'auto',
// });

// Подключение анимаций по скроллу
import AOS from 'aos';
AOS.init(
  {
    easing:'ease-in-out-back',
    duration: 750,
  }
);

// Подключение параллакса блоков при скролле
// import Rellax from 'rellax';
// const rellax = new Rellax('.rellax');

// Подключение плавной прокрутки к якорям
import SmoothScroll from 'smooth-scroll';
const scroll = new SmoothScroll('a[href*="#"]');

// Подключение событий свайпа на мобильных
// import 'swiped-events';
// document.addEventListener('swiped', function(e) {
//   console.log(e.target);
//   console.log(e.detail);
//   console.log(e.detail.dir);
// });

import { validateForms } from './functions/validate-forms';

function showSuccessMessage() {
  const successMessage = document.querySelector(".success-message");
  successMessage.style.display = "flex";
  successMessage.classList.remove("hide");
  // Плавное появление уведомления
  setTimeout(() => {
    successMessage.classList.add("show");
  }, 100); // Задержка перед добавлением класса "show" (0.1 секунда)

  // Через 7 секунд добавляем класс "hide" для запуска анимации плавного исчезания
  setTimeout(() => {
    successMessage.classList.remove("show");
    successMessage.classList.add("hide");
  }, 7000); // 7 секунд (7000 миллисекунд)

  // После окончания анимации удалить уведомление из DOM
  setTimeout(() => {
    successMessage.style.display = "none";
  }, 8000); // 8 секунд (8000 миллисекунд), чтобы дать время для завершения анимации
}

const rules1 = [
  {
    ruleSelector: '[data-validate-field="name"]',
    rules: [
      { rule: 'required', errorMessage: 'Пожалуйста, введите ваше имя' },
      // Другие правила для поля Имя, если необходимо
    ],
  },
  {
    ruleSelector: '[data-validate-field="email"]',
    rules: [
      { rule: 'required', errorMessage: 'Пожалуйста, введите ваш email' },
      { rule: 'email', errorMessage: 'Пожалуйста, введите корректный email' },
      // Другие правила для поля Email, если необходимо
    ],
  },
  {
    ruleSelector: '[data-validate-field="tel"]',
    rules: [
      { rule: 'required', errorMessage: 'Пожалуйста, введите ваш телефон' },
      // Другие правила для поля Телефон, если необходимо
    ],
  },
  {
    ruleSelector: '[name="Сообщение"]',
    rules: [
      { rule: 'required', errorMessage: 'Пожалуйста, введите ваше сообщение' },
      // Другие правила для текстовой области Сообщение, если необходимо
    ],
  },
];

const afterForm = () => {
  console.log('Произошла отправка, тут можно писать любые действия');
  showSuccessMessage()
};

validateForms('.form', rules1, afterForm);

