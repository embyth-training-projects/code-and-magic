'use strict';

(function () {
  // Шаблон
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var WIZARDS_QUANTITY = window.CONSTANTS.WIZARDS_DATA.WIZARDS_QUANTITY;
  var WIZARDS = [];

  // Генирируем случайные характеристики волшебников
  var setCharacters = function (arrLength) {
    var similarCharacters = [];
    var usedIndex = [];
    var index;

    function randomCharacter() {
      index = window.util.getRandomIndex(WIZARDS.length);

      if (usedIndex.includes(index)) {
        randomCharacter();
      } else {
        usedIndex.push(index);
      }

      return index;
    }

    for (var i = 0; i < arrLength; i++) {
      var character = randomCharacter();
      similarCharacters.push({
        name: WIZARDS[character].name,
        coatColor: WIZARDS[character].colorCoat,
        eyesColor: WIZARDS[character].colorEyes
      });
    }

    return similarCharacters;
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

  // Создание блока похожих персонажей
  var initSetupDialog = function () {
    var similarListElement = document.querySelector('.setup-similar-list');

    similarListElement.appendChild(createFragment(setCharacters(WIZARDS_QUANTITY)));

    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  // Обработчик ответа с сервера
  var onLoad = function (data) {
    WIZARDS = data;
    initSetupDialog();
  };

  // Загружаем с сервера похожих волшебников
  window.backend.load(onLoad, window.util.showError);
})();
