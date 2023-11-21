/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';

interface SelectInputProps {
  label: string;
  id: string;
  items: string[];
  control?: any;
}

export default function SelectInput(props: SelectInputProps) {
  const { label, id, items, control } = props;
  return (
    <Controller
      control={control}
      name={id}
      render={({ field: { onChange, value } }) => (
        <Select label={label} onChange={onChange} value={value} id={id}>
          {items.map((item) => {
            return <MenuItem value={item}>{item}</MenuItem>;
          })}
        </Select>
      )}
    />
  );
}
