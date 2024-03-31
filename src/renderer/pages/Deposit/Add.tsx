/* eslint-disable camelcase */
import { Grid, Typography, Box, Button } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
// import Webcam from 'react-webcam';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  MRT_ColumnDef,
  MRT_TableInstance,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import TextFieldInput from '../../components/Inputs/TextFieldInput';
import SelectInput from '../../components/Inputs/SelectInput';
import { DepositItemData, ItemType } from './types';

const AddDepositItemPage = () => {
  const [itemData, setItemData] = useState<DepositItemData | null>(null);
  const [fullItemData, setFullItemData] = useState<DepositItemData[]>([]);
  // const [imageData, setImageData] = useState<string>('');
  const { handleSubmit, control } = useForm();
  // const webcamRef = useRef<Webcam | null>(null);

  // const capture = useCallback(() => {
  //   if (!webcamRef.current) return;
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   if (imageSrc) setImageData(imageSrc);
  // }, [webcamRef]);
  // const saveData = async () => {
  //   const payload = {
  //     ...itemData,
  //   };
  //   await window.electron.db.addItem('deposit', payload);
  // };

  const columns = useMemo<MRT_ColumnDef<DepositItemData>[]>(
    () => [
      {
        id: 'id',
        accessorKey: 'id',
        header: 'No',
      },
      {
        id: 'name',
        accessorKey: 'name',
        header: 'Name',
      },
      {
        id: 'type',
        accessorKey: 'type',
        header: 'Type',
      },
      {
        id: 'counter',
        accessorKey: 'counter',
        header: 'Counter',
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: 'Status',
      },
    ],
    [],
  );

  const tableSetting: MRT_TableInstance<DepositItemData> =
    useMaterialReactTable({
      columns,
      data: fullItemData,
    });

  const fetchDepositItems = async () => {
    const depositItems = await window.electron.db.listItem('deposit');
    setFullItemData(depositItems);
  };

  const submit = async (data: any) => {
    setItemData(data);
    await window.electron.db.addItem('deposit', data);
    toast.info('Submit button clicked');
    // saveData();
    fetchDepositItems();
  };

  useEffect(() => {
    fetchDepositItems();
  }, []);

  // TODO : Fix the form fields
  return (
    <Grid container spacing={2} padding="1rem 1rem">
      <Grid item xs={4}>
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
            <TextFieldInput label="Counter" id="counter" control={control} />
            <TextFieldInput
              label="Owner Name"
              id="ownerName"
              control={control}
            />
            <TextFieldInput
              label="Owner Contact"
              id="ownerContact"
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
      <Grid item xs={8}>
        <Typography variant="h4">Deposit Item</Typography>
        <Box>
          <MaterialReactTable table={tableSetting} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddDepositItemPage;
