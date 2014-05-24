String.toLocaleString({
    "en": {
        "%title": "English - l10n.js demo",
        "%info": "You are viewing an English localization of this page."
    },
    "en-US": "assets/localize/l10n/locale-en.js",
    "en-US-x-Hixie": {
        "%title": "American Hixie English - l10n.js demo",
        "%info": "You are viewing an American Hixie English localization of this page."
    },
    "en-GB": "assets/localize/l10n/locale-en.js",
    "vi": "assets/localize/l10n/locale-vi.js"
//    "cn-simplified": "assets/localize/l10n/locale-cn.js"
});
var l = function (string) {
    return string.toLocaleString();
};
