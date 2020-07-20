'use strict';

// Обработчик отображения локальной фотографии
(function () {
  var avatarChooser = document.querySelector('.upload input[type="file"]');
  var avatar = document.querySelector('.setup-user-pic');
  var avatarOpener = document.querySelector('.setup-open-icon');
  var FILE_TYPES = ['gif', 'jpeg', 'jpg', 'png'];

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    var reader = new FileReader();

    if (matches) {
      reader.addEventListener('load', function () {
        avatar.src = reader.result;
        avatarOpener.src = reader.result;
      });

      reader.readAsDataURL(file);
    } else {
      window.util.showError('Ошибка при чтении файла: ' + fileName);
      setTimeout(function () {
        document.body.firstChild.remove();
      }, 5000);
    }
  });
})();
