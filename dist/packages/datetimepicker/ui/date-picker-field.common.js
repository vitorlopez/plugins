var DatePickerFieldBase_1;
import { Property, CSSType } from '@nativescript/core';
import { DateTimePicker, DateTimePickerStyle } from '..';
import { LocalizationUtils } from '../utils/localization-utils';
import { getDateToday, dateComparer } from '../utils';
import { PickerFieldBase } from './picker-field-base';
let DatePickerFieldBase = DatePickerFieldBase_1 = class DatePickerFieldBase extends PickerFieldBase {
    open() {
        const style = DateTimePickerStyle.create(this);
        DateTimePicker.pickDate({
            context: this._context,
            date: this.date ? this.date : this.pickerDefaultDate,
            locale: this.locale,
            minDate: this.minDate,
            maxDate: this.maxDate,
            firstWeekday: this.firstWeekday,
            iosPreferredDatePickerStyle: this.iosPreferredDatePickerStyle,
            title: this.pickerTitle,
            okButtonText: this.pickerOkText,
            cancelButtonText: this.pickerCancelText,
        }, style)
            .then((result) => {
            if (result) {
                this.date = result;
            }
            let args = {
                eventName: DatePickerFieldBase_1.datePickerClosedEvent,
                object: this,
            };
            this.notify(args);
        })
            .catch((err) => {
            console.log('DatePickerField Error: ' + err);
        });
        let args = {
            eventName: DatePickerFieldBase_1.datePickerOpenedEvent,
            object: this,
        };
        this.notify(args);
    }
    updateText() {
        if (!this._nativeDateFormatter) {
            this._initRegionalSettings();
        }
        this.text = this.date ? this.getFormattedDate(this.date) : '';
    }
    initNativeView() {
        super.initNativeView();
        this._updateRegionalSettings();
    }
    static datePropertyChanged(field, oldValue, newValue) {
        field.updateText();
    }
    static dateFormatPropertyChanged(field, oldValue, newValue) {
        field.onDateFormatChanged(oldValue, newValue);
    }
    onDateFormatChanged(oldValue, newValue) {
        this._updateRegionalSettings();
    }
    onLocaleChanged(oldValue, newValue) {
        this._updateRegionalSettings();
    }
    getFormattedDate(date) {
        return LocalizationUtils.formatDateTime(this._nativeDateFormatter, date);
    }
    _initRegionalSettings() {
        this._nativeLocale = LocalizationUtils.createNativeLocale(this.locale);
        this._nativeDateFormatter = LocalizationUtils.createNativeDateFormatter(this.dateFormat, this._nativeLocale);
    }
    _updateRegionalSettings() {
        this._initRegionalSettings();
        this.updateText();
    }
};
DatePickerFieldBase.datePickerOpenedEvent = 'datePickerOpened';
DatePickerFieldBase.datePickerClosedEvent = 'datePickerClosed';
DatePickerFieldBase.dateProperty = new Property({
    name: 'date',
    equalityComparer: dateComparer,
    valueConverter: dateValueConverter,
    valueChanged: DatePickerFieldBase_1.datePropertyChanged,
});
DatePickerFieldBase.maxDateProperty = new Property({
    name: 'maxDate',
    equalityComparer: dateComparer,
    valueConverter: dateValueConverter,
});
DatePickerFieldBase.minDateProperty = new Property({
    name: 'minDate',
    equalityComparer: dateComparer,
    valueConverter: dateValueConverter,
});
DatePickerFieldBase.dateFormatProperty = new Property({
    name: 'dateFormat',
    valueChanged: DatePickerFieldBase_1.dateFormatPropertyChanged,
});
DatePickerFieldBase.firstWeekdayProperty = new Property({
    name: 'firstWeekday',
});
DatePickerFieldBase.pickerDefaultDateProperty = new Property({
    name: 'pickerDefaultDate',
    defaultValue: getDateToday(),
    equalityComparer: dateComparer,
    valueConverter: dateValueConverter,
});
DatePickerFieldBase.iosPreferredDatePickerStyleProperty = new Property({
    name: 'iosPreferredDatePickerStyle',
});
DatePickerFieldBase = DatePickerFieldBase_1 = __decorate([
    CSSType('DatePickerField')
], DatePickerFieldBase);
export { DatePickerFieldBase };
export function dateValueConverter(v) {
    return new Date(v);
}
DatePickerFieldBase.dateProperty.register(DatePickerFieldBase);
DatePickerFieldBase.maxDateProperty.register(DatePickerFieldBase);
DatePickerFieldBase.minDateProperty.register(DatePickerFieldBase);
DatePickerFieldBase.dateFormatProperty.register(DatePickerFieldBase);
DatePickerFieldBase.pickerDefaultDateProperty.register(DatePickerFieldBase);
//# sourceMappingURL=date-picker-field.common.js.map