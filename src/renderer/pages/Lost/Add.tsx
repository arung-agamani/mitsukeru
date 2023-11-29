import { Grid, Typography, Box, Button } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import TextFieldInput from '../../components/Inputs/TextFieldInput';
import SelectInput from '../../components/Inputs/SelectInput';
import { ItemData } from '../LostAndFound';

const ItemType = [
  'Phone',
  'Wallet',
  'CosplayProps',
  'Cash',
  'Documents',
  'Package',
  'Others',
];

const AddLostItemPage = () => {
  const [itemData, setItemData] = useState<ItemData | null>(null);
  const [imageData, setImageData] = useState<string>('');
  const { handleSubmit, control } = useForm();
  const webcamRef = useRef<Webcam | null>(null);

  const capture = useCallback(() => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) setImageData(imageSrc);
  }, [webcamRef]);

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
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h4">Tambah Item</Typography>
        <form onSubmit={handleSubmit(submit)}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextFieldInput label="Nama Barang" id="name" control={control} />
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
              <Typography variant="body1">{itemData?.description}</Typography>
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
  );
};

export default AddLostItemPage;
