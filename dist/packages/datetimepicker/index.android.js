import { getDateNow, getDateToday, LocalizationUtils } from "./utils";
import { DateTimePickerBase, DateTimePickerStyleBase } from "./common";
export * from './utils';
export * from './ui';
let DialogListener;
let AppCompatNamespace;
function initializeAppCompatNamespace() {
    if (AppCompatNamespace) {
        return;
    }
    if (global.androidx && global.androidx.appcompat) {
        AppCompatNamespace = global.androidx.appcompat;
    }
    else {
        AppCompatNamespace = android.support.v7;
    }
}
function initializeDialogListener() {
    if (DialogListener) {
        return;
    }
    let DialogListenerImpl = class DialogListenerImpl extends java.lang.Object {
        constructor(nativePicker, dateTime, callback) {
            super();
            this.nativePicker = nativePicker;
            this.dateTime = dateTime;
            this.callback = callback;
            this._isClicked = false;
            return global.__native(this);
        }
        onClick(dialog, which) {
            const callback = this.callback;
            const dateTime = this.dateTime;
            const nativePicker = this.nativePicker;
            this._isClicked = true;
            switch (which) {
                case android.content.DialogInterface.BUTTON_POSITIVE: {
                    if (nativePicker instanceof android.widget.DatePicker) {
                        dateTime.setFullYear(this.nativePicker.getYear());
                        dateTime.setMonth(this.nativePicker.getMonth());
                        dateTime.setDate(this.nativePicker.getDayOfMonth());
                    }
                    else if (nativePicker instanceof android.widget.TimePicker) {
                        dateTime.setHours(this.nativePicker.getCurrentHour());
                        dateTime.setMinutes(this.nativePicker.getCurrentMinute());
                    }
                    callback(dateTime);
                    return;
                }
            }
            callback(null);
        }
        onDismiss(dialog) {
            if (this._isClicked) {
                // The Picker is dismissed due to a button click,
                // so the callback is already called.
                return;
            }
            const callback = this.callback;
            callback(null);
        }
    };
    DialogListenerImpl = __decorate([
        NativeClass(),
        Interfaces([android.content.DialogInterface.OnClickListener, android.content.DialogInterface.OnDismissListener]),
        __metadata("design:paramtypes", [Object, Date, Function])
    ], DialogListenerImpl);
    DialogListener = DialogListenerImpl;
}
export class DateTimePickerStyle extends DateTimePickerStyleBase {
}
export class DateTimePicker extends DateTimePickerBase {
    static pickDate(options, style) {
        const pickDate = new Promise((resolve) => {
            let originalLocale;
            if (options.locale) {
                originalLocale = java.util.Locale.getDefault();
                let preferredLocale = LocalizationUtils.createNativeLocale(options.locale);
                java.util.Locale.setDefault(preferredLocale);
            }
            const nativeDatePicker = DateTimePicker._createNativeDatePicker(options);
            const nativeDialog = DateTimePicker._createNativeDialog(nativeDatePicker, options, options.date, (result) => {
                if (originalLocale) {
                    java.util.Locale.setDefault(originalLocale);
                }
                resolve(result);
            });
            DateTimePicker._showNativeDialog(nativeDialog, nativeDatePicker, style);
        });
        return pickDate;
    }
    static pickTime(options, style) {
        const pickTime = new Promise((resolve) => {
            let originalLocale;
            if (options.locale) {
                originalLocale = options.context.getResources().getConfiguration().locale;
                let preferredLocale = LocalizationUtils.createNativeLocale(options.locale);
                options.context.getResources().getConfiguration().locale = preferredLocale;
            }
            const nativeTimePicker = DateTimePicker._createNativeTimePicker(options);
            const nativeDialog = DateTimePicker._createNativeDialog(nativeTimePicker, options, options.time, (result) => {
                if (originalLocale) {
                    options.context.getResources().getConfiguration().locale = originalLocale;
                }
                resolve(result);
            });
            DateTimePicker._showNativeDialog(nativeDialog, nativeTimePicker, style);
        });
        return pickTime;
    }
    static _createNativeDatePicker(options) {
        const date = options.date ? new Date(options.date.getTime()) : getDateToday();
        const context = options.context;
        let datePicker = new android.widget.DatePicker(context);
        datePicker.init(date.getFullYear(), date.getMonth(), date.getDate(), null);
        datePicker.setCalendarViewShown(false);
        if (options.maxDate) {
            datePicker.setMaxDate(options.maxDate.getTime());
        }
        if (options.minDate) {
            datePicker.setMinDate(options.minDate.getTime());
        }
        return datePicker;
    }
    static _createNativeTimePicker(options) {
        const time = options.time ? new Date(options.time.getTime()) : getDateNow();
        const context = options.context;
        let timePicker = new android.widget.TimePicker(context);
        if (options.is24Hours) {
            timePicker.setIs24HourView(new java.lang.Boolean(options.is24Hours));
        }
        timePicker.setCurrentHour(new java.lang.Integer(time.getHours()));
        timePicker.setCurrentMinute(new java.lang.Integer(time.getMinutes()));
        return timePicker;
    }
    static _createNativeDialog(nativePicker, options, value, callback) {
        initializeDialogListener();
        initializeAppCompatNamespace();
        DateTimePicker._initializeTextResources(options.context);
        const context = options.context;
        let dateTime;
        if (value) {
            if (nativePicker instanceof android.widget.DatePicker) {
                const minDate = options.minDate;
                const maxDate = options.maxDate;
                value = DateTimePicker._trimDate(value, minDate, maxDate);
            }
            dateTime = new Date(value.getTime());
        }
        else {
            dateTime = (nativePicker instanceof android.widget.DatePicker) ? getDateToday() : getDateNow();
        }
        const alertDialog = new android.app.AlertDialog.Builder(context);
        const dialogListener = new DialogListener(nativePicker, dateTime, callback);
        if (options.title) {
            alertDialog.setTitle(options.title);
        }
        alertDialog.setOnDismissListener(dialogListener);
        const cancelButtonText = options.cancelButtonText ? options.cancelButtonText : this._defaultCancelText;
        const okButtonText = options.okButtonText ? options.okButtonText : this._defaultOkText;
        alertDialog.setNegativeButton(cancelButtonText, dialogListener);
        alertDialog.setPositiveButton(okButtonText, dialogListener);
        alertDialog.setView(nativePicker);
        return alertDialog;
    }
    static _showNativeDialog(nativePickerBuilder, nativePicker, style) {
        let nativeDialog = nativePickerBuilder.show();
        if (style) {
            const buttonOkTextColor = style.buttonOkTextColor ? style.buttonOkTextColor : style.buttonsTextColor;
            const buttonOkBackgroundColor = style.buttonOkBackgroundColor ? style.buttonOkBackgroundColor : style.buttonsBackgroundColor;
            const buttonCancelTextColor = style.buttonCancelTextColor ? style.buttonCancelTextColor : style.buttonsTextColor;
            const buttonCancelBackgroundColor = style.buttonCancelBackgroundColor ? style.buttonCancelBackgroundColor : style.buttonsBackgroundColor;
            DateTimePicker._applyDialogColors(nativeDialog, style.titleTextColor, style.dialogBackgroundColor);
            DateTimePicker._applyDialogSpinnersColors(nativePicker, style.spinnersTextColor, style.spinnersBackgroundColor);
            DateTimePicker._applyDialogOkButtonColors(nativeDialog, buttonOkTextColor, buttonOkBackgroundColor);
            DateTimePicker._applyDialogCancelButtonColors(nativeDialog, buttonCancelTextColor, buttonCancelBackgroundColor);
        }
    }
    static _trimDate(originalDate, minDate, maxDate) {
        let finalDate = originalDate;
        if (minDate !== undefined && minDate > finalDate) {
            finalDate = minDate;
        }
        if (maxDate !== undefined && maxDate < finalDate) {
            finalDate = maxDate;
        }
        return finalDate;
    }
    static _applyDialogColors(nativeDialog, color, backgroundColor) {
        if (backgroundColor) {
            nativeDialog.getWindow().setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(backgroundColor.android));
        }
        if (color) {
            const label = DateTimePicker._findViewById(nativeDialog, "android:id/alertTitle");
            if (label) {
                label.setTextColor(color.android);
            }
        }
    }
    static _applyDialogSpinnersColors(nativePicker, color, backgroundColor) {
        if (backgroundColor) {
            nativePicker.setBackgroundColor(backgroundColor.android);
        }
        if (color) {
            if (nativePicker instanceof android.widget.DatePicker) {
                const yearView = DateTimePicker._findViewById(nativePicker, "android:id/year");
                DateTimePicker._applyNumberPickerColor(yearView, color);
                const monthView = DateTimePicker._findViewById(nativePicker, "android:id/month");
                DateTimePicker._applyNumberPickerColor(monthView, color);
                const dayView = DateTimePicker._findViewById(nativePicker, "android:id/day");
                DateTimePicker._applyNumberPickerColor(dayView, color);
            }
            else if (nativePicker instanceof android.widget.TimePicker) {
                const hourView = DateTimePicker._findViewById(nativePicker, "android:id/hour");
                DateTimePicker._applyNumberPickerColor(hourView, color);
                const dividerView = DateTimePicker._findViewById(nativePicker, "android:id/divider");
                DateTimePicker._applyTextViewColor(dividerView, color);
                const minuteView = DateTimePicker._findViewById(nativePicker, "android:id/minute");
                DateTimePicker._applyNumberPickerColor(minuteView, color);
                const amPmView = DateTimePicker._findViewById(nativePicker, "android:id/amPm");
                DateTimePicker._applyNumberPickerColor(amPmView, color);
            }
        }
    }
    static _applyDialogOkButtonColors(nativePicker, color, backgroundColor) {
        if (backgroundColor) {
            nativePicker.getButton(android.content.DialogInterface.BUTTON_POSITIVE).setBackgroundColor(backgroundColor.android);
        }
        if (color) {
            nativePicker.getButton(android.content.DialogInterface.BUTTON_POSITIVE).setTextColor(color.android);
        }
    }
    static _applyDialogCancelButtonColors(nativePicker, color, backgroundColor) {
        if (backgroundColor) {
            nativePicker.getButton(android.content.DialogInterface.BUTTON_NEGATIVE).setBackgroundColor(backgroundColor.android);
        }
        if (color) {
            nativePicker.getButton(android.content.DialogInterface.BUTTON_NEGATIVE).setTextColor(color.android);
        }
    }
    static _applyTextViewColor(textView, color) {
        if (!textView || !color) {
            return;
        }
        textView.setTextColor(color.android);
    }
    static _applyNumberPickerColor(numberPicker, color) {
        const wheelPaint = DateTimePicker._findFieldByName(numberPicker, "mSelectorWheelPaint");
        const selectionDividerDrawable = DateTimePicker._findFieldByName(numberPicker, "mSelectionDivider");
        if (!wheelPaint || !selectionDividerDrawable ||
            !(wheelPaint instanceof android.graphics.Paint) ||
            !(selectionDividerDrawable instanceof android.graphics.drawable.Drawable)) {
            return;
        }
        wheelPaint.setColor(color.android);
        const childCount = numberPicker.getChildCount();
        for (let i = 0; i < childCount; i++) {
            let child = numberPicker.getChildAt(i);
            if (child instanceof android.widget.EditText) {
                child.setTextColor(color.android);
            }
        }
        const filter = AppCompatNamespace.widget.AppCompatDrawableManager.getPorterDuffColorFilter(color.android, android.graphics.PorterDuff.Mode.SRC_IN);
        selectionDividerDrawable.setColorFilter(filter);
        numberPicker.invalidate();
    }
    static _findViewById(view, id) {
        const searchId = view.getContext().getResources().getIdentifier(id, null, null);
        const searchView = view.findViewById(searchId);
        return searchView;
    }
    static _findFieldByName(view, name) {
        try {
            let field = view.getClass().getDeclaredField(name);
            field.setAccessible(true);
            return field.get(view);
        }
        catch (e) {
            return null;
        }
    }
    static _initializeTextResources(context) {
        if (DateTimePicker._defaultsInitialized) {
            return;
        }
        const resources = context.getResources();
        const okId = resources.getIdentifier("ok", "string", "android");
        const cancelId = resources.getIdentifier("cancel", "string", "android");
        DateTimePicker._defaultOkText = context.getString(okId);
        DateTimePicker._defaultCancelText = context.getString(cancelId);
        DateTimePicker._defaultsInitialized = true;
    }
}
DateTimePicker._defaultOkText = "OK";
DateTimePicker._defaultCancelText = "Cancel";
DateTimePicker._defaultsInitialized = false;
//# sourceMappingURL=index.android.js.map