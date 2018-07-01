import { localeData } from '@/i18n';
import { RECORD_USERINFO } from '@/shared/actions';
import { LocaleUtil } from '@/shared/utils/locale';

function defaultLocale() {

    const language =
        (navigator.languages && navigator.languages[0]) ||
        navigator.language ||
        (navigator as any).userLanguage;

    return {
        language,
        massage: getMessage(language),
        text: LocaleUtil.isoToName(language),
        icon: LocaleUtil.getImageUrlFromISOCode(language)
    };

};

function getMessage(language) {

    const messages =
        localeData[LocaleUtil.languageWithoutRegionCode(language)] ||
        localeData[language] ||
        localeData.en;

    return messages;
}

export const locale = function(state = defaultLocale(), action) {
    switch(action.type) {
        case RECORD_USERINFO:
            const langKey = LocaleUtil.languageWithoutRegionCode(action.account.langKey || state.language);
            return {
                language: langKey,
                messages: getMessage(langKey),
                text: LocaleUtil.isoToName(langKey),
                icon: LocaleUtil.getImageUrlFromISOCode(langKey)
            };
        default:
            return state;
    }
};