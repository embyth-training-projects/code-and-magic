'use strict';

(function () {
  var setupNameInput = document.querySelector('.setup-user-name');

  // Кастомные сообщение об ошибках валидации
  var validityMessages = {
    TOO_SHORT: 'Имя персонажа должно состоять не менее чем из 2-х символов',
    TOO_LONG: 'Имя персонажа не должно превышать 25-ти символов',
    VALUE_MISSING: 'Дайте имя вашему персонажу'
  };

  function setupNameInvalidHandler(evt) {
    var target = evt.target;

    if (!target.validity.valid) {
      if (target.validity.tooShort) {
        target.setCustomValidity(validityMessages.TOO_SHORT);
      } else if (target.validity.tooLong) {
        target.setCustomValidity(validityMessages.TOO_LONG);
      } else if (target.validity.valueMissing) {
        target.setCustomValidity(validityMessages.VALUE_MISSING);
      } else {
        target.setCustomValidity('');
      }
    } else {
      setupNameInput.setCustomValidity('');
    }
  }

  function setupNameInputHandler(evt) {
    var target = evt.target;

    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  }

  // Обработчик события корректности данных ввода
  setupNameInput.addEventListener('invalid', setupNameInvalidHandler);
  setupNameInput.addEventListener('input', setupNameInputHandler);
})();
