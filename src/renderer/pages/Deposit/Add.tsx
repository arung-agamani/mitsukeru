import { Grid, Typography, Box, Button } from '@mui/material';
import React, { useState } from 'react';
// import Webcam from 'react-webcam';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import TextFieldInput from '../../components/Inputs/TextFieldInput';
import SelectInput from '../../components/Inputs/SelectInput';
import { DepositItemData, ItemType } from './types';

const AddDepositItemPage = () => {
  const [itemData, setItemData] = useState<DepositItemData | null>(null);
  // const [imageData, setImageData] = useState<string>('');
  const { handleSubmit, control } = useForm();
  // const webcamRef = useRef<Webcam | null>(null);

  // const capture = useCallback(() => {
  //   if (!webcamRef.current) return;
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   if (imageSrc) setImageData(imageSrc);
  // }, [webcamRef]);
  const saveData = () => {
    const payload = {
      ...itemData,
    };

    window.electron.db.addItem('deposit', payload);
  };

  const submit = (data: any) => {
    setItemData(data);
    toast.info('Submit button clicked');
    saveData();
  };
  // TODO : Fix the form fields
  return (
    <Grid container spacing={2} padding="1rem 1rem">
      <Grid item xs={6}>
        <Typography variant="h4">Tambah Item</Typography>
        <form onSubmit={handleSubmit(submit)}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextFieldInput label="Item Name" id="name" control={control} />
            <SelectInput
              label="Item Type"
              id="type"
              items={ItemType}
              control={control}
            />
            <TextFieldInput
              label="Description"
              id="description"
              control={control}
            />
            <TextFieldInput
              label="Found Location"
              id="location"
              control={control}
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
            {/* <Webcam
              audio={false}
              screenshotFormat="image/png"
              videoConstraints={{
                width: 640,
                height: 480,
                facingMode: 'user',
              }}
              ref={webcamRef}
            /> */}
          </Box>
        </form>
      </Grid>
      {/* <Grid item xs={6}>
        <Typography variant="h4">Preview Item</Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h5">Item Name</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{itemData?.name}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h5">Item Type</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{itemData?.type}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h5">Description</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{itemData?.description}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h5">Found item location</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{itemData?.location}</Typography>
            </Grid>
          </Grid>
          <Typography>Item Picture</Typography>
          {imageData && <img src={imageData} alt="Item" />}
          <Button variant="contained" onClick={() => saveData()}>
            Save Data
          </Button>
        </Box>
      </Grid> */}
    </Grid>
  );
};

export default AddDepositItemPage;
