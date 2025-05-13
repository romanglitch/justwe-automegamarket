$(function() {
	'use strict';
	// GL_APP - common.js data

	// # Вызов нотификации
	// nTitle - Заголовок нотификации
	// nText - Текст нотификации
	// nIcon - Иконка нотификации (по умолчанию - false)
	// GL_APP.components.glSendNotify(nTitle, nText, nIcon)
	// Пример - GL_APP.components.glSendNotify('Добавлено в сравнение', 'в сравнении 3 автомобиля', false)

	// # Вызов всплывающих окон
	// $.fancybox.open({
	// 	src  : '#popup-callback',
	// 	opts : GL_APP.variables.fancyBox.modalsOptions
	// });

	// # Обновление данных для поля (Размер первоначального взноса)
	// $('input[name="credit-fee"]').data().updateData({
	// 	min: 35000,
	// 	max: 650000,
	// 	from: 90000
	// })

	// # Обновление данных для поля (Сумма кредита)
	// $('input[name="credit-total"]').data().updateData({
	// 	min: 35000,
	// 	max: 650000,
	// 	from: 90000
	// })

	// Открыть нужную вкладку в фильтре
	// $('.filter-tabs__nav-item').eq(1).trigger('click')

	// Раскрыть фильтр
	// $('.js-filter-toggle-btn').trigger('click')
})