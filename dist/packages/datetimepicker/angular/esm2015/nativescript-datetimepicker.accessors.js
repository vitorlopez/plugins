import { Directive, ElementRef, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { BaseValueAccessor } from "@nativescript/angular";
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
export class DatePickerValueAccessor extends BaseValueAccessor {
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
export class TimePickerValueAccessor extends BaseValueAccessor {
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
export class DateTimePickersValueAccessor extends BaseValueAccessor {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlc2NyaXB0LWRhdGV0aW1lcGlja2VyLmFjY2Vzc29ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL25hdGl2ZXNjcmlwdC1kYXRldGltZXBpY2tlci5hY2Nlc3NvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRzFELE1BQU0sMEJBQTBCLEdBQUc7SUFDL0IsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHVCQUF1QixDQUFDO0lBQ3RELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQUVGLE1BQU0sMEJBQTBCLEdBQUc7SUFDL0IsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHVCQUF1QixDQUFDO0lBQ3RELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQUVGLE1BQU0sZ0NBQWdDLEdBQUc7SUFDckMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLDRCQUE0QixDQUFDO0lBQzNELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQUVGOzs7Ozs7OztHQVFHO0FBYUgsTUFBTSxPQUFPLHVCQUF3QixTQUFRLGlCQUFrQztJQUUzRSxZQUFZLFVBQXNCO1FBQzlCLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFGNUIsbUJBQWMsR0FBRyxLQUFLLENBQUM7SUFHL0IsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFVO1FBQ2pCLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxj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O0lBQy9CLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxJQUFTO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7WUFyQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx3R0FBd0c7b0JBQzlHLHdHQUF3RztvQkFDeEcsd0dBQXdHO29CQUN4RyxnSEFBZ0g7Z0JBQ3BILFNBQVMsRUFBRSxDQUFDLGdDQUFnQyxDQUFDO2dCQUM3QyxJQUFJLEVBQUU7b0JBQ0YsY0FBYyxFQUFFLDBCQUEwQjtvQkFDMUMsb0JBQW9CLEVBQUUsNEJBQTRCO29CQUNsRCxvQkFBb0IsRUFBRSw0QkFBNEI7b0JBQ2xELG9CQUFvQixFQUFFLDRCQUE0QjtvQkFDbEQsb0JBQW9CLEVBQUUsNEJBQTRCO2lCQUNyRDthQUNKOzs7WUEzSW1CLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IEJhc2VWYWx1ZUFjY2Vzc29yIH0gZnJvbSBcIkBuYXRpdmVzY3JpcHQvYW5ndWxhclwiO1xuaW1wb3J0IHsgRGF0ZVBpY2tlckZpZWxkLCBUaW1lUGlja2VyRmllbGQsIERhdGVUaW1lUGlja2VyRmllbGRzIH0gZnJvbSBcIkBuYXRpdmVzY3JpcHQvZGF0ZXRpbWVwaWNrZXJcIjtcblxuY29uc3QgREFURV9QSUNLRVJfVkFMVUVfQUNDRVNTT1IgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGF0ZVBpY2tlclZhbHVlQWNjZXNzb3IpLFxuICAgIG11bHRpOiB0cnVlLFxufTtcblxuY29uc3QgVElNRV9QSUNLRVJfVkFMVUVfQUNDRVNTT1IgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGltZVBpY2tlclZhbHVlQWNjZXNzb3IpLFxuICAgIG11bHRpOiB0cnVlLFxufTtcblxuY29uc3QgREFURV9USU1FX1BJQ0tFUlNfVkFMVUVfQUNDRVNTT1IgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGF0ZVRpbWVQaWNrZXJzVmFsdWVBY2Nlc3NvciksXG4gICAgbXVsdGk6IHRydWUsXG59O1xuXG4vKipcbiAqIFRoZSBhY2Nlc3NvciBmb3Igc2V0dGluZyBhIGRhdGUgYW5kIGxpc3RlbmluZyB0byBjaGFuZ2VzIHRoYXQgaXMgdXNlZCBieSB0aGVcbiAqIHtAbGluayBOZ01vZGVsfSBkaXJlY3RpdmVzLlxuICpcbiAqICAjIyMgRXhhbXBsZVxuICogIGBgYFxuICogIDxEYXRlUGlja2VyRmllbGQgWyhuZ01vZGVsKV09XCJtb2RlbC50ZXN0XCI+XG4gKiAgYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIkRhdGVQaWNrZXJGaWVsZFtuZ01vZGVsXSxEYXRlUGlja2VyRmllbGRbZm9ybUNvbnRyb2xOYW1lXSxEYXRlUGlja2VyRmllbGRbZm9ybUNvbnRyb2xdLFwiICtcbiAgICAgICAgXCJkYXRlcGlja2VyZmllbGRbbmdNb2RlbF0sZGF0ZXBpY2tlcmZpZWxkW2Zvcm1Db250cm9sTmFtZV0sZGF0ZXBpY2tlcmZpZWxkW2Zvcm1Db250cm9sXSxcIiArXG4gICAgICAgIFwiZGF0ZVBpY2tlckZpZWxkW25nTW9kZWxdLGRhdGVQaWNrZXJGaWVsZFtmb3JtQ29udHJvbE5hbWVdLGRhdGVQaWNrZXJGaWVsZFtmb3JtQ29udHJvbF0sXCIgK1xuICAgICAgICBcImRhdGUtcGlja2VyLWZpZWxkW25nTW9kZWxdLGRhdGUtcGlja2VyLWZpZWxkW2Zvcm1Db250cm9sTmFtZV0sZGF0ZS1waWNrZXItZmllbGRbZm9ybUNvbnRyb2xdXCIsXG4gICAgcHJvdmlkZXJzOiBbREFURV9QSUNLRVJfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgXCIoZGF0ZUNoYW5nZSlcIjogXCJoYW5kbGVEYXRlQ2hhbmdlKCRldmVudClcIixcbiAgICAgICAgXCIoZGF0ZVBpY2tlck9wZW5lZClcIjogXCJoYW5kbGVEYXRlUGlja2VyT3BlbmVkKCRldmVudClcIixcbiAgICAgICAgXCIoZGF0ZVBpY2tlckNsb3NlZClcIjogXCJoYW5kbGVEYXRlUGlja2VyQ2xvc2VkKCRldmVudClcIlxuICAgIH0sXG59KVxuZXhwb3J0IGNsYXNzIERhdGVQaWNrZXJWYWx1ZUFjY2Vzc29yIGV4dGVuZHMgQmFzZVZhbHVlQWNjZXNzb3I8RGF0ZVBpY2tlckZpZWxkPiB7XG4gICAgcHJpdmF0ZSBfaGFzQmVlbk9wZW5lZCA9IGZhbHNlO1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IHN1cGVyLm5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgdGhpcy52aWV3LmRhdGUgPSBub3JtYWxpemVkO1xuICAgIH1cblxuICAgIGhhbmRsZURhdGVDaGFuZ2UoYXJnczogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLl9oYXNCZWVuT3BlbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKGFyZ3MudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRGF0ZVBpY2tlck9wZW5lZChhcmdzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5faGFzQmVlbk9wZW5lZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaGFuZGxlRGF0ZVBpY2tlckNsb3NlZChhcmdzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB9XG59XG5cbi8qKlxuICogVGhlIGFjY2Vzc29yIGZvciBzZXR0aW5nIGEgdGltZSBhbmQgbGlzdGVuaW5nIHRvIGNoYW5nZXMgdGhhdCBpcyB1c2VkIGJ5IHRoZVxuICoge0BsaW5rIE5nTW9kZWx9IGRpcmVjdGl2ZXMuXG4gKlxuICogICMjIyBFeGFtcGxlXG4gKiAgYGBgXG4gKiAgPFRpbWVQaWNrZXJGaWVsZCBbKG5nTW9kZWwpXT1cIm1vZGVsLnRlc3RcIj5cbiAqICBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiVGltZVBpY2tlckZpZWxkW25nTW9kZWxdLFRpbWVQaWNrZXJGaWVsZFtmb3JtQ29udHJvbE5hbWVdLFRpbWVQaWNrZXJGaWVsZFtmb3JtQ29udHJvbF0sXCIgK1xuICAgICAgICBcInRpbWVwaWNrZXJmaWVsZFtuZ01vZGVsXSx0aW1lcGlja2VyZmllbGRbZm9ybUNvbnRyb2xOYW1lXSx0aW1lcGlja2VyZmllbGRbZm9ybUNvbnRyb2xdLFwiICtcbiAgICAgICAgXCJ0aW1lUGlja2VyRmllbGRbbmdNb2RlbF0sdGltZVBpY2tlckZpZWxkW2Zvcm1Db250cm9sTmFtZV0sdGltZVBpY2tlckZpZWxkW2Zvcm1Db250cm9sXSxcIiArXG4gICAgICAgIFwidGltZS1waWNrZXItZmllbGRbbmdNb2RlbF0sdGltZS1waWNrZXItZmllbGRbZm9ybUNvbnRyb2xOYW1lXSx0aW1lLXBpY2tlci1maWVsZFtmb3JtQ29udHJvbF1cIixcbiAgICBwcm92aWRlcnM6IFtUSU1FX1BJQ0tFUl9WQUxVRV9BQ0NFU1NPUl0sXG4gICAgaG9zdDoge1xuICAgICAgICBcIih0aW1lQ2hhbmdlKVwiOiBcImhhbmRsZVRpbWVDaGFuZ2UoJGV2ZW50KVwiLFxuICAgICAgICBcIih0aW1lUGlja2VyT3BlbmVkKVwiOiBcImhhbmRsZVRpbWVQaWNrZXJPcGVuZWQoJGV2ZW50KVwiLFxuICAgICAgICBcIih0aW1lUGlja2VyQ2xvc2VkKVwiOiBcImhhbmRsZVRpbWVQaWNrZXJDbG9zZWQoJGV2ZW50KVwiXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgVGltZVBpY2tlclZhbHVlQWNjZXNzb3IgZXh0ZW5kcyBCYXNlVmFsdWVBY2Nlc3NvcjxUaW1lUGlja2VyRmllbGQ+IHtcbiAgICBwcml2YXRlIF9oYXNCZWVuT3BlbmVkID0gZmFsc2U7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zdCBub3JtYWxpemVkID0gc3VwZXIubm9ybWFsaXplVmFsdWUodmFsdWUpO1xuICAgICAgICB0aGlzLnZpZXcudGltZSA9IG5vcm1hbGl6ZWQ7XG4gICAgfVxuXG4gICAgaGFuZGxlVGltZUNoYW5nZShhcmdzOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuX2hhc0JlZW5PcGVuZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UoYXJncy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVUaW1lUGlja2VyT3BlbmVkKGFyZ3M6IGFueSkge1xuICAgICAgICB0aGlzLl9oYXNCZWVuT3BlbmVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBoYW5kbGVUaW1lUGlja2VyQ2xvc2VkKGFyZ3M6IGFueSkge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBUaGUgYWNjZXNzb3IgZm9yIHNldHRpbmcgYSBkYXRlIGFuZCBsaXN0ZW5pbmcgdG8gY2hhbmdlcyB0aGF0IGlzIHVzZWQgYnkgdGhlXG4gKiB7QGxpbmsgTmdNb2RlbH0gZGlyZWN0aXZlcy5cbiAqXG4gKiAgIyMjIEV4YW1wbGVcbiAqICBgYGBcbiAqICA8RGF0ZVRpbWVQaWNrZXJGaWVsZHMgWyhuZ01vZGVsKV09XCJtb2RlbC50ZXN0XCI+XG4gKiAgYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIkRhdGVUaW1lUGlja2VyRmllbGRzW25nTW9kZWxdLERhdGVUaW1lUGlja2VyRmllbGRzW2Zvcm1Db250cm9sTmFtZV0sRGF0ZVRpbWVQaWNrZXJGaWVsZHNbZm9ybUNvbnRyb2xdLFwiICtcbiAgICAgICAgXCJkYXRldGltZXBpY2tlcmZpZWxkc1tuZ01vZGVsXSxkYXRldGltZXBpY2tlcmZpZWxkc1tmb3JtQ29udHJvbE5hbWVdLGRhdGV0aW1lcGlja2VyZmllbGRzW2Zvcm1Db250cm9sXSxcIiArXG4gICAgICAgIFwiZGF0ZVRpbWVQaWNrZXJGaWVsZHNbbmdNb2RlbF0sZGF0ZVRpbWVQaWNrZXJGaWVsZHNbZm9ybUNvbnRyb2xOYW1lXSxkYXRlVGltZVBpY2tlckZpZWxkc1tmb3JtQ29udHJvbF0sXCIgK1xuICAgICAgICBcImRhdGUtdGltZS1waWNrZXItZmllbGRzW25nTW9kZWxdLGRhdGUtdGltZS1waWNrZXItZmllbGRzW2Zvcm1Db250cm9sTmFtZV0sZGF0ZS10aW1lLXBpY2tlci1maWVsZHNbZm9ybUNvbnRyb2xdXCIsXG4gICAgcHJvdmlkZXJzOiBbREFURV9USU1FX1BJQ0tFUlNfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgXCIoZGF0ZUNoYW5nZSlcIjogXCJoYW5kbGVEYXRlQ2hhbmdlKCRldmVudClcIixcbiAgICAgICAgXCIoZGF0ZVBpY2tlck9wZW5lZClcIjogXCJoYW5kbGVQaWNrZXJPcGVuZWQoJGV2ZW50KVwiLFxuICAgICAgICBcIihkYXRlUGlja2VyQ2xvc2VkKVwiOiBcImhhbmRsZVBpY2tlckNsb3NlZCgkZXZlbnQpXCIsXG4gICAgICAgIFwiKHRpbWVQaWNrZXJPcGVuZWQpXCI6IFwiaGFuZGxlUGlja2VyT3BlbmVkKCRldmVudClcIixcbiAgICAgICAgXCIodGltZVBpY2tlckNsb3NlZClcIjogXCJoYW5kbGVQaWNrZXJDbG9zZWQoJGV2ZW50KVwiXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRpbWVQaWNrZXJzVmFsdWVBY2Nlc3NvciBleHRlbmRzIEJhc2VWYWx1ZUFjY2Vzc29yPERhdGVUaW1lUGlja2VyRmllbGRzPiB7XG4gICAgcHJpdmF0ZSBfaGFzQmVlbk9wZW5lZCA9IGZhbHNlO1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IHN1cGVyLm5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgdGhpcy52aWV3LmRhdGUgPSBub3JtYWxpemVkO1xuICAgIH1cblxuICAgIGhhbmRsZURhdGVDaGFuZ2UoYXJnczogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLl9oYXNCZWVuT3BlbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKGFyZ3MudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlUGlja2VyT3BlbmVkKGFyZ3M6IGFueSkge1xuICAgICAgICB0aGlzLl9oYXNCZWVuT3BlbmVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBoYW5kbGVQaWNrZXJDbG9zZWQoYXJnczogYW55KSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxufSJdfQ==