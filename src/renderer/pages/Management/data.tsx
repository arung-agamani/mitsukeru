/* eslint-disable camelcase */
import { Button, Divider, Typography } from '@mui/material';
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { ConfigType } from './types';

const DataManagementPage = () => {
  const [config, setConfig] = useState<ConfigType[]>([]);
  const handleExport = async () => {
    const res = (await window.electron.db.export()) as any;
    if (!res.remoteSuccess) {
      toast.error('Remote export failed');
    } else {
      toast.info('Data synced with remote server');
    }
    toast.success('Local data export success');
  };

  const handleImport = async () => {
    const res = (await window.electron.db.import()) as any;
    if (!res.success) {
      toast.error('Import data failed');
      return;
    }
    toast.success('Import data succeed');
  };

  const columns = useMemo<MRT_ColumnDef<ConfigType>[]>(
    () => [
      {
        id: 'key',
        accessorKey: 'key',
        header: 'Config Name',
        enableEditing: false,
      },
      {
        id: 'value',
        accessorKey: 'value',
        header: 'Data',
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: config,
    enableEditing: (row) => row.original.key !== 'EXPORT_DATA_PATH',
    editDisplayMode: 'modal',
    onEditingRowSave: async ({ table: _table, values }) => {
      const res = await window.electron.db.setConfig(values.key, values.value);
      if (!res) {
        toast.error(`Something went wrong when editing ${values.key}`);
        return;
      }
      toast.success(`Config ${values.key} has been updated`);
      _table.setEditingRow(null);
    },
    // renderRowActions: ({ row, table: _table }) => (
    //   <Box sx={{ display: 'flex', gap: '1rem' }}>
    //     <Tooltip title="Edit">
    //       <IconButton onClick={() => _table.setEditingRow(row)}>
    //         <EditIcon />
    //       </IconButton>
    //     </Tooltip>
    //   </Box>
    // ),
  });

  useEffect(() => {
    (async () => {
      const configs = await window.electron.db.getConfig();
      console.log(configs);
      setConfig(configs.configs);
    })();
  }, []);

  return (
    <div className="container mx-auto px-4 w-full">
      <Typography variant="h3">Data Management</Typography>
      <Divider />
      <div className=" grid grid-cols-2 gap-2 py-2">
        <Typography variant="h5">Import Data</Typography>
        <Button variant="contained" onClick={() => handleImport()}>
          Import
        </Button>
        <Typography variant="h5">Export Data</Typography>
        <Button variant="contained" onClick={() => handleExport()}>
          Export
        </Button>
        <Typography variant="h5">Generate Report</Typography>
        <Button variant="contained" disabled>
          Generate
        </Button>
      </div>
      <Typography variant="h4">Saved configurations</Typography>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default DataManagementPage;
