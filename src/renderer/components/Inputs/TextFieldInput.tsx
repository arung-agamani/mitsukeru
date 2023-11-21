/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */

import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

interface TextFieldInputProps {
  label: string;
  id: string;
  control: any;
}

const TextFieldInput: React.FC<TextFieldInputProps> = ({
  label,
  id,
  control,
}) => {
  return (
    <Controller
      control={control}
      name={id}
      render={({ field }) => (
        <TextField label={label} id={id} variant="filled" {...field} />
      )}
    />
  );
};

export default TextFieldInput;
