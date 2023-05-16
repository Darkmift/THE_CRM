import { createTheme, useTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import React from 'react';

// locals
import * as locales from '@mui/material/locale';
import { ALLOWED_LOCALES, LOCALFROMLANG } from '@/consts';
import i18n from '@/plugins/i18n';
import { AllowedLocales } from '@/types/index.type';
type SupportedLocales = keyof typeof locales;

export default function useCustomTheme(defaultLocale?: SupportedLocales) {
  const [locale, setLocale] = React.useState<SupportedLocales>(defaultLocale || 'heIL');

  React.useEffect(() => {
    const r: HTMLElement | null = document.querySelector(':root');
    if (r) r.style.setProperty('--direction', locale === 'heIL' ? 'rtl' : 'ltr');

    i18n.changeLanguage(LOCALFROMLANG[locale as AllowedLocales]);
  }, [locale]);

  const theme = useTheme();
  const themeWithLocale = React.useMemo(() => createTheme(theme, locales[locale]), [locale, theme]);

  const changeLocal = (locale: SupportedLocales): void => setLocale(locale);

  return {
    ThemeProvider,
    themeWithLocale,
    changeLocal,
    locales: ALLOWED_LOCALES,
    locale,
  };
}
