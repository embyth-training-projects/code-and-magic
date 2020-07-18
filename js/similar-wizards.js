'use strict';

(function () {
  var WIZARDS_QUANTITY = window.CONSTANTS.WIZARDS_DATA.WIZARDS_QUANTITY;
  var DefaultColor = {
    COAT: window.CONSTANTS.WIZARDS_DATA.DEFAULT_COAT_COLOR,
    EYES: window.CONSTANTS.WIZARDS_DATA.DEFAULT_EYES_COLOR,
    FIREBALL: window.CONSTANTS.WIZARDS_DATA.DEFAULT_FIREBALL_COLOR
  };

  var setupPlayer = document.querySelector('.setup-player');
  var wizardCoat = setupPlayer.querySelector('.wizard-coat');
  var wizardEyes = setupPlayer.querySelector('.wizard-eyes');

  var wizards = [];

  // Обработчик ответа с сервера
  function onLoad(data) {
    wizards = data;
    window.updateWizards();
  }

  // Создание похожего волшебника
  function createWizard(character) {
    var wizardElement = document.querySelector('#similar-wizard-template').content.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = character.name;
    wizardElement.querySelector('.wizard-coat').style.fill = character.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = character.colorEyes;

    return wizardElement;
  }

  // Создание ДОМ фрагмента
  function renderSimilarWizards(array) {
    var similarListElement = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();

    similarListElement.innerHTML = '';
    for (var i = 0; i < WIZARDS_QUANTITY; i++) {
      fragment.appendChild(createWizard(array[i]));
    }

    similarListElement.appendChild(fragment);
    document.querySelector('.setup-similar').classList.remove('hidden');
  }

  // Обновляем волшебников
  window.updateWizards = function () {
    var coatColor = wizardCoat.style.fill || DefaultColor.COAT;
    var eyesColor = wizardEyes.style.fill || DefaultColor.EYES;

    // Генирируем ранк волшебнику
    function getRank(wizard) {
      var rank = 0;

      if (wizard.colorCoat === coatColor) {
        rank += 2;
      } else if (wizard.colorEyes === eyesColor) {
        rank += 1;
      }
      return rank;
    }

    // Сортируем волшебников за рангом
    wizards.sort(function (left, right) {
      return getRank(right) - getRank(left);
    });

    renderSimilarWizards(wizards);
  };

  // Загружаем с сервера похожих волшебников
  window.backend.load(onLoad, window.util.showError);
})();
