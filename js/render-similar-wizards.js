'use strict';

(function () {
  // Шаблон
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var WIZARDS = window.CONSTANTS.WIZARDS_DATA;

  // Генирируем случайные характеристики волшебников
  var setCharacters = function (arrLength) {
    var similarCharacters = [];
    var name;
    var surname;
    var wizardName;

    for (var i = 0; i < arrLength; i++) {
      name = window.util.getRandomValue(WIZARDS.WIZARD_NAMES);
      surname = window.util.getRandomValue(WIZARDS.WIZARD_SURNAMES);
      wizardName = (Math.random() > 0.5) ? (name + ' ' + surname) : (surname + ' ' + name);

      similarCharacters.push({
        name: wizardName,
        coatColor: window.util.getRandomValue(WIZARDS.COAT_COLORS),
        eyesColor: window.util.getRandomValue(WIZARDS.EYES_COLORS)
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

    similarListElement.appendChild(createFragment(setCharacters(WIZARDS.WIZARDS_QUANTITY)));

    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  // Запускаем окно похожих волшебников
  initSetupDialog();
})();
