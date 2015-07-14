var langs = [{
    "preflang": "ar",
    "locale": "ar_ae"
}, {
    "preflang": "bg",
    "locale": "bg"
}, {
    "preflang": "br",
    "locale": "pt_rc_br"
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
    "locale": "ee"
}, {
    "preflang": "en",
    "locale": "default"
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
    "locale": "ja_jp"
}, {
    "preflang": "ko",
    "locale": "kr_ko"
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
    "locale": "ph"
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
    "locale": "rs"
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
    "locale": "ru_uk"
}, {
    "preflang": "vi",
    "locale": "vi"
}, {
    "preflang": "zh",
    "locale": "zh_hk_trad"
}, {
    "preflang": "zs",
    "locale": "zh_hk_simp"
}]

var searches = [{
    "message": "searchPanel.text.searchCarHire",
    "key": "title"
}, {
    "message": "searchPanel.text.country",
    "key": "country"
}, {
    "message": "searchPanel.text.city",
    "key": "city"
}, {
    "message": "searchPanel.text.location",
    "key": "location"
}, {
    "message": "searchPanel.text.pickUpShort",
    "key": "pickUp"
}, {
    "message": "viewMyBooking.text.dropOff",
    "key": "dropOff"
}, {
    "message": "common.text.droplist.default",
    "key": "emptySelect"
}, {
    "message": "searchform.text.pickuplabel",
    "key": "pickUpDate"
}, {
    "message": "searchform.text.dropofflabel",
    "key": "dropOffDate"
}, {
    "message": "viewMyBooking.text.time",
    "key": "time"
}, {
    "message": "searchPanel.text.driverAge",
    "key": "driverAge"
}, {
    "message": "searchPanel.button.search",
    "key": "search"
}, {
    "message": "searchPanel.validation.location",
    "key": "errorLocation"
}, {
    "message": "searchPanel.validation.dropLocation",
    "key": "errorDropLocation"
}, {
    "message": "searchPanel.validation.driversAge",
    "key": "errorDriversAge"
}, {
    "message": "searchPanel.validation.mandatory",
    "key": "errorManditory"
}, {
    "message": "searchPanel.validation.text.minimumLengthOf Booking",
    "key": "errorDateLength"
}];

var completeLangs = 0;

var out = {};

$.each(langs, function(index, lang) {

    var messages = {
        "title": "",
        "country": "",
        "city": "",
        "location": "",
        "pickUp": "",
        "dropOff": "",
        "emptySelect": "",
        "pickUpDate": "",
        "dropOffDate": "",
        "time": "",
        "driverAge": "",
        "search": "",
        "errorLocation": "",
        "errorDropLocation": "",
        "errorDriversAge": "",
        "errorManditory": "",
        "errorDateLength": ""
    }

    var completeMessages = 0;

    $.each(searches, function(index, search) {
        $.ajax({
                url: 'webcontent/getSortedMessages',
                data: {
                    countries: 'all',
                    locales: lang.locale,
                    messagekeys: search.message,
                    searchKey: '',
                    searchTxt: ''
                }
            })
            .done(function(data) {
                $.each(data, function(index, result) {
                    if (result.locale === lang.locale) {
                        if (result.message.indexOf(';')) {
                            result.message = $('<div/>').html(result.message).text();
                        }
                        messages[search.key] = result.message;

                        completeMessages++

					    if (completeMessages === 17) {
					    	out[lang.preflang] = messages;
					        console.log(lang.preflang + ' done!');
                        	completeLangs++;
					    }
                    } else {
                    	console.log(lang.preflang + ' ' + messages[search.key]);
                    }
                });
            })
    })
})