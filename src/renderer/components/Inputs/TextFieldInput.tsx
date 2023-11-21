/* eslint-disable react/function-component-definition */

import { TextField } from '@mui/material';
import React from 'react';

interface TextFieldInputProps {
  label: string;
  id: string;
}

const TextFieldInput: React.FC<TextFieldInputProps> = ({ label, id }) => {
  return (
    <div>
      <TextField label={label} id={id} variant="filled" />
    </div>
  );
};

export default TextFieldInput;
