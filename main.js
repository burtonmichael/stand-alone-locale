var fs = require('fs');
var moment = require('moment');
var formatJson = require('format-json');
var extend = require('extend');

var locales = require('./data/locales');
var download = require('./data/download');

for (var i in locales) {
	var locale = locales[i];

    try {
        var translations = require('./translations/' + locale.preflang);
    }
    catch (e) {
        console.log(e);
        var translations = {};
    }

    delete translations.errorPickUp;
    delete translations.errorDropOff;
    delete translations.errorAge;
    delete translations.errorDateDiff;

    extend(translations, download[locale.preflang]);

    if (!translations.moment) {

        moment.locale(locale.locale);

        var localeData = moment.localeData();

        translations.moment =  {};
    	translations.moment.months = localeData._months
    	translations.moment.monthsShort = localeData._monthsShort
    	translations.moment.weekdays = localeData._weekdays
    	translations.moment.weekdaysShort = localeData._weekdaysShort
    	translations.moment.weekdaysMin = localeData._weekdaysMin
    	translations.moment.longDateFormat = localeData._longDateFormat

    }

	fs.writeFile("./new/" + locale.preflang + ".json", formatJson.plain(translations), function(err) {
	    if(err) {
	        return console.log(err);
	    }
	});
}