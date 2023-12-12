import { Grid, Typography, Box, Button } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
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

  const saveData = async () => {
    const payload = {
      ...itemData,
      imageData,
    };

    await window.electron.db.addItem('lost', payload);
    toast.success('Item added');
  };
  return (
    <Grid container spacing={2} padding="1rem 1rem">
      <Grid item xs={6}>
        <Typography variant="h4">Add Lost Item</Typography>
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
            <Box display="flex" flexDirection="row" gap={2}>
              <Button
                variant="contained"
                type="button"
                onClick={capture}
                fullWidth
              >
                Take Photo
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                onClick={capture}
                fullWidth
              >
                Take Data
              </Button>
            </Box>
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
              <Typography variant="body1">
                {itemData?.name || 'Not set'}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h5">Item Type</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                {itemData?.type || 'Not set'}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h5">Description</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                {itemData?.description || 'Not set'}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h5">Estimated Location of Lost</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                {itemData?.location || 'Not set'}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h5">Reporter&apos;s Name</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                {itemData?.reporterName || 'Not set'}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h5">Reporter&apos;s Contact</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                {itemData?.reporterContact || 'Not set'}
              </Typography>
            </Grid>
          </Grid>
          <Button variant="contained" onClick={() => saveData()}>
            Save Data
          </Button>
          <Typography>Item Picture (if any)</Typography>
          {imageData && <img src={imageData} alt="Item" />}
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddLostItemPage;
