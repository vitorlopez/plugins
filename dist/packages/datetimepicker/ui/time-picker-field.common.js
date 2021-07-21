var TimePickerFieldBase_1;
import { Property, CSSType } from '@nativescript/core';
import { DateTimePicker, DateTimePickerStyle } from '..';
import { LocalizationUtils } from '../utils/localization-utils';
import { getDateNow, dateComparer } from '../utils/date-utils';
import { PickerFieldBase } from './picker-field-base';
let TimePickerFieldBase = TimePickerFieldBase_1 = class TimePickerFieldBase extends PickerFieldBase {
    open() {
        const style = DateTimePickerStyle.create(this);
        DateTimePicker.pickTime({
            context: this._context,
            time: this.time ? this.time : this.pickerDefaultTime,
            locale: this.locale,
            title: this.pickerTitle,
            okButtonText: this.pickerOkText,
            cancelButtonText: this.pickerCancelText,
            is24Hours: this.is24Hours(this._nativeTimeFormatter),
            timeInterval: this.timeInterval,
        }, style)
            .then((result) => {
            if (result) {
                this.time = result;
            }
            let args = {
                eventName: TimePickerFieldBase_1.timePickerClosedEvent,
                object: this,
            };
            this.notify(args);
        })
            .catch((err) => {
            console.log('TimePickerField Error: ' + err);
        });
        let args = {
            eventName: TimePickerFieldBase_1.timePickerOpenedEvent,
            object: this,
        };
        this.notify(args);
    }
    updateText() {
        if (!this._nativeTimeFormatter) {
            this._initRegionalSettings();
        }
        this.text = this.time ? this.getFormattedTime(this.time) : '';
    }
    initNativeView() {
        super.initNativeView();
        this._updateRegionalSettings();
    }
    static timePropertyChanged(field, oldValue, newValue) {
        field.updateText();
    }
    static timeFormatPropertyChanged(field, oldValue, newValue) {
        field.onTimeFormatChanged(oldValue, newValue);
    }
    static timeIntervalPropertyChanged(field, oldValue, newValue) {
        field.onTimeIntervalChanged(oldValue, newValue);
    }
    onTimeFormatChanged(oldValue, newValue) {
        this._updateRegionalSettings();
    }
    onTimeIntervalChanged(oldValue, newValue) { }
    onLocaleChanged(oldValue, newValue) {
        this._updateRegionalSettings();
    }
    _updateRegionalSettings() {
        this._initRegionalSettings();
        this.updateText();
    }
    getFormattedTime(time) {
        return LocalizationUtils.formatDateTime(this._nativeTimeFormatter, time);
    }
    _initRegionalSettings() {
        this._nativeLocale = LocalizationUtils.createNativeLocale(this.locale);
        this._nativeTimeFormatter = LocalizationUtils.createNativeTimeFormatter(this.timeFormat, this._nativeLocale);
    }
    is24Hours(formatter) {
        return LocalizationUtils.is24Hours(formatter);
    }
};
TimePickerFieldBase.timePickerOpenedEvent = 'timePickerOpened';
TimePickerFieldBase.timePickerClosedEvent = 'timePickerClosed';
TimePickerFieldBase.timeProperty = new Property({
    name: 'time',
    equalityComparer: dateComparer,
    valueConverter: timeValueConverter,
    valueChanged: TimePickerFieldBase_1.timePropertyChanged,
});
TimePickerFieldBase.timeFormatProperty = new Property({
    name: 'timeFormat',
    valueChanged: TimePickerFieldBase_1.timeFormatPropertyChanged,
});
TimePickerFieldBase.pickerDefaultTimeProperty = new Property({
    name: 'pickerDefaultTime',
    defaultValue: getDateNow(),
    equalityComparer: dateComparer,
    valueConverter: timeValueConverter,
});
TimePickerFieldBase.timeIntervalProperty = new Property({
    name: 'timeInterval',
    valueChanged: TimePickerFieldBase_1.timeIntervalPropertyChanged,
});
TimePickerFieldBase = TimePickerFieldBase_1 = __decorate([
    CSSType('TimePickerField')
], TimePickerFieldBase);
export { TimePickerFieldBase };
// Creates a date for today with the time represented in the timeString in ISO 8601 formats
// as specified here: https://en.wikipedia.org/wiki/ISO_8601#Times:
// 1)hh:mm:ss.sss --- 2)hhmmss.sss --- 3)hh:mm:ss --- 4)hhmmss --- 5)hh:mm --- 6)hhmm --- 7)hh
export function timeValueConverter(timeString) {
    let date = new Date();
    date.setMilliseconds(0);
    date.setSeconds(0);
    if (timeString.length < 2 || isNaN(+timeString.substring(0, 2))) {
        // The string can't be parsed, so default to time now
        return date;
    }
    const hours = +timeString.substring(0, 2);
    date.setHours(hours);
    date.setMinutes(0);
    let timeRemainder = timeString.substring(2);
    timeRemainder = timeRemainder.startsWith(':') ? timeRemainder.substring(1) : timeRemainder;
    if (timeRemainder.length < 2 || isNaN(+timeRemainder.substring(0, 2))) {
        // Successfully parsed a date is in the 7)hh format
        return date;
    }
    const minutes = +timeRemainder.substring(0, 2);
    date.setMinutes(minutes);
    timeRemainder = timeRemainder.substring(2);
    timeRemainder = timeRemainder.startsWith(':') ? timeRemainder.substring(1) : timeRemainder;
    if (timeRemainder.length < 2 || isNaN(+timeRemainder.substring(0, 2))) {
        // Successfully parsed a date is in the 5)hh:mm or 6)hhmm format
        return date;
    }
    const seconds = +timeRemainder.substring(0, 2);
    date.setSeconds(seconds);
    timeRemainder = timeRemainder.substring(2);
    timeRemainder = timeRemainder.startsWith('.') ? timeRemainder.substring(1) : timeRemainder;
    if (timeRemainder.length < 3 || isNaN(+timeRemainder.substring(0, 3))) {
        // Successfully parsed a date is in the 3)hh:mm:ss or 4)hhmmss format
        return date;
    }
    const milliseconds = +timeRemainder.substring(0, 3);
    date.setMilliseconds(milliseconds);
    // Successfully parsed a date in the 1)hh:mm:ss.sss or 2)hhmmss.sss format
    return date;
}
TimePickerFieldBase.timeProperty.register(TimePickerFieldBase);
TimePickerFieldBase.timeFormatProperty.register(TimePickerFieldBase);
TimePickerFieldBase.timeIntervalProperty.register(TimePickerFieldBase);
TimePickerFieldBase.pickerDefaultTimeProperty.register(TimePickerFieldBase);
//# sourceMappingURL=time-picker-field.common.js.map