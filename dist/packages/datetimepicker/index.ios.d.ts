import { DateTimePickerBase, DateTimePickerStyleBase, DatePickerOptions, TimePickerOptions, PickerOptions } from './common';
export * from './utils';
export * from './ui';
export declare class DateTimePickerStyle extends DateTimePickerStyleBase {
}
export declare class DateTimePicker extends DateTimePickerBase {
    private static readonly SUPPORT_DATE_PICKER_STYLE;
    private static readonly SUPPORT_TEXT_COLOR;
    private static readonly DEFAULT_DATE_PICKER_STYLE;
    private static readonly DEFAULT_TIME_PICKER_STYLE;
    static PICKER_DEFAULT_MESSAGE_HEIGHT: number;
    static PICKER_WIDTH_INSETS: number;
    static PICKER_WIDTH_PAD: number;
    static PICKER_DEFAULT_OFFSET: number;
    static PICKER_DEFAULT_TITLE_OFFSET: number;
    static PICKER_DEFAULT_TITLE_HEIGHT: number;
    static PICKER_DEFAULT_MESSAGE: string;
    static pickDate(options: DatePickerOptions, style?: DateTimePickerStyle): Promise<Date>;
    static pickTime(options: TimePickerOptions, style?: DateTimePickerStyle): Promise<Date>;
    static _createNativeDatePicker(options: DatePickerOptions): UIDatePicker;
    static _createNativeTimePicker(options: TimePickerOptions): UIDatePicker;
    static _createNativeDialog(nativePicker: UIDatePicker, options: PickerOptions, style: DateTimePickerStyle, callback: Function): UIAlertController;
    static _showNativeDialog(nativeDialog: UIAlertController, nativePicker: UIDatePicker, style: DateTimePickerStyle): void;
    private static _applyDialogTitleTextColor;
    private static _applyDialogSpinnersColors;
    private static _applyDialogButtonTextColor;
    private static _applyBackgroundColors;
    private static _clearVibrancyEffects;
    private static _getLabelContainer;
    private static _findLabelWithText;
}
