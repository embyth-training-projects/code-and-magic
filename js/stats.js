'use strict';

(function () {
  // Вводим константы
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 140;
  var CLOUD_Y = 10;
  var CLOUD_CURVE = 15;
  var SHADOW_OFFSET = 10;

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

  // Получаем строку HSL
  function getHSL(hue, saturation, lightness) {
    return 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
  }

  // Отрисовываем окошко (облако)
  function renderCloud(ctx, x, y, fillColor, strokeColor) {
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
  }

  // Отрисовывем текст
  function renderText(ctx, text, x, y, font) {
    ctx.font = font.fontSize + 'px ' + font.fontFamily;
    ctx.fillStyle = font.color;
    ctx.textBaseline = 'hanging';
    ctx.fillText(text, x, y);
  }

  // Отрисовываем полоску с гистограммы
  function renderBar(ctx, barNumber, name, time, maxTime) {
    var maxBarHeight = BAR_MAX_HEIGHT - lineHeight;
    var barHeight = Math.ceil(maxBarHeight * time / maxTime);
    var barX = CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * barNumber;
    var barY = CLOUD_HEIGHT - barHeight - lineHeight * 2;

    var nameX = barX;
    var nameY = CLOUD_HEIGHT - FONT_GAP;

    ctx.fillStyle = (name === 'Вы') ? 'rgba(255, 0, 0, 1)' : getHSL(240, Math.floor(Math.random() * 100), 50);
    ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);

    renderText(ctx, Math.round(time), barX, barY - lineHeight, fontStyles); // Рисуем счет игрока
    renderText(ctx, name, nameX, nameY, fontStyles); // Рисуем имя игрока
  }

  // Отрисовываем окно со статистикой
  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + SHADOW_OFFSET, CLOUD_Y + SHADOW_OFFSET, 'rgba(0, 0, 0, 0.7)', 'transparent'); // Отрисока тени
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff', '#000'); // Отрисовка окна

    renderText(ctx, statisticsText[0], textX, textY, fontStyles); // Отрисовка первой строки текста
    renderText(ctx, statisticsText[1], textX, textY + lineHeight, fontStyles); // Отрисовка второй строки текста

    var maxTime = window.util.getMaxElement(times); // Находим максимальное значение из массива с результатами игроков

    for (var i = 0; i < names.length; i++) {
      renderBar(ctx, i, names[i], times[i], maxTime); // Рисуем столбец гистограммы
    }
  };
})();
