import React, { useEffect } from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import useCustomTheme from '@/hooks/useCustomLocal';
import { COUNTRIES } from '@/consts';
import { CountryType } from '@/types/index.type';

export default function CountrySelect({
  handleCloseUserMenu,
}: {
  handleCloseUserMenu: () => void;
}) {
  const { changeLocal, locale } = useCustomTheme();

  const [country, setCountry] = React.useState('');
  useEffect(() => {
    const targetCountry: CountryType = COUNTRIES.find((c) => c.lang === locale) || COUNTRIES[0];
    setCountry(targetCountry.code);
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    handleCloseUserMenu();
    const code: string = event.target.value;
    setCountry(code);
    const targetCountry: CountryType | undefined = COUNTRIES.find((c) => c.code === code);
    if (targetCountry?.lang) {
      changeLocal(targetCountry.lang);
    } else {
      console.warn('error setting locale:', { locale, code, targetCountry });
    }
  };
  return (
    <>
      <Select
        disableUnderline={true}
        variant="standard"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={country}
        label="Age"
        onChange={handleChange}
      >
        {COUNTRIES.map((country) => (
          <MenuItem key={country.code} value={country.code}>
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
              alt=""
            />
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
