/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_TableInstance,
} from 'material-react-table';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
// import InfoIcon from '@mui/icons-material/Info';
// import { Link } from 'react-router-dom';

import { ItemData } from '../LostAndFound';
import ItemDisplay from '../../components/ItemDisplay';
import { ItemType } from './types';

export default function FoundSearchPage() {
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
        editVariant: 'select',
        editSelectOptions: ItemType,
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'location',
        header: 'Location',
      },
      {
        id: 'status',
        accessorFn: (row) => row.status || 'UNKNOWN',
        Cell: ({ cell }) => cell.getValue<string>().toUpperCase(),
        header: 'Status',
        editVariant: 'select',
        editSelectOptions: ['reported', 'claimed'],
      },
    ],
    [],
  );

  const tableSetting: MRT_TableInstance<ItemData> = useMaterialReactTable({
    columns,
    data: items,
    enableGlobalFilter: true,
    enableEditing: true,
    editDisplayMode: 'modal',
    onEditingRowSave: async ({ table: _table, values, row }) => {
      const res = await window.electron.db.editItem(
        'found',
        row.original.id!,
        values,
      );
      if (!res) {
        toast.error('Something went wrong when editing lost item');
        return;
      }
      toast.info(`Item with name ${row.original.name} has been updated.`);
      _table.setEditingRow(null);
    },
    renderDetailPanel: (prop) => {
      return <ItemDisplay data={prop.row.original} />;
    },
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        {/* <Link to={`/lnf-lost-detail?id=${row.original.id}`}>
          <Tooltip title="Details">
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Link> */}
      </Box>
    ),
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
      const lostItems = await window.electron.db.listItem('found');
      setItems(lostItems);
    })();
  }, []);
  return (
    <Box padding="1rem">
      <Typography variant="h4">Found Items List</Typography>
      <MaterialReactTable table={tableSetting} />
    </Box>
  );
}
