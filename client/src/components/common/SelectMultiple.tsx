import * as React from 'react';
import { ReactNode } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { FormHelperText, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { GenericStringValuesObject } from '@/types/index.type';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(option: string, options: unknown, theme: Theme) {
  return {
    fontWeight:
      (options as string[])?.length && (options as string[]).indexOf(option) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type Props = {
  value: unknown;
  multiple: boolean;
  name: string;
  handleChange: (evt: SelectChangeEvent | unknown) => void;
  options: GenericStringValuesObject[];
  optionLabelKey: string;
  optionIdKey: string;
  error?: boolean;
  helperText?: string;
};

function SelectMultipleMUI2({
  value,
  handleChange,
  multiple,
  name,
  options,
  optionLabelKey,
  optionIdKey,
  error,
  helperText,
}: Props) {
  const theme = useTheme();

  React.useEffect(() => {
    if (name === 'instructorId' || name === 'internshipId') {
      console.log('🚀 ~ file: SelectMultipleMUI2.tsx:57 ~ value:', {
        name,
        value,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const parseEventHandler = (
    evt:
      | SelectChangeEvent<unknown>
      | (React.MouseEventHandler<HTMLButtonElement> & { target: { name?: string; value: unknown } })
  ) => {
    if (!evt.target.value) {
      evt.target = { value: multiple ? [] : '' };
    }
    evt.target.name = name;
    handleChange(evt);
  };

  return (
    !!options && (
      <FormControl sx={{ width: '100%' }} error={error}>
        <InputLabel id="demo-multiple-chip-label">{name}</InputLabel>
        <Select
          name={name}
          sx={{ minHeight: '70px' }}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple={multiple}
          variant="standard"
          value={value}
          onChange={parseEventHandler}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected: unknown): ReactNode => {
            const selectedTyped = selected as { [key: string]: string }[];
            if (multiple) {
              return selectedTyped.map((selectOption, key: number) => {
                const selectedOption = options.find(
                  (o) => o[optionIdKey] === selectOption[optionIdKey]
                );
                if (!selectedOption) {
                  console.log(
                    '🚀 ~ file: SelectMultiple.tsx:99 ~ returnselected.map ~ selectedOption:',
                    selectedOption
                  );
                  return 'not an object';
                }
                return <Chip key={key} label={selectedOption[optionLabelKey]} />;
              });
            }

            if (selectedTyped?.[0]?.[optionIdKey]) {
              return <Chip label={selectedTyped[0][optionLabelKey] as string} variant="outlined" />;
            }

            const singleTyped = selectedTyped as unknown as { [key: string]: string };
            const selectedOption = options.find((o) => o[optionIdKey] === singleTyped[optionIdKey]);

            return <Chip label={selectedOption?.[optionLabelKey]} variant="outlined" />;
          }}
          endAdornment={
            <IconButton
              sx={{ display: value ? '' : 'none' }}
              onClick={parseEventHandler as unknown as undefined}
            >
              <ClearIcon />
            </IconButton>
          }
          MenuProps={MenuProps}
        >
          {options.map((option, key) => (
            <MenuItem
              key={key}
              value={option as unknown as string}
              style={getStyles(name, options, theme)}
            >
              {option[optionLabelKey]}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText sx={{ color: 'red' }}>{helperText}</FormHelperText>
      </FormControl>
    )
  );
}

export default SelectMultipleMUI2;
