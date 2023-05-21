import { CountryType, AllowedLocales } from './types/index.type';

export const VALID_YEAR_REGEX = /^(200[0-9]|20[1-9][0-9]|2100)$/;
export const VALID_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const IMAGE_ASSETS_FOLDER_PATH = '/assets/images';

export const ALLOWED_LOCALES: AllowedLocales[] = ['heIL', 'enUS'];
export const COUNTRIES: readonly CountryType[] = [
  {
    code: 'US',
    lang: 'enUS',
    label: 'United States',
    phone: '1',
  },
  { code: 'IL', lang: 'heIL', label: 'Israel', phone: '972' },
];

export const LOCALFROMLANG: { [key in 'enUS' | 'heIL']: 'en' | 'he' } = {
  enUS: 'en',
  heIL: 'he',
};
