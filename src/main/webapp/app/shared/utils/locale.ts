export class LocaleUtil {
    public static isoToName(code) {
        const mapper = {
            zh: {
                name: 'Chinese',
                i18n: 'global.chinese'
            },
            en: {
                name: 'English',
                i18n: 'global.english'
            },
            es: {
                name: 'Spanish',
                i18n: 'global.spanish'
            },
            fr: {
                name: 'French',
                i18n: 'global.french'
            },
            pt: {
                name: 'Portuguese',
                i18n: 'global.portuguese'
            }
        };

        return mapper[code];
    }

    public static getImageUrlFromISOCode(code) {
        switch(code) {
            case 'zh':
            case 'cn':
                return require('#/images/flags/CN.png');
            case 'es':
                return require('#/images/flags/ES.png');
            case 'fr':
                return require('#/images/flags/FR.png');
            case 'en':
                return require('#/images/flags/GB.png');
            default:
                return require('#/images/flags/GB.png');
        }
    }

    public static languageWithoutRegionCode(langKey) {
        return langKey.toLowerCase().split(/[_-]+/)[0];
    }
}