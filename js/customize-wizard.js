'use strict';

(function () {
  // Элементы кастомизации персонажа
  var wizardElementSetup = window.setup.querySelector('.setup-wizard');
  var wizardCoat = wizardElementSetup.querySelector('.wizard-coat');
  var wizardEyes = wizardElementSetup.querySelector('.wizard-eyes');
  var fireballElement = window.setup.querySelector('.setup-fireball-wrap');
  var WIZARDS = window.CONSTANTS.WIZARDS_DATA;

  var coatCounter = window.util.makeCounter();
  var eyesCounter = window.util.makeCounter();
  var fireballCounter = window.util.makeCounter();

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

  // Перетаскивание предметов с магазина в инвентарь
  var shopField = document.querySelector('.setup-artifacts-shop');
  var inventoryField = document.querySelector('.setup-artifacts');
  var draggedItem = null;

  function onDragStartInShop(evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target.cloneNode();
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      inventoryField.style.outline = '2px dashed red';
    }
  }

  function onDragStartInCell(evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      inventoryField.style.outline = '2px dashed red';
    }
  }

  function onDragOverHandler(evt) {
    evt.preventDefault();
    return false;
  }

  function onDropHandler(evt) {
    if (evt.target.classList.contains('setup-artifacts-cell') && evt.target.children.length === 0) {
      evt.target.appendChild(draggedItem);
      draggedItem = null;
    }
    evt.target.style.backgroundColor = '';
    inventoryField.style.outline = '';
    evt.preventDefault();
  }

  function onDragEnterHandler(evt) {
    if (evt.target.classList.contains('setup-artifacts-cell') && evt.target.children.length === 0) {
      evt.target.style.backgroundColor = 'rgba(255, 255, 0, 0.3)';
    }
    evt.preventDefault();
  }

  function onDragLeaveHandler(evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  }

  window.addDragAndDropEvents = function () {
    shopField.addEventListener('dragstart', onDragStartInShop);
    inventoryField.addEventListener('dragstart', onDragStartInCell);
    inventoryField.addEventListener('dragover', onDragOverHandler);
    inventoryField.addEventListener('drop', onDropHandler);
    inventoryField.addEventListener('dragenter', onDragEnterHandler);
    inventoryField.addEventListener('dragleave', onDragLeaveHandler);
  };

  window.removeDragAndDropEvents = function () {
    shopField.removeEventListener('dragstart', onDragStartInShop);
    inventoryField.removeEventListener('dragstart', onDragStartInCell);
    inventoryField.removeEventListener('dragover', onDragOverHandler);
    inventoryField.removeEventListener('drop', onDropHandler);
    inventoryField.removeEventListener('dragenter', onDragEnterHandler);
    inventoryField.removeEventListener('dragleave', onDragLeaveHandler);
  };
})();
