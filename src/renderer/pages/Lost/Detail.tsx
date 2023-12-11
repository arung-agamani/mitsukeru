import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Box, Divider, Typography } from '@mui/material';
import { ItemData, emptyItemData } from '../LostAndFound';
import ItemDisplay from '../../components/ItemDisplay';

const LostDetailPage: React.FC = () => {
  const [searchParams] = useSearchParams({ id: '' });
  const [data, setData] = useState<ItemData>(emptyItemData);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const id = searchParams.get('id');
      if (!id) return;
      const itemData = await window.electron.db.getItem('lost', id);
      setData(itemData);
      setLoading(false);
    })();
  }, [searchParams]);

  if (loading) return <p>Loading...</p>;
  return (
    <Box display="flex" flexDirection="column">
      <Link
        to="/lnf-lost-search"
        style={{ textDecoration: 'none', paddingLeft: '2rem' }}
      >
        <Typography variant="h3">Go back to search page</Typography>
      </Link>
      <Divider />
      <ItemDisplay data={data} />
    </Box>
  );
};

export default LostDetailPage;
