/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { ItemData } from '../LostAndFound';
import AsyncImage from '../../components/AsyncImage';

export default function SearchPage() {
  const [items, setItems] = useState<ItemData[]>([]);

  const columns = useMemo<MRT_ColumnDef<ItemData>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'type',
        header: 'Type',
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'location',
        header: 'Location',
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: items,
    enableGlobalFilter: true,
    renderDetailPanel: (prop) => {
      return (
        <Box>
          <Typography>{prop.row.original.name}</Typography>
          <AsyncImage id={prop.row.original.id || ''} />
        </Box>
      );
    },
    initialState: {
      showGlobalFilter: true,
    },
    positionGlobalFilter: 'left',
    muiSearchTextFieldProps: {
      placeholder: 'Input search query here...',
      sx: {
        maxWidth: '100%',
        width: '1000px',
        minWidth: '400px',
      },
    },
  });
  useEffect(() => {
    (async () => {
      const lostItems = await window.electron.db.listItem('lost');
      setItems(lostItems);
    })();
  }, []);
  return (
    <Box padding="1rem">
      <Typography variant="h4">Lost Items List</Typography>
      <MaterialReactTable table={table} />
    </Box>
  );
}
