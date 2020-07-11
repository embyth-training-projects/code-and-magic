'use strict';

// Перетаскивание окна с кастомизацией волшебника за аватарку
(function () {
  var offsetHeight = document.documentElement.offsetHeight;
  var clientHeight = document.documentElement.clientHeight;
  var dialogHandle = window.setup.querySelector('.upload');

  document.body.style.overflowX = 'hidden';

  window.moveSetupWindow = function (evt) {
    evt.preventDefault();

    if (offsetHeight < clientHeight) {
      document.body.style.overflowY = 'hidden';
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.setup.style.top = (window.setup.offsetTop - shift.y) + 'px';
      window.setup.style.left = (window.setup.offsetLeft - shift.x) + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      if (offsetHeight < clientHeight) {
        document.body.style.overflowY = 'auto';
      }

      if (dragged) {
        var onClickPreventDefault = function (evtDefault) {
          evtDefault.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  };
})();
