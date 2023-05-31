import { Direction } from '@mui/material';
// import {
//   enUS as datePickerLocaleEnglish,
// } from '@mui/x-date-pickers';
import {
  enUS as materialLocaleEnglish,
  heIL as materialLocaleHebrew,
  Localization,
} from '@mui/material/locale';

import 'dayjs/locale/ja';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import 'dayjs/locale/he';

export interface MUILocaleData {
  muiCore: Localization;
  // muiDatePicker: any;
  dayJSLanguage: string;
  title: string;
  direction: Direction;
}

const english: MUILocaleData = {
  muiCore: materialLocaleEnglish,
  // muiDatePicker: datePickerLocaleEnglish,
  dayJSLanguage: 'en',
  title: 'English',
  direction: 'ltr',
};

// RTL language
const hebrew: MUILocaleData = {
  muiCore: materialLocaleHebrew,
  // muiDatePicker: datePickerLocaleEnglish, // no Hebrew in here 😔 very sad!
  dayJSLanguage: 'he',
  title: 'Hebrew',
  direction: 'rtl',
};

export const supportedLocales: MUILocaleData[] = [english, hebrew];
