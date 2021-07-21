import { NgModule } from "@angular/core";
import { registerElement } from "@nativescript/angular";
import { DatePickerField, TimePickerField, DateTimePickerFields } from "@nativescript/datetimepicker";
import { DatePickerFieldDirective, TimePickerFieldDirective, DateTimePickerFieldsDirective, } from "./nativescript-datetimepicker.directives";
import { DatePickerValueAccessor, TimePickerValueAccessor, DateTimePickersValueAccessor, } from "./nativescript-datetimepicker.accessors";
export { DatePickerFieldDirective, TimePickerFieldDirective, DateTimePickerFieldsDirective, } from "./nativescript-datetimepicker.directives";
export { DatePickerValueAccessor, TimePickerValueAccessor, DateTimePickersValueAccessor, } from "./nativescript-datetimepicker.accessors";
export class NativeScriptDateTimePickerModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3RHLE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsd0JBQXdCLEVBQ3hCLDZCQUE2QixHQUM5QixNQUFNLDBDQUEwQyxDQUFDO0FBQ2xELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsdUJBQXVCLEVBQ3ZCLDRCQUE0QixHQUM3QixNQUFNLHlDQUF5QyxDQUFDO0FBRWpELE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsd0JBQXdCLEVBQ3hCLDZCQUE2QixHQUM5QixNQUFNLDBDQUEwQyxDQUFDO0FBQ2xELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsdUJBQXVCLEVBQ3ZCLDRCQUE0QixHQUM3QixNQUFNLHlDQUF5QyxDQUFDO0FBb0JqRCxNQUFNLE9BQU8sZ0NBQWdDOzs7WUFsQjVDLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osd0JBQXdCO29CQUN4Qix3QkFBd0I7b0JBQ3hCLDZCQUE2QjtvQkFDN0IsdUJBQXVCO29CQUN2Qix1QkFBdUI7b0JBQ3ZCLDRCQUE0QjtpQkFDN0I7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLHdCQUF3QjtvQkFDeEIsd0JBQXdCO29CQUN4Qiw2QkFBNkI7b0JBQzdCLHVCQUF1QjtvQkFDdkIsdUJBQXVCO29CQUN2Qiw0QkFBNEI7aUJBQzdCO2FBQ0Y7O0FBR0QsZUFBZSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzFELGVBQWUsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUMxRCxlQUFlLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJAbmF0aXZlc2NyaXB0L2FuZ3VsYXJcIjtcbmltcG9ydCB7IERhdGVQaWNrZXJGaWVsZCwgVGltZVBpY2tlckZpZWxkLCBEYXRlVGltZVBpY2tlckZpZWxkcyB9IGZyb20gXCJAbmF0aXZlc2NyaXB0L2RhdGV0aW1lcGlja2VyXCI7XG5pbXBvcnQge1xuICBEYXRlUGlja2VyRmllbGREaXJlY3RpdmUsXG4gIFRpbWVQaWNrZXJGaWVsZERpcmVjdGl2ZSxcbiAgRGF0ZVRpbWVQaWNrZXJGaWVsZHNEaXJlY3RpdmUsXG59IGZyb20gXCIuL25hdGl2ZXNjcmlwdC1kYXRldGltZXBpY2tlci5kaXJlY3RpdmVzXCI7XG5pbXBvcnQge1xuICBEYXRlUGlja2VyVmFsdWVBY2Nlc3NvcixcbiAgVGltZVBpY2tlclZhbHVlQWNjZXNzb3IsXG4gIERhdGVUaW1lUGlja2Vyc1ZhbHVlQWNjZXNzb3IsXG59IGZyb20gXCIuL25hdGl2ZXNjcmlwdC1kYXRldGltZXBpY2tlci5hY2Nlc3NvcnNcIjtcblxuZXhwb3J0IHtcbiAgRGF0ZVBpY2tlckZpZWxkRGlyZWN0aXZlLFxuICBUaW1lUGlja2VyRmllbGREaXJlY3RpdmUsXG4gIERhdGVUaW1lUGlja2VyRmllbGRzRGlyZWN0aXZlLFxufSBmcm9tIFwiLi9uYXRpdmVzY3JpcHQtZGF0ZXRpbWVwaWNrZXIuZGlyZWN0aXZlc1wiO1xuZXhwb3J0IHtcbiAgRGF0ZVBpY2tlclZhbHVlQWNjZXNzb3IsXG4gIFRpbWVQaWNrZXJWYWx1ZUFjY2Vzc29yLFxuICBEYXRlVGltZVBpY2tlcnNWYWx1ZUFjY2Vzc29yLFxufSBmcm9tIFwiLi9uYXRpdmVzY3JpcHQtZGF0ZXRpbWVwaWNrZXIuYWNjZXNzb3JzXCI7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERhdGVQaWNrZXJGaWVsZERpcmVjdGl2ZSxcbiAgICBUaW1lUGlja2VyRmllbGREaXJlY3RpdmUsXG4gICAgRGF0ZVRpbWVQaWNrZXJGaWVsZHNEaXJlY3RpdmUsXG4gICAgRGF0ZVBpY2tlclZhbHVlQWNjZXNzb3IsXG4gICAgVGltZVBpY2tlclZhbHVlQWNjZXNzb3IsXG4gICAgRGF0ZVRpbWVQaWNrZXJzVmFsdWVBY2Nlc3NvcixcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERhdGVQaWNrZXJGaWVsZERpcmVjdGl2ZSxcbiAgICBUaW1lUGlja2VyRmllbGREaXJlY3RpdmUsXG4gICAgRGF0ZVRpbWVQaWNrZXJGaWVsZHNEaXJlY3RpdmUsXG4gICAgRGF0ZVBpY2tlclZhbHVlQWNjZXNzb3IsXG4gICAgVGltZVBpY2tlclZhbHVlQWNjZXNzb3IsXG4gICAgRGF0ZVRpbWVQaWNrZXJzVmFsdWVBY2Nlc3NvcixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTmF0aXZlU2NyaXB0RGF0ZVRpbWVQaWNrZXJNb2R1bGUge31cblxucmVnaXN0ZXJFbGVtZW50KFwiRGF0ZVBpY2tlckZpZWxkXCIsICgpID0+IERhdGVQaWNrZXJGaWVsZCk7XG5yZWdpc3RlckVsZW1lbnQoXCJUaW1lUGlja2VyRmllbGRcIiwgKCkgPT4gVGltZVBpY2tlckZpZWxkKTtcbnJlZ2lzdGVyRWxlbWVudChcIkRhdGVUaW1lUGlja2VyRmllbGRzXCIsICgpID0+IERhdGVUaW1lUGlja2VyRmllbGRzKTtcbiJdfQ==