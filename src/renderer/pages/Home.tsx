import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface NavigationCards {
  title: string;
  description: string;
  link: string;
}

const NavCards: NavigationCards[] = [
  {
    title: 'Lost and Found',
    description: 'Report lost items and record found items',
    link: 'lnf',
  },
  {
    title: 'Penitipan Barang',
    description: 'Manage stored inventory items',
    link: 'inventory',
  },
  {
    title: 'Central Info',
    description: 'A collection of central information regarding the event',
    link: 'info',
  },
];

enum ItemType {
  Phone,
  Wallet,
  CosplayProps,
  Cash,
  Documents,
  Package,
  Others,
}

interface ItemData {
  name: string;
  type: ItemType;
  description: string;
}

export default function HomePage() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        height: '100vh',
        padding: '2rem 2rem',
        backgroundColor: '#9CA3DB',
      }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h2">Mitsukeru</Typography>
      <Typography variant="body1">Event Inventory System</Typography>
      <Grid
        container
        spacing={2}
        alignItems="stretch"
        direction="row"
        justifyContent="center"
        sx={{ marginTop: '2rem', marginBottom: '2rem' }}
      >
        {NavCards.map((item) => {
          return (
            <Grid item xs={4} key={item.link}>
              <Link to={item.link}>
                <Card>
                  <CardContent>
                    <Typography variant="h4">{item.title}</Typography>
                    <Typography>{item.description}</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
