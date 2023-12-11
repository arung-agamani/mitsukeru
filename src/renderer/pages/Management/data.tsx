import { Button, Divider, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const DataManagementPage = () => {
  const handleExport = async () => {
    const res = (await window.electron.db.export()) as any;
    console.log(res);
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

  useEffect(() => {
    (async () => {
      const configs = await window.electron.db.getConfig();
      console.log(configs);
    })();
  }, []);
  return (
    <div className="container mx-auto px-4 w-full">
      <Typography variant="h3">Data Management</Typography>
      <Divider />
      <div className=" grid grid-cols-2 gap-2 py-2">
        <Typography variant="h4">Import Data</Typography>
        <Button variant="contained" onClick={() => handleImport()}>
          Import
        </Button>
        <Typography variant="h4">Export Data</Typography>
        <Button variant="contained" onClick={() => handleExport()}>
          Export
        </Button>
        <Typography variant="h4">Sync Data</Typography>
        <Button variant="contained">Sync</Button>
        <Typography variant="h4">Generate Report</Typography>
        <Button variant="contained">Generate</Button>
      </div>
    </div>
  );
};

export default DataManagementPage;
