'use strict';

(function () {
  window.setup = document.querySelector('.setup');
  // Заносим элементы в переменные
  var setupWizardForm = window.setup.querySelector('.setup-wizard-form');
  var setupOpenButton = document.querySelector('.setup-open');
  var setupCloseButton = window.setup.querySelector('.setup-close');
  var setupNameInput = document.querySelector('.setup-user-name');
  var dialogHandle = window.setup.querySelector('.upload');
  var startPosition = {
    x: window.setup.style.left,
    y: window.setup.style.top
  };

  // Закрыть окно при нажатии кнопки Enter
  function closePopupOnKeyDown(evt) {
    window.util.isEnterKey(evt, closePopup);
  }

  // Закрыть окно при нажатии кнопки Esc
  function closePopupOnPressEsc(evt) {
    window.util.isEscKey(evt, closePopup);
  }

  // Открыть окно при нажатии кнопки Enter
  function openPopupOnKeyDown(evt) {
    window.util.isEnterKey(evt, openPopup);
  }

  // Отпрака данных на сервер при сабмите формы
  function submitFormHandler(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(setupWizardForm), closePopup, window.util.showError);
  }

  // Открывашка окна
  function openPopup() {
    window.setup.classList.remove('hidden');

    // Удаляем обработчики событий
    setupOpenButton.removeEventListener('keydown', openPopupOnKeyDown);
    setupOpenButton.removeEventListener('click', openPopup);
    // Добавляем обработчики событий
    document.addEventListener('keydown', closePopupOnPressEsc);
    setupCloseButton.addEventListener('click', closePopup);
    setupCloseButton.addEventListener('keydown', closePopupOnKeyDown);
    dialogHandle.addEventListener('mousedown', window.moveSetupWindow);
    setupWizardForm.addEventListener('submit', submitFormHandler);

    window.addDragAndDropEvents();
  }

  // Закрывашка окна
  function closePopup() {
    window.setup.classList.add('hidden');

    // Удаляем обработчики событий
    document.removeEventListener('keydown', closePopupOnPressEsc);
    setupCloseButton.removeEventListener('click', closePopup);
    setupCloseButton.removeEventListener('keydown', closePopupOnKeyDown);
    dialogHandle.removeEventListener('mousedown', window.moveSetupWindow);
    setupWizardForm.removeEventListener('submit', submitFormHandler);

    // Добавляем обработчики событий
    setupOpenButton.addEventListener('click', openPopup);
    setupOpenButton.addEventListener('keydown', openPopupOnKeyDown);

    window.setup.style.top = startPosition.y;
    window.setup.style.left = startPosition.x;

    window.removeDragAndDropEvents();
  }

  // Обработчик события при клике на аватарку (кнопку)
  setupOpenButton.addEventListener('click', openPopup);

  // Обработчик события при нажатии кнопку на клавиатуре (Enter) когда аватарка в фокусе
  setupOpenButton.addEventListener('keydown', openPopupOnKeyDown);

  // Обработчик события при фокусе поля ввода имени убирает возможность закрыть окно кнопкой ESC
  setupNameInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', closePopupOnPressEsc);
  });

  // Обработчик события при выходе из фокуса поля ввода имени добавляет возможность закрыть окно кнопкой ESC
  setupNameInput.addEventListener('blur', function () {
    document.addEventListener('keydown', closePopupOnPressEsc);
  });
})();
