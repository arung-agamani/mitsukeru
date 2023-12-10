import { Button, Divider, Typography } from '@mui/material';
import React from 'react';

const DataManagementPage = () => {
  const handleExport = async () => {
    const data = await window.electron.db.export();
    console.log(data);
  };
  return (
    <div className="container mx-auto px-4 w-full">
      <Typography variant="h3">Data Management</Typography>
      <Divider />
      <div className=" grid grid-cols-2 gap-2 py-2">
        <Typography variant="h4">Import Data</Typography>
        <Button variant="contained">Import</Button>
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
