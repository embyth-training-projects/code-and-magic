'use strict';

(function () {
  var setupNameInput = document.querySelector('.setup-user-name');

  // Кастомные сообщение об ошибках валидации
  var validityMessages = {
    TOO_SHORT: 'Имя персонажа должно состоять не менее чем из 2-х символов',
    TOO_LONG: 'Имя персонажа не должно превышать 25-ти символов',
    VALUE_MISSING: 'Дайте имя вашему персонажу'
  };

  // Обработчик события корректности данных ввода
  setupNameInput.addEventListener('invalid', function () {
    if (setupNameInput.validity.tooShort) {
      setupNameInput.setCustomValidity(validityMessages.TOO_SHORT);
    } else if (setupNameInput.validity.tooLong) {
      setupNameInput.setCustomValidity(validityMessages.TOO_LONG);
    } else if (setupNameInput.validity.valueMissing) {
      setupNameInput.setCustomValidity(validityMessages.VALUE_MISSING);
    } else {
      setupNameInput.setCustomValidity('');
    }
  });

  setupNameInput.addEventListener('input', function (evt) {
    var target = evt.target;

    target.setCustomValidity('');
  });
})();
