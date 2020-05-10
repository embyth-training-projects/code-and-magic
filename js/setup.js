'use strict';

// Количество персонажей
var NUMBER_OF_CHARACTERS = 4;

// Шаблон
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Массивы с информацией о похожих волшебниках
var charactersData = {
  userFirstNames: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],

  userLastNames: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц', 'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],

  wizardCoatColors: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],

  wizardEyesColors: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ]
};

// Функция возвращает случайное число в заданном интервале
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Генирируем случайные характеристики волшебников
var setCharacters = function (arrLength) {
  var similarCharacters = [];
  var name;
  var surname;
  var wizardName;

  for (var i = 0; i < arrLength; i++) {
    name = charactersData.userFirstNames[getRandomNumber(0, charactersData.userFirstNames.length)];
    surname = charactersData.userLastNames[getRandomNumber(0, charactersData.userLastNames.length)];
    wizardName = (getRandomNumber(0, 1) > 0.5) ? (name + ' ' + surname) : (surname + ' ' + name);

    similarCharacters.push({
      name: wizardName,
      coatColor: charactersData.wizardCoatColors[getRandomNumber(0, charactersData.wizardCoatColors.length)],
      eyesColor: charactersData.wizardEyesColors[getRandomNumber(0, charactersData.wizardEyesColors.length)]
    });
  }

  return similarCharacters;
};

// Создание блока похожих персонажей
var initSetupDialog = function () {
  var similarListElement = document.querySelector('.setup-similar-list');

  similarListElement.appendChild(createFragment(setCharacters(NUMBER_OF_CHARACTERS)));

  document.querySelector('.setup-similar').classList.remove('hidden');
};

// Создание похожего волшебника
var createWizard = function (character) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = character.name;
  wizardElement.querySelector('.wizard-coat').style.fill = character.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = character.eyesColor;

  return wizardElement;
};

// Создание ДОМ фрагмента
var createFragment = function (characters) {
  var fragment = document.createDocumentFragment();

  characters.forEach(function (item) {
    fragment.appendChild(createWizard(item));
  });

  return fragment;
};

// Запускаем окно похожих волшебников
initSetupDialog();

// Заносим элементы в переменные
var setupOpenButton = document.querySelector('.setup-open');
var setupWindow = document.querySelector('.setup');
var setupCloseButton = setupWindow.querySelector('.setup-close');
var setupNameInput = setupWindow.querySelector('.setup-user-name');

// Коды кнопок
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Обработчик нажатия кнопки ESC
var popupEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

// Открывашка окна
var openPopup = function () {
  setupWindow.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler); // Добавляем обработчик события при нажатии ESC
};

// Закрывашка окна
var closePopup = function () {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPressHandler); // Удаляем обработчик события при нажатии ESC
};

// Обработчик события при клике на аватарку (кнопку)
setupOpenButton.addEventListener('click', function () {
  openPopup();
});

// Обработчик события при нажатии кнопку на клавиатуре (Enter) когда аватарка в фокусе
setupOpenButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// Обработчик события при клике на крестик (кнопку закрытия)
setupCloseButton.addEventListener('click', function () {
  closePopup();
});

// Обработчик события при нажатии на кнопку на клавиатуре (Enter) когда крестик в фокусе
setupCloseButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Обработчик события при фокусе поля ввода имени убирает возможность закрыть окно кнопкой ESC
setupNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', popupEscPressHandler);
});

// Обработчик события при выходе из фокуса поля ввода имени добавляет возможность закрыть окно кнопкой ESC
setupNameInput.addEventListener('blur', function () {
  document.addEventListener('keydown', popupEscPressHandler);
});

// Кастомные сообщение об ошибках валидации
var validityMessages = {
  TOO_SHORT: 'Имя персонажа должно состоять не менее чем из 2-х символов',
  TOO_LONG: 'Имя персонажа не должно превышать 25-ти символов',
  VALUE_MISSING: 'Дайте имя вашему персонажу'
};

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
