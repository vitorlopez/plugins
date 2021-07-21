import { Color, Device } from '@nativescript/core';
import { DateTimePickerBase, DateTimePickerStyleBase } from './common';
import { getDateNow, getDateToday, LocalizationUtils } from './utils';
export * from './utils';
export * from './ui';
export class DateTimePickerStyle extends DateTimePickerStyleBase {
}
export class DateTimePicker extends DateTimePickerBase {
    static pickDate(options, style) {
        const pickDate = new Promise((resolve) => {
            const nativeDatePicker = DateTimePicker._createNativeDatePicker(options);
            const nativeDialog = DateTimePicker._createNativeDialog(nativeDatePicker, options, style, (result) => {
                resolve(result);
            });
            DateTimePicker._showNativeDialog(nativeDialog, nativeDatePicker, style);
        });
        return pickDate;
    }
    static pickTime(options, style) {
        const pickTime = new Promise((resolve) => {
            const nativeTimePicker = DateTimePicker._createNativeTimePicker(options);
            const nativeDialog = DateTimePicker._createNativeDialog(nativeTimePicker, options, style, (result) => {
                resolve(result);
            });
            DateTimePicker._showNativeDialog(nativeDialog, nativeTimePicker, style);
        });
        return pickTime;
    }
    static _createNativeDatePicker(options) {
        const pickerView = UIDatePicker.alloc().initWithFrame(CGRectZero);
        pickerView.datePickerMode = 1 /* Date */;
        if (this.SUPPORT_DATE_PICKER_STYLE) {
            pickerView.preferredDatePickerStyle = options.iosPreferredDatePickerStyle !== undefined ? options.iosPreferredDatePickerStyle : this.DEFAULT_DATE_PICKER_STYLE;
        }
        const date = options.date ? options.date : getDateToday();
        pickerView.date = date;
        if (options.maxDate) {
            pickerView.maximumDate = options.maxDate;
        }
        if (options.minDate) {
            pickerView.minimumDate = options.minDate;
        }
        if (options.locale) {
            pickerView.locale = LocalizationUtils.createNativeLocale(options.locale);
            if (options.firstWeekday !== undefined) {
                pickerView.calendar = LocalizationUtils.createNativeCalendar(options.locale, options.firstWeekday);
            }
        }
        return pickerView;
    }
    static _createNativeTimePicker(options) {
        const pickerView = UIDatePicker.alloc().initWithFrame(CGRectZero);
        pickerView.datePickerMode = 0 /* Time */;
        if (options.timeInterval) {
            pickerView.minuteInterval = options.timeInterval;
        }
        if (this.SUPPORT_DATE_PICKER_STYLE) {
            pickerView.preferredDatePickerStyle = options.iosPreferredDatePickerStyle !== undefined ? options.iosPreferredDatePickerStyle : this.DEFAULT_TIME_PICKER_STYLE;
        }
        const time = options.time ? options.time : getDateNow();
        pickerView.date = time;
        if (options.locale) {
            pickerView.locale = LocalizationUtils.createNativeLocale(options.locale);
        }
        return pickerView;
    }
    static _createNativeDialog(nativePicker, options, style, callback) {
        const alertTitle = options.title ? options.title : '';
        const alertController = UIAlertController.alertControllerWithTitleMessagePreferredStyle(alertTitle, DateTimePicker.PICKER_DEFAULT_MESSAGE, 0 /* ActionSheet */);
        const alertSize = nativePicker.preferredDatePickerStyle === 3 ? 280 : Math.min(alertController.view.frame.size.width, alertController.view.frame.size.height);
        const pickerViewWidth = UIDevice.currentDevice.userInterfaceIdiom === 1 /* Pad */ ? DateTimePicker.PICKER_WIDTH_PAD : alertSize - DateTimePicker.PICKER_WIDTH_INSETS;
        let pickerContainerFrameTop = options.title ? DateTimePicker.PICKER_DEFAULT_TITLE_OFFSET : DateTimePicker.PICKER_DEFAULT_OFFSET;
        if (options.title) {
            pickerContainerFrameTop += DateTimePicker.PICKER_DEFAULT_TITLE_HEIGHT;
        }
        const pickerViewHeight = DateTimePicker.PICKER_DEFAULT_MESSAGE_HEIGHT;
        const pickerContainer = UIView.alloc().init();
        let spinnersBackgroundColor = new Color('transparent');
        let spinnersTextColor = null;
        if (style) {
            spinnersBackgroundColor = style.spinnersBackgroundColor ? style.spinnersBackgroundColor : spinnersBackgroundColor;
            spinnersTextColor = style.spinnersTextColor;
        }
        DateTimePicker._applyDialogSpinnersColors(nativePicker, pickerContainer, spinnersTextColor, spinnersBackgroundColor);
        const pickerView = nativePicker;
        const left = (alertController.view.frame.size.width - pickerViewWidth) / 2 - DateTimePicker.PICKER_WIDTH_INSETS;
        pickerView.frame = CGRectMake(left, 0, pickerViewWidth, pickerViewHeight);
        pickerContainer.addSubview(pickerView);
        DateTimePicker._clearVibrancyEffects(alertController.view);
        const messageLabel = DateTimePicker._findLabelWithText(alertController.view, DateTimePicker.PICKER_DEFAULT_MESSAGE);
        const messageLabelContainer = DateTimePicker._getLabelContainer(messageLabel);
        messageLabelContainer.clipsToBounds = true;
        messageLabelContainer.addSubview(pickerContainer);
        pickerContainer.translatesAutoresizingMaskIntoConstraints = false;
        pickerContainer.topAnchor.constraintEqualToAnchorConstant(alertController.view.topAnchor, pickerContainerFrameTop).active = true;
        pickerContainer.leftAnchor.constraintEqualToAnchor(alertController.view.leftAnchor).active = true;
        pickerContainer.rightAnchor.constraintEqualToAnchor(alertController.view.rightAnchor).active = true;
        pickerContainer.bottomAnchor.constraintEqualToAnchor(alertController.view.bottomAnchor).active = true;
        if (nativePicker.preferredDatePickerStyle === 3) {
            pickerView.centerXAnchor.constraintEqualToAnchor(pickerContainer.centerXAnchor).active = true;
            // pickerView.leftAnchor.constraintEqualToAnchorConstant(pickerContainer.leftAnchor, left).active = true;
        }
        else {
            pickerView.leftAnchor.constraintLessThanOrEqualToAnchorConstant(pickerContainer.leftAnchor, DateTimePicker.PICKER_WIDTH_INSETS).active = true;
            pickerView.rightAnchor.constraintLessThanOrEqualToAnchorConstant(pickerContainer.rightAnchor, DateTimePicker.PICKER_WIDTH_INSETS).active = true;
        }
        const cancelButtonText = options.cancelButtonText ? options.cancelButtonText : 'Cancel';
        const okButtonText = options.okButtonText ? options.okButtonText : 'OK';
        const cancelActionStyle = style && style.buttonCancelBackgroundColor ? 0 /* Default */ : 1 /* Cancel */;
        let cancelAction = UIAlertAction.actionWithTitleStyleHandler(cancelButtonText, cancelActionStyle, () => {
            callback(null);
        });
        let okAction = UIAlertAction.actionWithTitleStyleHandler(okButtonText, 0 /* Default */, () => {
            callback(pickerView.date);
        });
        alertController.addAction(okAction);
        if (cancelButtonText) {
            alertController.addAction(cancelAction);
        }
        if (style) {
            const buttonOkTextColor = style.buttonOkTextColor ? style.buttonOkTextColor : style.buttonsTextColor;
            const buttonCancelTextColor = style.buttonCancelTextColor ? style.buttonCancelTextColor : style.buttonsTextColor;
            DateTimePicker._applyDialogButtonTextColor(okAction, buttonOkTextColor);
            DateTimePicker._applyDialogButtonTextColor(cancelAction, buttonCancelTextColor);
            DateTimePicker._applyDialogTitleTextColor(alertController, style.titleTextColor);
            DateTimePicker._applyBackgroundColors(messageLabelContainer, style);
        }
        return alertController;
    }
    static _showNativeDialog(nativeDialog, nativePicker, style) {
        const app = UIApplication.sharedApplication;
        const win = app.keyWindow || (app.windows && app.windows.count > 0 && app.windows.objectAtIndex(0));
        let viewController = win.rootViewController;
        while (viewController && viewController.presentedViewController) {
            viewController = viewController.presentedViewController;
        }
        if (viewController) {
            if (nativeDialog.popoverPresentationController) {
                nativeDialog.popoverPresentationController.sourceView = viewController.view;
                nativeDialog.popoverPresentationController.sourceRect = CGRectMake(viewController.view.bounds.size.width / 2.0, viewController.view.bounds.size.height / 2.0, 1.0, 1.0);
                nativeDialog.popoverPresentationController.permittedArrowDirections = 0;
            }
            viewController.presentViewControllerAnimatedCompletion(nativeDialog, true, () => { });
        }
    }
    static _applyDialogTitleTextColor(nativeDialog, color) {
        if (color) {
            if (nativeDialog.title) {
                let title = NSAttributedString.alloc().initWithStringAttributes(nativeDialog.title, { [NSForegroundColorAttributeName]: color.ios });
                nativeDialog.setValueForKey(title, 'attributedTitle');
            }
        }
    }
    static _applyDialogSpinnersColors(nativePicker, nativeContainer, color, backgroundColor) {
        if (backgroundColor) {
            nativeContainer.backgroundColor = backgroundColor.ios;
        }
        if (color) {
            if (this.SUPPORT_TEXT_COLOR) {
                nativePicker.setValueForKey(color.ios, 'textColor');
            }
            if (nativePicker.preferredDatePickerStyle === 1) {
                nativePicker.setValueForKey(false, 'highlightsToday');
            }
        }
    }
    static _applyDialogButtonTextColor(action, textColor) {
        if (textColor) {
            action.setValueForKey(textColor.ios, 'titleTextColor');
        }
    }
    static _applyBackgroundColors(labelContainer, style) {
        if (!labelContainer || !style) {
            return;
        }
        if (labelContainer.superview && labelContainer.superview.superview) {
            const mainContainer = labelContainer.superview.superview;
            if (style.dialogBackgroundColor) {
                mainContainer.backgroundColor = style.dialogBackgroundColor.ios;
            }
            const buttonsContainer = mainContainer.subviews.lastObject;
            let buttonsBackground = style.buttonCancelBackgroundColor;
            if (!buttonsBackground) {
                buttonsBackground = style.buttonOkBackgroundColor;
                if (!buttonsBackground) {
                    buttonsBackground = style.buttonsBackgroundColor;
                }
            }
            if (buttonsContainer && buttonsBackground) {
                buttonsContainer.backgroundColor = buttonsBackground.ios;
            }
        }
    }
    static _clearVibrancyEffects(uiView) {
        if (uiView instanceof UIVisualEffectView && uiView.effect instanceof UIVibrancyEffect) {
            // Since ios13 UIAlertController has some effects which cause
            // semi-transparency and interfere with color customizations:
            uiView.effect = null;
        }
        const subViewsCount = uiView.subviews.count;
        for (let i = 0; i < subViewsCount; i++) {
            DateTimePicker._clearVibrancyEffects(uiView.subviews[i]);
        }
    }
    static _getLabelContainer(uiView) {
        if (uiView && uiView.superview instanceof UIView) {
            return uiView.superview;
        }
        return DateTimePicker._getLabelContainer(uiView.superview);
    }
    static _findLabelWithText(uiView, text) {
        if (uiView instanceof UILabel && uiView.text === text) {
            return uiView;
        }
        const subViewsCount = uiView.subviews.count;
        for (let i = 0; i < subViewsCount; i++) {
            let label = DateTimePicker._findLabelWithText(uiView.subviews[i], text);
            if (label) {
                return label;
            }
        }
        return null;
    }
}
DateTimePicker.SUPPORT_DATE_PICKER_STYLE = parseFloat(Device.osVersion) >= 14.0;
DateTimePicker.SUPPORT_TEXT_COLOR = parseFloat(Device.osVersion) < 14.0;
DateTimePicker.DEFAULT_DATE_PICKER_STYLE = parseFloat(Device.osVersion) >= 14.0 ? 3 : 1;
DateTimePicker.DEFAULT_TIME_PICKER_STYLE = 1;
DateTimePicker.PICKER_DEFAULT_MESSAGE_HEIGHT = parseFloat(Device.osVersion) >= 14.0 ? 300 : 192;
DateTimePicker.PICKER_WIDTH_INSETS = 16;
DateTimePicker.PICKER_WIDTH_PAD = 304;
DateTimePicker.PICKER_DEFAULT_OFFSET = 16;
DateTimePicker.PICKER_DEFAULT_TITLE_OFFSET = 26.5;
DateTimePicker.PICKER_DEFAULT_TITLE_HEIGHT = 16;
DateTimePicker.PICKER_DEFAULT_MESSAGE = parseFloat(Device.osVersion) >= 14.0 ? '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n' : '\n\n\n\n\n\n\n\n\n';
//# sourceMappingURL=index.ios.js.map