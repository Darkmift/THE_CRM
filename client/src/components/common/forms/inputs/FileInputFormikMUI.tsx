import { FormControl, Grid, TextField } from '@mui/material';
import { Field } from 'formik';
import React, { useEffect, useState } from 'react';
import { IMAGE_ASSETS_FOLDER_PATH } from '@/consts';
import { FormikFieldTouchedOrErrorObject } from '@/types/index.type';

type FilePayload = {
  currentTarget: {
    name: string;
    files: [File];
    value: File;
  };
};

type Props = {
  fieldName: string;
  touched: FormikFieldTouchedOrErrorObject;
  errors: FormikFieldTouchedOrErrorObject;
  onChange: (evt: FilePayload) => void;
  originalFileSrc?: string;
};

function FileInputFormikMUI({ onChange, fieldName, touched, errors, originalFileSrc }: Props) {
  const defaultImg = IMAGE_ASSETS_FOLDER_PATH + '/projects/default-project-img.jpg';

  // added state to hold the image file url
  const [imageSrc, setImageSrc] = useState<string | undefined>(originalFileSrc);

  useEffect(() => {
    setImageSrc(originalFileSrc);
  }, [originalFileSrc]);

  // function to convert File object to url
  const getFileUrl = (file: File) => {
    return URL.createObjectURL(file);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList: FileList | null = event.target.files;
    if (fileList && fileList.length > 0) {
      const file: File = fileList[0];

      // set the image source url state
      setImageSrc(getFileUrl(file));

      // call props onChange to pass the File object
      onChange({
        currentTarget: {
          name: fieldName,
          files: [file],
          value: file,
        },
      });
    }
  };

  return (
    <Field name={fieldName}>
      {({ field }: { field: { name: string } }) => {
        const isError = !!(touched[fieldName] && errors[fieldName]);
        return (
          <FormControl fullWidth margin="normal" error={isError}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <img width={175} height={175} src={imageSrc || defaultImg} alt={fieldName} />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  sx={{ py: 1 }}
                  fullWidth
                  variant="standard"
                  id={fieldName}
                  name={field.name}
                  onChange={handleOnChange}
                  // value={field.value || ''}
                  label={field.name.toUpperCase()}
                  type="file"
                  InputLabelProps={{ shrink: fieldName === 'image' }}
                  error={isError}
                  helperText={touched[fieldName] && errors[fieldName]}
                />
              </Grid>
            </Grid>
          </FormControl>
        );
      }}
    </Field>
  );
}

export default FileInputFormikMUI;
