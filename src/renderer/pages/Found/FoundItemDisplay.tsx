import React from 'react';
import { Container, Typography, Divider } from '@mui/material';
import { FoundItemData } from './types';
import AsyncImage from '../../components/AsyncImage';

interface Props {
  data: FoundItemData;
}
const FoundItemDisplay: React.FC<Props> = ({ data }) => {
  return (
    <Container
      sx={{
        marginTop: '2rem',
        marginBottom: '2rem',
      }}
    >
      <Typography variant="h3">Item: {data.name}</Typography>
      {/* <Typography variant="subtitle1">ID: {data.id}</Typography> */}
      <Divider />
      <table>
        <tr>
          <td>
            <Typography variant="h5">Deskripsi: </Typography>
          </td>
          <td>
            <Typography variant="h5">{data.description}</Typography>
          </td>
        </tr>
        {/* <tr>
          <td>
            <Typography variant="h5">Location</Typography>
          </td>
          <td>
            <Typography variant="h5">{data.location}</Typography>
          </td>
        </tr> */}
        {/* <tr>
          <td>
            <Typography variant="h5">Status</Typography>
          </td>
          <td>
            <Typography variant="h5">{data.status || 'Unknown'}</Typography>
          </td>
        </tr> */}
        {/* <tr>
          <td>
            <Typography variant="h5">Last Updated</Typography>
          </td>
          <td>
            <Typography variant="h5">
              {data.updatedAt?.toLocaleString() || 'No data'}
            </Typography>
          </td>
        </tr> */}
      </table>
      <AsyncImage id={data.id || ''} />
      {/* <Typography variant="caption">Image for item {data.id}</Typography> */}
    </Container>
  );
};

export default FoundItemDisplay;
