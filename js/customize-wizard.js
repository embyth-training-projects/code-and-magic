'use strict';

(function () {
  // Элементы кастомизации персонажа
  var wizardElementSetup = window.setup.querySelector('.setup-wizard');
  var wizardCoat = wizardElementSetup.querySelector('.wizard-coat');
  var wizardEyes = wizardElementSetup.querySelector('.wizard-eyes');
  var fireballElement = window.setup.querySelector('.setup-fireball-wrap');
  var WIZARDS = window.CONSTANTS.WIZARDS_DATA;

  var makeCounter = function () {
    var count = 1;

    return function (array) {
      if (count >= array.length) {
        count = 0;
        return count++;
      } else {
        return count++;
      }
    };
  };

  var coatCounter = makeCounter();
  var eyesCounter = makeCounter();
  var fireballCounter = makeCounter();

  var getNextAttributeColor = function (evt) {
    var attributesStyle = evt.currentTarget.style;
    var style;

    switch (evt.currentTarget) {
      case wizardCoat:
        style = WIZARDS.COAT_COLORS[coatCounter(WIZARDS.COAT_COLORS)];
        attributesStyle.fill = style;
        window.setup.querySelector('[name="coat-color"]').value = style;
        break;
      case wizardEyes:
        style = WIZARDS.EYES_COLORS[eyesCounter(WIZARDS.EYES_COLORS)];
        attributesStyle.fill = style;
        window.setup.querySelector('[name="eyes-color"]').value = style;
        break;
      case fireballElement:
        style = WIZARDS.FIREBALL_COLORS[fireballCounter(WIZARDS.FIREBALL_COLORS)];
        attributesStyle.background = style;
        window.setup.querySelector('[name="fireball-color"]').value = style;
        break;
    }
  };

  wizardCoat.addEventListener('click', getNextAttributeColor);
  wizardEyes.addEventListener('click', getNextAttributeColor);
  fireballElement.addEventListener('click', getNextAttributeColor);
})();
