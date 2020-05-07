'use strict';

// Показываем блок setup при клике на аватарку и закрытие на крестик
var setupOpenButton = document.querySelector('.setup-open');
var setupWindow = document.querySelector('.setup');
var setupCloseButton = document.querySelector('.setup-close');

setupOpenButton.addEventListener('click', function (event) {
  event.preventDefault();
  setupWindow.classList.remove('hidden');
});

setupCloseButton.addEventListener('click', function (event) {
  event.preventDefault();
  setupWindow.classList.add('hidden');
});

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