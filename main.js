var fs = require('fs');
var moment = require('moment');
var formatJson = require('format-json');

var langs = [{
    "preflang": "ar",
    "locale": "ar"
}, {
    "preflang": "bg",
    "locale": "bg"
}, {
    "preflang": "br",
    "locale": "pt-br"
}, {
    "preflang": "ca",
    "locale": ""
}, {
    "preflang": "ca",
    "locale": "ca"
}, {
    "preflang": "cs",
    "locale": "cs"
}, {
    "preflang": "da",
    "locale": "da"
}, {
    "preflang": "de",
    "locale": "de"
}, {
    "preflang": "ee",
    "locale": "et"
}, {
    "preflang": "en",
    "locale": "en-gb"
}, {
    "preflang": "es",
    "locale": "es"
}, {
    "preflang": "fi",
    "locale": "fi"
}, {
    "preflang": "fr",
    "locale": "fr"
}, {
    "preflang": "gr",
    "locale": "el"
}, {
    "preflang": "he",
    "locale": "he"
}, {
    "preflang": "hr",
    "locale": "hr"
}, {
    "preflang": "hu",
    "locale": "hu"
}, {
    "preflang": "id",
    "locale": "id"
}, {
    "preflang": "is",
    "locale": "is"
}, {
    "preflang": "it",
    "locale": "it"
}, {
    "preflang": "jp",
    "locale": "ja"
}, {
    "preflang": "ko",
    "locale": "ko"
}, {
    "preflang": "lt",
    "locale": "lt"
}, {
    "preflang": "lv",
    "locale": "lv"
}, {
    "preflang": "my",
    "locale": "my"
}, {
    "preflang": "nl",
    "locale": "nl"
}, {
    "preflang": "no",
    "locale": "no"
}, {
    "preflang": "ph",
    "locale": "tl-ph"
}, {
    "preflang": "pl",
    "locale": "pl"
}, {
    "preflang": "pt",
    "locale": "pt"
}, {
    "preflang": "ro",
    "locale": "ro"
}, {
    "preflang": "rs",
    "locale": "sr"
}, {
    "preflang": "ru",
    "locale": "ru"
}, {
    "preflang": "sk",
    "locale": "sk"
}, {
    "preflang": "sl",
    "locale": "sl"
}, {
    "preflang": "sv",
    "locale": "sv"
}, {
    "preflang": "th",
    "locale": "th"
}, {
    "preflang": "tr",
    "locale": "tr"
}, {
    "preflang": "uk",
    "locale": "uk"
}, {
    "preflang": "vi",
    "locale": "vi"
}, {
    "preflang": "zh",
    "locale": "zh-cn"
}, {
    "preflang": "zs",
    "locale": "zh-tw"
}]

var errors = require('./errors/errors.js');

for (var i in langs) {
	var lang = langs[i];

    try {
        var variables = require('./variables/vars_' + lang.preflang + '.js');
    }
    catch (e) {
        console.log(e)
        var variables = require('./variables/vars_en.js');
    }

	var out = {
        "title": variables.title,
        "country": variables.country,
        "city": variables.city,
        "location": variables.loc,
        "pickUp": variables.pickUp,
        "dropOff": variables.dropOff,
        "emptySelect": variables.emptySelect,
        "pickUpDate": variables.pickUpDate,
        "dropOffDate": variables.dropOffDate,
        "time": variables.pickUpTime,
        "driverAge": variables.driverAge,
        "search": variables.search,
        "errorPickUp": errors.pickup[lang.preflang] + ' ' + errors.must[lang.preflang],
        "errorDropOff": errors.dropoff[lang.preflang] + ' ' + errors.must[lang.preflang],
        "errorDateDiff": errors.hour[lang.preflang],
        "errorAge": variables.driverAge + ' ' + errors.must[lang.preflang],
		"moment": {}
	}

    moment.locale(lang.locale);
    var localeData = moment.localeData();

	out.moment.months = localeData._months
	out.moment.monthsShort = localeData._monthsShort
	out.moment.weekdays = localeData._weekdays
	out.moment.weekdaysShort = localeData._weekdaysShort
	out.moment.weekdaysMin = localeData._weekdaysMin
	out.moment.longDateFormat = localeData._longDateFormat

	fs.writeFile("locales/" + lang.preflang + ".json", formatJson.plain(out), function(err) {
	    if(err) {
	        return console.log(err);
	    }
	});
}