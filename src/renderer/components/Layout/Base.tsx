import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  Container,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

interface DrawerItems {
  target: string;
  text: string;
  icon: React.ReactNode;
}

const DrawerIcons: DrawerItems[] = [
  {
    text: 'Home',
    target: '/',
    icon: <HomeIcon />,
  },
  {
    text: 'Search Lost Item',
    target: '/lnf-lost-search',
    icon: <SearchIcon />,
  },
  {
    text: 'Add Lost Item',
    target: '/lnf-lost-add',
    icon: <AddIcon />,
  },
  {
    text: 'Search Found Item',
    target: '/lnf-found-search',
    icon: <SearchIcon />,
  },
  {
    text: 'Add Found Item',
    target: '/lnf-found-add',
    icon: <AddIcon />,
  },
  {
    text: 'Add Deposit Item',
    target: '/deposit-add',
    icon: <AddIcon />,
  },
  {
    text: 'Data Management',
    target: '/data-management',
    icon: <SettingsIcon />,
  },
  {
    text: 'About',
    target: '/about',
    icon: <InfoIcon />,
  },
];

export default function BaseLayout() {
  const [open] = useState(true);
  const location = useLocation();
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          {DrawerIcons.map((item) => {
            return (
              <Link
                to={item.target}
                key={item.target}
                style={{ textDecoration: 'none' }}
              >
                <ListItem disablePadding>
                  <ListItemButton selected={location.pathname === item.target}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText>{item.text}</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Drawer>
      <CssBaseline />
      <Container maxWidth={false} disableGutters>
        <Box
          display="flex"
          flexDirection="column"
          sx={{ bgcolor: 'background.paper' }}
        >
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
}
