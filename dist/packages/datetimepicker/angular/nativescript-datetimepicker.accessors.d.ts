import { ElementRef } from "@angular/core";
import { BaseValueAccessor } from "@nativescript/angular";
import { DatePickerField, TimePickerField, DateTimePickerFields } from "@nativescript/datetimepicker";
/**
 * The accessor for setting a date and listening to changes that is used by the
 * {@link NgModel} directives.
 *
 *  ### Example
 *  ```
 *  <DatePickerField [(ngModel)]="model.test">
 *  ```
 */
export declare class DatePickerValueAccessor extends BaseValueAccessor<DatePickerField> {
    private _hasBeenOpened;
    constructor(elementRef: ElementRef);
    writeValue(value: any): void;
    handleDateChange(args: any): void;
    handleDatePickerOpened(args: any): void;
    handleDatePickerClosed(args: any): void;
}
/**
 * The accessor for setting a time and listening to changes that is used by the
 * {@link NgModel} directives.
 *
 *  ### Example
 *  ```
 *  <TimePickerField [(ngModel)]="model.test">
 *  ```
 */
export declare class TimePickerValueAccessor extends BaseValueAccessor<TimePickerField> {
    private _hasBeenOpened;
    constructor(elementRef: ElementRef);
    writeValue(value: any): void;
    handleTimeChange(args: any): void;
    handleTimePickerOpened(args: any): void;
    handleTimePickerClosed(args: any): void;
}
/**
 * The accessor for setting a date and listening to changes that is used by the
 * {@link NgModel} directives.
 *
 *  ### Example
 *  ```
 *  <DateTimePickerFields [(ngModel)]="model.test">
 *  ```
 */
export declare class DateTimePickersValueAccessor extends BaseValueAccessor<DateTimePickerFields> {
    private _hasBeenOpened;
    constructor(elementRef: ElementRef);
    writeValue(value: any): void;
    handleDateChange(args: any): void;
    handlePickerOpened(args: any): void;
    handlePickerClosed(args: any): void;
}
