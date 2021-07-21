var DateTimePickerFields_1;
import { Property, CSSType, GridLayout, ItemSpec, booleanConverter } from '@nativescript/core';
import { DatePickerField } from './date-picker-field';
import { TimePickerField } from './time-picker-field';
import { getDateNow, clearTime, dateComparer } from '../utils/date-utils';
let DateTimePickerFields = DateTimePickerFields_1 = class DateTimePickerFields extends GridLayout {
    constructor() {
        super();
        this.dateField = new DatePickerField();
        this.timeField = new TimePickerField();
        let row1Spec = new ItemSpec(1, 'star');
        let row2Spec = new ItemSpec(1, 'star');
        let column1Spec = new ItemSpec(1, 'star');
        let column2Spec = new ItemSpec(1, 'star');
        this.addRow(row1Spec);
        this.addRow(row2Spec);
        this.addColumn(column1Spec);
        this.addColumn(column2Spec);
        this.addChild(this.dateField);
        this.addChild(this.timeField);
        DateTimePickerFields_1._updateOrientation(this);
    }
    static datePropertyChanged(field, oldValue, newValue) {
        field.dateField.date = newValue;
        if (!field._shouldSkipTimeAssignment) {
            field.timeField.time = newValue;
        }
        field._shouldSkipTimeAssignment = false;
    }
    static maxDatePropertyChanged(field, oldValue, newValue) {
        field.dateField.maxDate = newValue;
    }
    static minDatePropertyChanged(field, oldValue, newValue) {
        field.dateField.minDate = newValue;
    }
    static dateFormatPropertyChanged(field, oldValue, newValue) {
        field.dateField.dateFormat = newValue;
    }
    static timeFormatPropertyChanged(field, oldValue, newValue) {
        field.timeField.timeFormat = newValue;
    }
    static localePropertyChanged(field, oldValue, newValue) {
        field.dateField.locale = newValue;
        field.timeField.locale = newValue;
    }
    static hintDatePropertyChanged(field, oldValue, newValue) {
        field.dateField.hint = newValue;
    }
    static hintTimePropertyChanged(field, oldValue, newValue) {
        field.timeField.hint = newValue;
    }
    static pickerDefaultDatePropertyChanged(field, oldValue, newValue) {
        field.dateField.pickerDefaultDate = newValue;
        field.timeField.pickerDefaultTime = newValue;
    }
    static pickerTitleDatePropertyChanged(field, oldValue, newValue) {
        field.dateField.pickerTitle = newValue;
    }
    static pickerTitleTimePropertyChanged(field, oldValue, newValue) {
        field.timeField.pickerTitle = newValue;
    }
    static pickerOkTextPropertyChanged(field, oldValue, newValue) {
        field.dateField.pickerOkText = newValue;
        field.timeField.pickerOkText = newValue;
    }
    static pickerCancelTextPropertyChanged(field, oldValue, newValue) {
        field.dateField.pickerCancelText = newValue;
        field.timeField.pickerCancelText = newValue;
    }
    static orientationPropertyChanged(field, oldValue, newValue) {
        DateTimePickerFields_1._updateOrientation(field);
    }
    static autoPickTimePropertyChanged(field, oldValue, newValue) {
        if (field.autoPickTime) {
            field.dateField.pickerDefaultDate = field.pickerDefaultDate;
        }
        else {
            field.dateField.pickerDefaultDate = clearTime(field.pickerDefaultDate);
        }
    }
    static isEnabledPropertyChanged(field, oldValue, newValue) {
        field._goToVisualState(newValue ? 'normal' : 'disabled');
        if (field.dateField && field.timeField) {
            field.dateField.isEnabled = newValue;
            field.timeField.isEnabled = newValue;
        }
    }
    createNativeView() {
        const nativeView = super.createNativeView();
        const ngKey = Object.keys(this).find((key) => key.startsWith('_ngcontent'));
        const vueKey = Object.keys(this).find((key) => key.startsWith('data-v'));
        if (ngKey) {
            this.dateField[ngKey] = this[ngKey];
            this.timeField[ngKey] = this[ngKey];
        }
        if (vueKey) {
            this.dateField[vueKey] = this[vueKey];
            this.timeField[vueKey] = this[vueKey];
        }
        return nativeView;
    }
    initNativeView() {
        super.initNativeView();
        this._updateHandlers(true);
        DateTimePickerFields_1.isEnabledPropertyChanged(this, undefined, this.isEnabled);
    }
    disposeNativeView() {
        this._updateHandlers(false);
        super.disposeNativeView();
    }
    addEventListener(eventNames, callback, thisArg) {
        super.addEventListener(eventNames, callback, thisArg);
        this.dateField.addEventListener(eventNames, callback, thisArg);
        this.timeField.addEventListener(eventNames, callback, thisArg);
    }
    removeEventListener(eventNames, callback, thisArg) {
        super.removeEventListener(eventNames, callback, thisArg);
        this.dateField.removeEventListener(eventNames, callback, thisArg);
        this.timeField.removeEventListener(eventNames, callback, thisArg);
    }
    _updateHandlers(subscribe) {
        if (subscribe) {
            this._dateChangeHandler =
                this._dateChangeHandler ||
                    ((args) => {
                        if (args.propertyName === 'date') {
                            if (!this.autoPickTime && this.timeField.time === undefined) {
                                this._shouldSkipTimeAssignment = true;
                            }
                            this.date = args.value;
                        }
                    });
            this.dateField.on('dateChange', this._dateChangeHandler);
            this._timeChangeHandler =
                this._timeChangeHandler ||
                    ((args) => {
                        if (args.propertyName === 'time') {
                            this.date = args.value;
                        }
                    });
            this.timeField.on('timeChange', this._timeChangeHandler);
            if (this.className) {
                this._handleClassNameChange();
            }
            this.on('classNameChange', this._handleClassNameChange, this);
        }
        else {
            this.dateField.off('dateChange', this._dateChangeHandler);
            this.timeField.off('timeChange', this._timeChangeHandler);
            this.off('classNameChange', this._handleClassNameChange);
        }
    }
    _handleClassNameChange() {
        if (this.dateField && this.timeField) {
            this.dateField.className = this.className;
            this.timeField.className = this.className;
        }
    }
    static _updateOrientation(field) {
        if (field.orientation === 'horizontal') {
            GridLayout.setRow(field.dateField, 0);
            GridLayout.setRow(field.timeField, 0);
            GridLayout.setColumn(field.dateField, 0);
            GridLayout.setColumn(field.timeField, 1);
            GridLayout.setRowSpan(field.dateField, 2);
            GridLayout.setRowSpan(field.timeField, 2);
            GridLayout.setColumnSpan(field.dateField, 1);
            GridLayout.setColumnSpan(field.timeField, 1);
        }
        else if (field.orientation === 'vertical') {
            GridLayout.setRow(field.dateField, 0);
            GridLayout.setRow(field.timeField, 1);
            GridLayout.setColumn(field.dateField, 0);
            GridLayout.setColumn(field.timeField, 0);
            GridLayout.setRowSpan(field.dateField, 1);
            GridLayout.setRowSpan(field.timeField, 1);
            GridLayout.setColumnSpan(field.dateField, 2);
            GridLayout.setColumnSpan(field.timeField, 2);
        }
    }
};
DateTimePickerFields.dateProperty = new Property({
    name: 'date',
    equalityComparer: dateComparer,
    valueConverter: dateValueConverter,
    valueChanged: DateTimePickerFields_1.datePropertyChanged,
});
DateTimePickerFields.maxDateProperty = new Property({
    name: 'maxDate',
    equalityComparer: dateComparer,
    valueConverter: dateValueConverter,
    valueChanged: DateTimePickerFields_1.maxDatePropertyChanged,
});
DateTimePickerFields.minDateProperty = new Property({
    name: 'minDate',
    equalityComparer: dateComparer,
    valueConverter: dateValueConverter,
    valueChanged: DateTimePickerFields_1.minDatePropertyChanged,
});
DateTimePickerFields.dateFormatProperty = new Property({
    name: 'dateFormat',
    valueChanged: DateTimePickerFields_1.dateFormatPropertyChanged,
});
DateTimePickerFields.timeFormatProperty = new Property({
    name: 'timeFormat',
    valueChanged: DateTimePickerFields_1.timeFormatPropertyChanged,
});
DateTimePickerFields.localeProperty = new Property({
    name: 'locale',
    valueChanged: DateTimePickerFields_1.localePropertyChanged,
});
DateTimePickerFields.hintDateProperty = new Property({
    name: 'hintDate',
    valueChanged: DateTimePickerFields_1.hintDatePropertyChanged,
});
DateTimePickerFields.hintTimeProperty = new Property({
    name: 'hintTime',
    valueChanged: DateTimePickerFields_1.hintTimePropertyChanged,
});
DateTimePickerFields.pickerDefaultDateProperty = new Property({
    name: 'pickerDefaultDate',
    defaultValue: getDateNow(),
    equalityComparer: dateComparer,
    valueConverter: dateValueConverter,
    valueChanged: DateTimePickerFields_1.pickerDefaultDatePropertyChanged,
});
DateTimePickerFields.pickerTitleDateProperty = new Property({
    name: 'pickerTitleDate',
    valueChanged: DateTimePickerFields_1.pickerTitleDatePropertyChanged,
});
DateTimePickerFields.pickerTitleTimeProperty = new Property({
    name: 'pickerTitleTime',
    valueChanged: DateTimePickerFields_1.pickerTitleTimePropertyChanged,
});
DateTimePickerFields.pickerOkTextProperty = new Property({
    name: 'pickerOkText',
    valueChanged: DateTimePickerFields_1.pickerOkTextPropertyChanged,
});
DateTimePickerFields.pickerCancelTextProperty = new Property({
    name: 'pickerCancelText',
    valueChanged: DateTimePickerFields_1.pickerCancelTextPropertyChanged,
});
DateTimePickerFields.orientationProperty = new Property({
    name: 'orientation',
    defaultValue: 'horizontal',
    valueChanged: DateTimePickerFields_1.orientationPropertyChanged,
});
DateTimePickerFields.autoPickTimeProperty = new Property({
    name: 'autoPickTime',
    defaultValue: false,
    valueChanged: DateTimePickerFields_1.autoPickTimePropertyChanged,
});
DateTimePickerFields.isEnabledProperty = new Property({
    name: 'isEnabled',
    defaultValue: true,
    valueConverter: booleanConverter,
    valueChanged: DateTimePickerFields_1.isEnabledPropertyChanged,
});
DateTimePickerFields = DateTimePickerFields_1 = __decorate([
    CSSType('DateTimePickerFields'),
    __metadata("design:paramtypes", [])
], DateTimePickerFields);
export { DateTimePickerFields };
export function dateValueConverter(v) {
    return new Date(v);
}
DateTimePickerFields.dateProperty.register(DateTimePickerFields);
DateTimePickerFields.maxDateProperty.register(DateTimePickerFields);
DateTimePickerFields.minDateProperty.register(DateTimePickerFields);
DateTimePickerFields.dateFormatProperty.register(DateTimePickerFields);
DateTimePickerFields.timeFormatProperty.register(DateTimePickerFields);
DateTimePickerFields.localeProperty.register(DateTimePickerFields);
DateTimePickerFields.hintDateProperty.register(DateTimePickerFields);
DateTimePickerFields.hintTimeProperty.register(DateTimePickerFields);
DateTimePickerFields.pickerDefaultDateProperty.register(DateTimePickerFields);
DateTimePickerFields.pickerTitleDateProperty.register(DateTimePickerFields);
DateTimePickerFields.pickerTitleTimeProperty.register(DateTimePickerFields);
DateTimePickerFields.pickerOkTextProperty.register(DateTimePickerFields);
DateTimePickerFields.pickerCancelTextProperty.register(DateTimePickerFields);
DateTimePickerFields.orientationProperty.register(DateTimePickerFields);
DateTimePickerFields.autoPickTimeProperty.register(DateTimePickerFields);
DateTimePickerFields.isEnabledProperty.register(DateTimePickerFields);
//# sourceMappingURL=date-time-picker-fields.js.map