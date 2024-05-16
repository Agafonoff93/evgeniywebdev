 // Получаем текущий год
 var currentYear = new Date().getFullYear();

 // Находим элемент с классом "footer__copyright"
 var footerCopyright = document.querySelector(".footer__copyright span");


 // Проверяем, существует ли элемент
 if (footerCopyright) {
   // Вставляем текущий год в элемент
   footerCopyright.textContent = currentYear;

 }
