import * as locales from '@mui/material/locale';
export type SupportedLocales = keyof typeof locales;
export type AllowedLocales = 'heIL' | 'enUS';

export interface CountryType {
  code: string;
  lang: SupportedLocales;
  label: string;
  phone: string;
  suggested?: boolean;
}
