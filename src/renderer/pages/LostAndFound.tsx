/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { AppBar, Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import TextFieldInput from '../components/Inputs/TextFieldInput';
import SelectInput from '../components/Inputs/SelectInput';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ItemType = [
  'Phone',
  'Wallet',
  'CosplayProps',
  'Cash',
  'Documents',
  'Package',
  'Others',
];

export default function LostAndFoundPage() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="Lost" />
          <Tab label="Found" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TextFieldInput label="Nama Barang" id="name" />
        <SelectInput label="Tipe Barang" id="type" items={ItemType} />
        <TextFieldInput label="Nama Barang" id="name" />
      </TabPanel>
    </>
  );
}
