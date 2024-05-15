import JustValidate from 'just-validate';
import Inputmask from "inputmask";

// Функция, которая покажет сообщение об успешной отправке формы
function showSuccessMessage() {
  const successMessage = document.querySelector(".success-message");
  successMessage.style.display = "flex";
}

export const validateForms = (selector, rules, afterSend) => {
  const form = document?.querySelector(selector);
  const telSelector = form?.querySelector('input[type="tel"]');
  let validation;

  if (!form) {
    console.error('Нет такого селектора!');
    return false;
  }

  if (!rules) {
    console.error('Вы не передали правила валидации!');
    return false;
  }

  if (telSelector) {
    const inputMask = new Inputmask('+7 (999) 999-99-99');
    inputMask.mask(telSelector);

    for (let item of rules) {
      if (item.tel) {
        item.rules.push({
          rule: 'function',
          validator: function() {
            const phone = telSelector.inputmask.unmaskedvalue();
            return phone.length === 10;
          },
          errorMessage: item.telError
        });
      }
    }
  }

  validation = new JustValidate(selector);

  for (let item of rules) {
    validation.addField(item.ruleSelector, item.rules);
  }

  validation.onSuccess((ev) => {
    let formData = new FormData(ev.target);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (afterSend) {
            afterSend();
          }
          showSuccessMessage();
          console.log('Отправлено');
        } else {
          console.error('Произошла ошибка при отправке');

          // Показать сообщение об ошибке, что сообщение не было доставлено
          const errorMessage = document.querySelector(".error-message");
          errorMessage.style.display = "block";
        }
      }
    };

    xhr.onerror = function () {
      console.error('Ошибка при отправке');

      // Показать сообщение об ошибке, что сообщение не было доставлено
      const errorMessage = document.querySelector(".error-message");
      errorMessage.style.display = "block";
    };

    xhr.ontimeout = function () {
      console.error('Запрос прерван по таймауту');

      // Показать сообщение об ошибке, что сообщение не было доставлено
      const errorMessage = document.querySelector(".error-message");
      errorMessage.style.display = "block";
    };

    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);

    ev.target.reset();
  });
};
