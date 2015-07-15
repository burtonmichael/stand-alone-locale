var langs = [{
    "preflang": "ar",
    "locale": "ar_ae"
}, {
    "preflang": "bg",
    "locale": "bg"
}, {
    "preflang": "br",
    "locale": "pt_rc_br",
    "fallback": "pt"
}, {
    "preflang": "ca",
    "locale": "es_ct",
    "fallback": "es"
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
    "locale": "he_il"
}, {
    "preflang": "hr",
    "locale": "hr"
}, {
    "preflang": "hu",
    "locale": "hu"
}, {
    "preflang": "id",
    "locale": "in_id"
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
    "locale": "rs",
    "fallback": "hr"
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

function escapeHtml(message) {
    if (message.indexOf(';')) {
        return $('<div/>').html(message).text();
    }
    return message;
}

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
                if (data.length > 0) {
                    $.each(data, function(index, result) {
                        if (result.locale === lang.locale) {

                            messages[search.key] = escapeHtml(result.message);

                            completeMessages++

    					    if (completeMessages === 17) {
    					    	out[lang.preflang] = messages;
    					        console.log(lang.preflang + ' done!');
                            	completeLangs++;
    					    }

                            return false;
                        }
                    });
                } else if (data.length === 0 && lang.fallback) {
                    console.log('Backup requested for ' + search.message + ' for ' + lang.locale)
                    $.ajax({
                            url: 'webcontent/getSortedMessages',
                            data: {
                                countries: 'all',
                                locales: lang.fallback,
                                messagekeys: search.message,
                                searchKey: '',
                                searchTxt: ''
                            }
                        }).done(function(data) {
                            if (data.length > 0) {
                                $.each(data, function(index, result) {
                                    if (result.locale === lang.fallback) {

                                        messages[search.key] = escapeHtml(result.message);

                                        completeMessages++

                                        if (completeMessages === 17) {
                                            out[lang.preflang] = messages;
                                            console.log(lang.preflang + ' done!');
                                            completeLangs++;
                                        }

                                        return false;
                                    } else {
                                        console.log('Unable to match backup ' + search.message + ' for ' + lang.locale);
                                    }
                                });
                            } else {
                                console.log('Unable to get backup ' + search.message + ' for ' + lang.locale);
                            }
                        });
                } else {
                    console.log('Unable to get ' + search.message + ' for ' + lang.locale);
                }
            });
    })
})