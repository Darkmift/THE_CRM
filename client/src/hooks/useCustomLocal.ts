import { createTheme, Direction, PaletteMode } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';

// locals
import * as locales from '@mui/material/locale';
import { enUS, heIL } from '@mui/material/locale';

import { ALLOWED_LOCALES, LOCALFROMLANG } from '@/consts';
import i18n from '@/plugins/i18n';
import { AllowedLocales } from '@/types/index.type';
type SupportedLocales = keyof typeof locales;

export default function useCustomTheme(defaultLocale?: SupportedLocales) {
  const [locale, setLocale] = React.useState<SupportedLocales>(defaultLocale || 'heIL');
  const [mode, setMode] = React.useState<PaletteMode>('light');

  const [isRtl, setIsRtl] = React.useState(false);
  const [direction, setDirection] = React.useState(locale === 'heIL' ? 'rtl' : 'ltr');

  React.useEffect(() => {
    setIsRtl(i18n.language === 'he');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  React.useEffect(() => {
    setDirection(locale === 'heIL' ? 'rtl' : 'ltr');
    i18n.changeLanguage(LOCALFROMLANG[locale as AllowedLocales]);
  }, [locale, defaultLocale]);

  React.useEffect(() => {
    const r: HTMLElement | null = document.querySelector(':root');
    if (r) r.style.setProperty('--direction', direction);
    document.dir = direction;
  }, [direction]);

  const changeLocal = (locale: SupportedLocales): void => setLocale(locale);

  const themeWithLocale = React.useMemo(() => {
    return createTheme(
      {
        palette: {
          mode,
        },
        direction: direction as Direction,
      },
      locale === 'heIL' ? heIL : enUS
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  return {
    ThemeProvider,
    themeWithLocale,
    changeLocal,
    locales: ALLOWED_LOCALES,
    locale,
    isRtl,
  };
}
