import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';

interface SelectInputProps {
  label: string;
  id: string;
  items: string[];
}

export default function SelectInput(props: SelectInputProps) {
  const { label, id, items } = props;
  const [value, setValue] = useState(items[0] || '');
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };
  return (
    <Select label={label} onChange={handleChange} value={value} id={id}>
      {items.map((item) => {
        return <MenuItem value={item}>{item}</MenuItem>;
      })}
    </Select>
  );
}
