// MUIWrapper.tsx

import { createTheme, ThemeProvider, PaletteMode } from '@mui/material';
import { createContext, useMemo, useState, useEffect } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { MUILocaleData, supportedLocales } from './SupportedLocales';

/**
  TypeScript and React inconvenience:
  These functions are in here purely for types! 
  They will be overwritten - it's just that
  createContext must have an initial value.
  Providing a type that could be 'null | something' 
  and initiating it with *null* would be uncomfortable :)
*/
export const MUIWrapperContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleColorMode: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLocale: (locale: MUILocaleData) => {
    console.log(locale);
  },
  locale: supportedLocales[0],
});

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [],
});

const emptyCache = createCache({
  key: 'meaningless-key',
});

export default function MUIWrapper({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>('light');
  const [locale, setLocale] = useState<MUILocaleData>(supportedLocales[0]);
  const muiWrapperUtils = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  useEffect(() => {
    document.dir = locale.direction;
  }, [locale.direction]);

  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode,
          },
          direction: locale.direction,
        },
        locale.muiCore
      ),
    [mode, locale]
  );

  return (
    <CacheProvider value={locale.direction === 'rtl' ? cacheRtl : emptyCache}>
      <MUIWrapperContext.Provider
        value={{
          toggleColorMode: muiWrapperUtils.toggleColorMode,
          locale,
          setLocale,
        }}
      >
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </MUIWrapperContext.Provider>
    </CacheProvider>
  );
}
