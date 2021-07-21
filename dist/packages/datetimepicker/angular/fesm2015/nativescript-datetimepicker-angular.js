import { Directive, forwardRef, ElementRef, NgModule } from '@angular/core';
import { BaseValueAccessor, registerElement } from '@nativescript/angular';
import { DatePickerField, TimePickerField, DateTimePickerFields } from '@nativescript/datetimepicker';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

class DatePickerFieldDirective {
}
DatePickerFieldDirective.decorators = [
    { type: Directive, args: [{
                selector: "DatePickerField"
            },] }
];
class TimePickerFieldDirective {
}
TimePickerFieldDirective.decorators = [
    { type: Directive, args: [{
                selector: "TimePickerField"
            },] }
];
class DateTimePickerFieldsDirective {
}
DateTimePickerFieldsDirective.decorators = [
    { type: Directive, args: [{
                selector: "DateTimePickerFields"
            },] }
];

const DATE_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerValueAccessor),
    multi: true,
};
const TIME_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimePickerValueAccessor),
    multi: true,
};
const DATE_TIME_PICKERS_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateTimePickersValueAccessor),
    multi: true,
};
/**
 * The accessor for setting a date and listening to changes that is used by the
 * {@link NgModel} directives.
 *
 *  ### Example
 *  ```
 *  <DatePickerField [(ngModel)]="model.test">
 *  ```
 */
class DatePickerValueAccessor extends BaseValueAccessor {
    constructor(elementRef) {
        super(elementRef.nativeElement);
        this._hasBeenOpened = false;
    }
    writeValue(value) {
        const normalized = super.normalizeValue(value);
        this.view.date = normalized;
    }
    handleDateChange(args) {
        if (this._hasBeenOpened) {
            this.onChange(args.value);
        }
    }
    handleDatePickerOpened(args) {
        this._hasBeenOpened = true;
    }
    handleDatePickerClosed(args) {
        this.onTouched();
    }
}
DatePickerValueAccessor.decorators = [
    { type: Directive, args: [{
                selector: "DatePickerField[ngModel],DatePickerField[formControlName],DatePickerField[formControl]," +
                    "datepickerfield[ngModel],datepickerfield[formControlName],datepickerfield[formControl]," +
                    "datePickerField[ngModel],datePickerField[formControlName],datePickerField[formControl]," +
                    "date-picker-field[ngModel],date-picker-field[formControlName],date-picker-field[formControl]",
                providers: [DATE_PICKER_VALUE_ACCESSOR],
                host: {
                    "(dateChange)": "handleDateChange($event)",
                    "(datePickerOpened)": "handleDatePickerOpened($event)",
                    "(datePickerClosed)": "handleDatePickerClosed($event)"
                },
            },] }
];
DatePickerValueAccessor.ctorParameters = () => [
    { type: ElementRef }
];
/**
 * The accessor for setting a time and listening to changes that is used by the
 * {@link NgModel} directives.
 *
 *  ### Example
 *  ```
 *  <TimePickerField [(ngModel)]="model.test">
 *  ```
 */
class TimePickerValueAccessor extends BaseValueAccessor {
    constructor(elementRef) {
        super(elementRef.nativeElement);
        this._hasBeenOpened = false;
    }
    writeValue(value) {
        const normalized = super.normalizeValue(value);
        this.view.time = normalized;
    }
    handleTimeChange(args) {
        if (this._hasBeenOpened) {
            this.onChange(args.value);
        }
    }
    handleTimePickerOpened(args) {
        this._hasBeenOpened = true;
    }
    handleTimePickerClosed(args) {
        this.onTouched();
    }
}
TimePickerValueAccessor.decorators = [
    { type: Directive, args: [{
                selector: "TimePickerField[ngModel],TimePickerField[formControlName],TimePickerField[formControl]," +
                    "timepickerfield[ngModel],timepickerfield[formControlName],timepickerfield[formControl]," +
                    "timePickerField[ngModel],timePickerField[formControlName],timePickerField[formControl]," +
                    "time-picker-field[ngModel],time-picker-field[formControlName],time-picker-field[formControl]",
                providers: [TIME_PICKER_VALUE_ACCESSOR],
                host: {
                    "(timeChange)": "handleTimeChange($event)",
                    "(timePickerOpened)": "handleTimePickerOpened($event)",
                    "(timePickerClosed)": "handleTimePickerClosed($event)"
                },
            },] }
];
TimePickerValueAccessor.ctorParameters = () => [
    { type: ElementRef }
];
/**
 * The accessor for setting a date and listening to changes that is used by the
 * {@link NgModel} directives.
 *
 *  ### Example
 *  ```
 *  <DateTimePickerFields [(ngModel)]="model.test">
 *  ```
 */
class DateTimePickersValueAccessor extends BaseValueAccessor {
    constructor(elementRef) {
        super(elementRef.nativeElement);
        this._hasBeenOpened = false;
    }
    writeValue(value) {
        const normalized = super.normalizeValue(value);
        this.view.date = normalized;
    }
    handleDateChange(args) {
        if (this._hasBeenOpened) {
            this.onChange(args.value);
        }
    }
    handlePickerOpened(args) {
        this._hasBeenOpened = true;
    }
    handlePickerClosed(args) {
        this.onTouched();
    }
}
DateTimePickersValueAccessor.decorators = [
    { type: Directive, args: [{
                selector: "DateTimePickerFields[ngModel],DateTimePickerFields[formControlName],DateTimePickerFields[formControl]," +
                    "datetimepickerfields[ngModel],datetimepickerfields[formControlName],datetimepickerfields[formControl]," +
                    "dateTimePickerFields[ngModel],dateTimePickerFields[formControlName],dateTimePickerFields[formControl]," +
                    "date-time-picker-fields[ngModel],date-time-picker-fields[formControlName],date-time-picker-fields[formControl]",
                providers: [DATE_TIME_PICKERS_VALUE_ACCESSOR],
                host: {
                    "(dateChange)": "handleDateChange($event)",
                    "(datePickerOpened)": "handlePickerOpened($event)",
                    "(datePickerClosed)": "handlePickerClosed($event)",
                    "(timePickerOpened)": "handlePickerOpened($event)",
                    "(timePickerClosed)": "handlePickerClosed($event)"
                },
            },] }
];
DateTimePickersValueAccessor.ctorParameters = () => [
    { type: ElementRef }
];

class NativeScriptDateTimePickerModule {
}
NativeScriptDateTimePickerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DatePickerFieldDirective,
                    TimePickerFieldDirective,
                    DateTimePickerFieldsDirective,
                    DatePickerValueAccessor,
                    TimePickerValueAccessor,
                    DateTimePickersValueAccessor,
                ],
                exports: [
                    DatePickerFieldDirective,
                    TimePickerFieldDirective,
                    DateTimePickerFieldsDirective,
                    DatePickerValueAccessor,
                    TimePickerValueAccessor,
                    DateTimePickersValueAccessor,
                ],
            },] }
];
registerElement("DatePickerField", () => DatePickerField);
registerElement("TimePickerField", () => TimePickerField);
registerElement("DateTimePickerFields", () => DateTimePickerFields);

/**
 * Generated bundle index. Do not edit.
 */

export { DatePickerFieldDirective, DatePickerValueAccessor, DateTimePickerFieldsDirective, DateTimePickersValueAccessor, NativeScriptDateTimePickerModule, TimePickerFieldDirective, TimePickerValueAccessor };
//# sourceMappingURL=nativescript-datetimepicker-angular.js.map
