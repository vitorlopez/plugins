import { ContentView, Frame } from '@nativescript/core';
export const CSS_NAME = 'date-time-picker';
export const SPINNERS_CSS_NAME = 'date-time-picker-spinners';
export const BUTTONS_CSS_NAME = 'date-time-picker-buttons';
export const BUTTON_OK_CSS_NAME = 'date-time-picker-button-ok';
export const BUTTON_CANCEL_CSS_NAME = 'date-time-picker-button-cancel';
export class DateTimePickerBase {
    static pickDate(options, style) {
        return Promise.resolve(null);
    }
    static pickTime(options, style) {
        return Promise.resolve(null);
    }
}
export class DateTimePickerStyleBase {
    static create(view) {
        let style = new DateTimePickerStyleBase();
        const pickerColors = getColorsForClassName(view, CSS_NAME);
        const pickerSpinnersColors = getColorsForClassName(view, SPINNERS_CSS_NAME);
        const pickerButtonsColors = getColorsForClassName(view, BUTTONS_CSS_NAME);
        const pickerButtonOkColors = getColorsForClassName(view, BUTTON_OK_CSS_NAME);
        const pickerButtonCancelColors = getColorsForClassName(view, BUTTON_CANCEL_CSS_NAME);
        style.dialogBackgroundColor = pickerColors.backgroundColor;
        style.titleTextColor = pickerColors.color;
        style.spinnersBackgroundColor = pickerSpinnersColors.backgroundColor;
        style.spinnersTextColor = pickerSpinnersColors.color;
        style.buttonsBackgroundColor = pickerButtonsColors.backgroundColor;
        style.buttonsTextColor = pickerButtonsColors.color;
        style.buttonOkBackgroundColor = pickerButtonOkColors.backgroundColor;
        style.buttonOkTextColor = pickerButtonOkColors.color;
        style.buttonCancelBackgroundColor = pickerButtonCancelColors.backgroundColor;
        style.buttonCancelTextColor = pickerButtonCancelColors.color;
        return style;
    }
}
export function getCurrentPage() {
    let topmostFrame = Frame.topmost();
    if (topmostFrame) {
        return topmostFrame.currentPage;
    }
    return undefined;
}
function getColorsForClassName(view, className) {
    let color;
    let backgroundColor;
    let tempView = new ContentView();
    const ngKey = Object.keys(view).find((key) => key.startsWith('_ngcontent'));
    const vueKey = Object.keys(view).find((key) => key.startsWith('data-v'));
    if (ngKey) {
        tempView[ngKey] = view[ngKey];
    }
    if (vueKey) {
        tempView[vueKey] = view[vueKey];
    }
    if (view.className) {
        let classNames = view.className.split(' ');
        classNames.forEach((element) => {
            tempView.cssClasses.add(element);
        });
    }
    if (className) {
        tempView.cssClasses.add(className);
    }
    applySelectors(tempView, (v) => {
        color = v.color;
        backgroundColor = v.backgroundColor;
    });
    return { color: color, backgroundColor: backgroundColor };
}
function applySelectors(view, callback) {
    let currentPage = getCurrentPage();
    if (currentPage) {
        let styleScope = currentPage['_styleScope'];
        if (styleScope) {
            view['_inheritStyleScope'](styleScope);
            view.onLoaded();
            callback(view);
            view.onUnloaded();
        }
    }
}
//# sourceMappingURL=common.js.map