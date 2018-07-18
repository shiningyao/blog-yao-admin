import * as moment from 'moment';
import zhCn from '@/shared/utils/moment/locales/zh-cn';
import enGb from '@/shared/utils/moment/locales/en-gb';


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