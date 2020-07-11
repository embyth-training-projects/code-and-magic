'use strict';

(function () {
  // Вводим константы
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 140;
  var CLOUD_Y = 10;
  var CLOUD_CURVE = 15;
  var GAP = 10;

  var FONT_GAP = 30;
  var LINE_HEIGHT_COEF = 1.2;
  var textX = CLOUD_X + FONT_GAP;
  var textY = CLOUD_Y + FONT_GAP;

  var BAR_MAX_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;

  var fontStyles = {
    fontFamily: 'PT Mono',
    fontSize: 16,
    color: '#000'
  };

  // Текст с сообщениями для окна со статистикой
  var statisticsText = ['Ура вы победили!', 'Список результатов:'];

  var lineHeight = Math.ceil(fontStyles.fontSize * LINE_HEIGHT_COEF);

  // Отрисовываем окошко (облако)
  var renderCloud = function (ctx, x, y, fillColor, strokeColor) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (CLOUD_WIDTH / 2), y + CLOUD_CURVE);
    ctx.lineTo(x + CLOUD_WIDTH, y);
    ctx.lineTo(x + CLOUD_WIDTH - CLOUD_CURVE, y + (CLOUD_HEIGHT / 2));
    ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
    ctx.lineTo(x + (CLOUD_WIDTH / 2), y + CLOUD_HEIGHT - CLOUD_CURVE);
    ctx.lineTo(x, y + CLOUD_HEIGHT);
    ctx.lineTo(x + CLOUD_CURVE, y + (CLOUD_HEIGHT / 2));
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
  };

  // Отрисовывем текст
  var renderText = function (ctx, text, x, y, font) {
    ctx.font = font.fontSize + 'px ' + font.fontFamily;
    ctx.fillStyle = font.color;
    ctx.textBaseline = 'hanging';
    ctx.fillText(text, x, y);
  };

  // Отрисовываем полоску с гистограммы
  var renderBar = function (ctx, barNumber, name, time, maxTime) {
    var maxBarHeight = BAR_MAX_HEIGHT - lineHeight;
    var barX = CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * barNumber;
    var barY = Math.ceil(maxBarHeight * time / maxTime);
    var barTop = CLOUD_HEIGHT - barY - lineHeight * 2;
    var nameY = CLOUD_HEIGHT - FONT_GAP;

    var color;
    if (name === 'Вы') { // Если имя игрока 'Bы' заливаем колонку гистограммы красным цветом
      color = 'rgba(255, 0, 0, 1)';
    } else { // В ином случае любым оттенком синего
      var h = 240;
      var s = Math.floor(Math.random() * 100);
      var l = 50;
      color = 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
    }

    ctx.fillStyle = color;
    ctx.fillRect(barX, barTop, BAR_WIDTH, barY);

    renderText(ctx, Math.round(time), barX, barTop - lineHeight, fontStyles); // Рисуем счет игрока
    renderText(ctx, name, barX, nameY, fontStyles); // Рисуем имя игрока
  };

  // Отрисовываем окно со статистикой
  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)', 'transparent'); // Отрисока тени
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff', '#000'); // Отрисовка окна

    renderText(ctx, statisticsText[0], textX, textY, fontStyles); // Отрисовка первой строки текста
    renderText(ctx, statisticsText[1], textX, textY + lineHeight, fontStyles); // Отрисовка второй строки текста

    var maxTime = window.util.getMaxElement(times); // Находим максимальное значение из массива с результатами игроков

    for (var i = 0; i < names.length; i++) {
      renderBar(ctx, i, names[i], times[i], maxTime); // Рисуем столбец гистограммы
    }
  };
})();
