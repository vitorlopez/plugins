import { LocalizationUtilsBase } from './localization-utils.common';
export class LocalizationUtils extends LocalizationUtilsBase {
    static createNativeLocale(localeIdentifier) {
        if (LocalizationUtils._localesCache.has(localeIdentifier)) {
            return LocalizationUtils._localesCache.get(localeIdentifier);
        }
        let result;
        if (localeIdentifier) {
            result = NSLocale.alloc().initWithLocaleIdentifier(localeIdentifier);
        }
        else {
            result = NSLocale.currentLocale;
        }
        LocalizationUtils._localesCache.set(localeIdentifier, result);
        return result;
    }
    static createNativeCalendar(localeIdentifier, firstWeekday) {
        const locale = LocalizationUtils.createNativeLocale(localeIdentifier);
        const calendar = NSCalendar.alloc().initWithCalendarIdentifier(locale.calendarIdentifier);
        calendar.locale = locale;
        if (firstWeekday !== undefined) {
            calendar.firstWeekday = firstWeekday;
        }
        return calendar;
    }
    static createNativeDateFormatter(formatPattern, nativeLocale) {
        let dateFormatter = NSDateFormatter.alloc().init();
        dateFormatter.locale = nativeLocale;
        if (!formatPattern) {
            dateFormatter.dateStyle = 2 /* MediumStyle */;
            dateFormatter.timeStyle = 0 /* NoStyle */;
        }
        else {
            dateFormatter.dateFormat = formatPattern;
        }
        return dateFormatter;
    }
    static createNativeTimeFormatter(formatPattern, nativeLocale) {
        let dateFormatter = NSDateFormatter.alloc().init();
        dateFormatter.locale = nativeLocale;
        if (!formatPattern) {
            dateFormatter.dateStyle = 0 /* NoStyle */;
            dateFormatter.timeStyle = 1 /* ShortStyle */;
        }
        else {
            dateFormatter.dateFormat = formatPattern;
        }
        return dateFormatter;
    }
    static formatDateTime(formatter, dateTime) {
        return formatter.stringFromDate(dateTime);
    }
    static is24Hours(formatter) {
        const formatPattern = formatter.dateFormat;
        if (formatPattern.indexOf('H') < 0) {
            return false;
        }
        return true;
    }
}
LocalizationUtils._localesCache = new Map();
//# sourceMappingURL=localization-utils.ios.js.map