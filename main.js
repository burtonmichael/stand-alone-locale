var fs = require('fs');
var moment = require('moment');
var formatJson = require('format-json');
var extend = require('extend');
var del = require('del');

var locales = require('./data/locales');
var download = require('./data/download');

del.sync('./translations/*')

for (var i in locales) {
	var locale = locales[i];

    var translations = download[locale.preflang];

    moment.locale(locale.locale);

    var localeData = moment.localeData();

    translations.moment = {};
	translations.moment.months = localeData._months
	translations.moment.monthsShort = localeData._monthsShort
	translations.moment.weekdays = localeData._weekdays
	translations.moment.weekdaysShort = localeData._weekdaysShort
	translations.moment.weekdaysMin = localeData._weekdaysMin
	translations.moment.longDateFormat = localeData._longDateFormat


	fs.writeFile("./translations/" + locale.preflang + ".json", formatJson.plain(translations), function(err) {
	    if(err) {
	        return console.log(err);
	    }
	});
}