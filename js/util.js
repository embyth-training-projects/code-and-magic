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
      WIZARD_NAMES: [
        'Иван',
        'Хуан Себастьян',
        'Мария',
        'Кристоф',
        'Виктор',
        'Юлия',
        'Люпита',
        'Вашингтон'
      ],

      WIZARD_SURNAMES: [
        'да Марья',
        'Верон',
        'Мирабелла',
        'Вальц', 'Онопко',
        'Топольницкая',
        'Нионго',
        'Ирвинг'
      ],

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
    }
  };
})();
