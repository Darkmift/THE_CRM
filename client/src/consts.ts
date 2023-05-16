import { CountryType, AllowedLocales } from './types/index.type';

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
