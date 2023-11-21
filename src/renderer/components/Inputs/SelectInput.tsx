/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
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
    <FormControl>
      <Controller
        control={control}
        name={id}
        defaultValue={items[0]}
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value} id={id} displayEmpty>
            {items.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        )}
      />
      <FormHelperText>{label}</FormHelperText>
    </FormControl>
  );
}
