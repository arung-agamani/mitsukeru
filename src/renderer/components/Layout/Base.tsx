import { useState } from "react";
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer";
import { Link, Outlet } from "react-router-dom";
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 240;

interface DrawerItems {
    target: string
    text: string
    icon: React.ReactNode
}


const DrawerIcons: DrawerItems[] = [
    {
        text: 'Home',
        target: '/',
        icon: <HomeIcon />
    },
    {
        text: 'About',
        target: 'about',
        icon: <InfoIcon />
    }
]

const BaseLayout: React.FC = () => {
    const [open, setOpen] = useState(true)
    return <Box sx={{ display: 'flex'}}>
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
                        return <Link to={item.target} key={item.target}>
                            <ListItem>
                            <ListItemButton>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText>
                                    {item.text}
                                </ListItemText>
                            </ListItemButton>
                            </ListItem>
                        </Link>

                    })}
            </List>
        </Drawer>
            <Outlet />
        
    </Box>
}

export default BaseLayout