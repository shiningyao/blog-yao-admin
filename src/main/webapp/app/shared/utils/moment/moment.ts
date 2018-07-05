import * as moment from 'moment';
import zhCn from './locales/zh-cn';
import enGb from './locales/en-gb';


export function defineLocale(langKey) {
    switch(langKey) {
        case 'zh':
            return moment.updateLocale('zh-cn', zhCn);
        case 'en':
        default:
            return moment.updateLocale('en-gb', enGb);

    }
}


export default moment;