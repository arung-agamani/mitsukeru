/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import {
  AppBar,
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Webcam from 'react-webcam';
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

export interface ItemData {
  id?: string;
  name: string;
  type: string;
  description: string;
  location: string;
}

export default function LostAndFoundPage() {
  const [value, setValue] = useState(0);
  const [itemData, setItemData] = useState<ItemData | null>(null);
  const [imageData, setImageData] = useState<string>('');
  const { handleSubmit, control } = useForm();
  const webcamRef = useRef<Webcam | null>(null);

  const capture = useCallback(() => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) setImageData(imageSrc);
  }, [webcamRef]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const submit = (data: any) => {
    setItemData(data);
    toast.info('Submit button clicked');
  };

  const saveData = () => {
    console.log('Saving data...');
    window.electron.ipcRenderer.sendMessage('ipc-example', ['Saving data...']);
    const payload = {
      ...itemData,
      imageData,
    };

    window.electron.db.addItem('lost', payload);
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
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h4">Tambah Item</Typography>
            <form onSubmit={handleSubmit(submit)}>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextFieldInput
                  label="Nama Barang"
                  id="name"
                  control={control}
                />
                <SelectInput
                  label="Tipe Barang"
                  id="type"
                  items={ItemType}
                  control={control}
                />
                <TextFieldInput
                  label="Deskripsi"
                  id="description"
                  control={control}
                />
                <TextFieldInput
                  label="Lokasi Ditemukan"
                  id="location"
                  control={control}
                />
                <Button variant="contained" type="submit" onClick={capture}>
                  Take Photo
                </Button>
                <Webcam
                  audio={false}
                  screenshotFormat="image/png"
                  videoConstraints={{
                    width: 640,
                    height: 480,
                    facingMode: 'user',
                  }}
                  ref={webcamRef}
                />
              </Box>
            </form>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4">Preview Item</Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="h5">Nama Barang</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">{itemData?.name}</Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="h5">Tipe Barang</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">{itemData?.type}</Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="h5">Deskripsi Barang</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    {itemData?.description}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="h5">
                    Perkiraan lokasi kehilangan barang
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">{itemData?.location}</Typography>
                </Grid>
              </Grid>
              <Typography>Foto terkait barang</Typography>
              {imageData && <img src={imageData} alt="Item" />}
              <Button variant="contained" onClick={() => saveData()}>
                Save Data
              </Button>
            </Box>
          </Grid>
        </Grid>
      </TabPanel>
    </>
  );
}
