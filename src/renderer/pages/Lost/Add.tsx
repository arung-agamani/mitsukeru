import { Grid, Typography, Box, Button } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
import TextFieldInput from '../../components/Inputs/TextFieldInput';
import SelectInput from '../../components/Inputs/SelectInput';
import { ItemType, LostItemData } from './types';

const AddLostItemPage = () => {
  const [itemData, setItemData] = useState<LostItemData | null>(null);
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
    // toast.info('Submit button clicked');
  };

  const saveData = () => {
    const payload = {
      ...itemData,
      imageData,
    };

    window.electron.db.addItem('lost', payload);
  };
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
              label="Lost Location"
              id="location"
              control={control}
            />
            <TextFieldInput
              label="Reporter's Name"
              id="reporterName"
              control={control}
            />
            <TextFieldInput
              label="Reporter's Contact"
              id="reporterContact"
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
              <Typography variant="h5">Estimated Location of Lost</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{itemData?.location}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h5">Reporter&apos;s Name</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{itemData?.reporterName}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h5">Reporter&apos;s Contact</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                {itemData?.reporterContact}
              </Typography>
            </Grid>
          </Grid>
          <Typography>Item Picture (if any)</Typography>
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
