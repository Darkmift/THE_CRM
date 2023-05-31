import * as locales from '@mui/material/locale';
import { ChangeEventHandler } from 'react';
export type SupportedLocales = keyof typeof locales;
export type AllowedLocales = 'heIL' | 'enUS';
import type { SelectChangeEvent } from '@mui/material/Select';

export interface CountryType {
  code: string;
  lang: SupportedLocales;
  label: string;
  phone: string;
  suggested?: boolean;
}

// Formik
export type FormikFieldTouchedOrErrorObject = { [key: string]: string | undefined };
export type GenericStringValuesObject = { [key: string]: string };
export type GenericUknownValuesObject = { [key: string]: unknown };
export type FormikFieldProps = {
  field: {
    name: string;
    value: string;
    onChange: (
      evt: SelectChangeEvent | unknown
    ) => void | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  };
};
export type FieldParam = {
  name: string;
  order: number;
  type: 'simple' | 'textarea' | 'selectPlain' | 'selectObject' | 'boolean';
  label?: string;
};
export type YupCustomFormData = { [key: string]: unknown };

export type Year = {
  id?: string;
  year: number;
  isEnabled: boolean;
};

export type Instructor = {
  id: string;
  name: string;
  image: string;
  description: string;
};

export type Internship = {
  id: string;
  name: string;
  image: string;
  description: string;
};

export type Member = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type Project = {
  id: string;
  name: string;
  image: string;
  description: string;
  years?: Year[];
  instructors?: Instructor[];
  internships?: Internship[];
  members?: Member[];
};

export type CrudResult = { success: boolean; message: string };
