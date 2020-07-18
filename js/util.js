'use strict';

(function () {

  // Заносим константы в глобальную область видимости
  window.CONSTANTS = {
    // Коды кнопок
    KEYCODES: {
      ESC: 27,
      ENTER: 13
    },
    // Массивы с информацией о похожих волшебниках
    WIZARDS_DATA: {
      COAT_COLORS: [
        'rgb(101, 137, 164)',
        'rgb(241, 43, 107)',
        'rgb(146, 100, 161)',
        'rgb(56, 159, 117)',
        'rgb(215, 210, 55)',
        'rgb(0, 0, 0)'
      ],
      EYES_COLORS: [
        'black',
        'red',
        'blue',
        'yellow',
        'green'
      ],
      FIREBALL_COLORS: [
        '#ee4830',
        '#30a8ee',
        '#5ce6c0',
        '#e848d5',
        '#e6e848'
      ],
      DEFAULT_COAT_COLOR: 'rgb(101, 137, 164)',
      DEFAULT_EYES_COLOR: 'black',
      DEFAULT_FIREBALL_COLOR: '#ee4830',
      WIZARDS_QUANTITY: 4
    }
  };

  // Заносим методы в глобальную область видимости
  window.util = {
    // Метод возвращает случайный индекс
    getRandomIndex: function (number) {
      return Math.floor(Math.random() * number);
    },
    // Метод возвращает случайное число в заданном интервале
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    // Метод возвращает случайное значение в заданном массиве
    getRandomValue: function (array) {
      return array[this.getRandomIndex(array.length)];
    },
    // Метод возвращает максимальное значение в заданном массиве
    getMaxElement: function (array) {
      return Math.max.apply(null, array);
    },
    // Проверка на нажатиe кнопки ESC
    isEscKey: function (evt, action) {
      if (evt.keyCode === window.CONSTANTS.KEYCODES.ESC) {
        action();
      }
    },
    // Проверка на нажатиe кнопки Enter
    isEnterKey: function (evt, action) {
      if (evt.keyCode === window.CONSTANTS.KEYCODES.ENTER) {
        action();
      }
    },
    // Счётчик
    makeCounter: function () {
      var count = 1;

      return function (array) {
        if (count >= array.length) {
          count = 0;
          return count++;
        } else {
          return count++;
        }
      };
    },
    // Показ ошибки
    showError: function (errorMessage) {
      var node = document.createElement('div');
      node.style.zIndex = 100;
      node.style.width = '100%';
      node.style.margin = '0 auto';
      node.style.textAlign = 'center';
      node.style.backgroundColor = 'red';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.top = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
