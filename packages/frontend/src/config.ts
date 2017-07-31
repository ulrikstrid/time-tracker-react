import moment from "moment";
import { IDatePickerStrings } from "office-ui-fabric-react/lib/DatePicker";

export const dayPickerStrings: IDatePickerStrings = {
  months: moment.months(),
  shortMonths: moment.monthsShort(),
  days: moment.weekdays(),
  shortDays: moment.weekdaysShort(),

  goToToday: "Gå till idag",
  prevMonthAriaLabel: "Gå till föregående månad",
  nextMonthAriaLabel: "Gå till nästa månad",
  prevYearAriaLabel: "Gå till föregående år",
  nextYearAriaLabel: "Gå till nästa år"
};
