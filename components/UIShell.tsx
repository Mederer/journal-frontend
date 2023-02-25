import { AppBar, Box, Button, Divider, IconButton, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import { useContext, useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import useUser from "@/hooks/useUser";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import { useRouter } from "next/router";
import LogoutIcon from '@mui/icons-material/Logout';
import Paper from "@mui/material/Paper";
import MessageIcon from '@mui/icons-material/Message';
import AddIcon from '@mui/icons-material/Add';

interface MenuProps {
  toggleDrawer: () => void
}

export default function UIShell({ children }: any) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const isSmallScreen = useMediaQuery("(max-width:700px)");

  const drawerWidth = 240;

  const toggleDrawer = () => {
    setDrawerOpen((open) => !open)
  }

  const authButtons = (
    <Stack direction="row" spacing={1}>
      {(!user && router.pathname !== "/login") && <Button color="inherit" variant="outlined" onClick={() => router.push("/login")}>Login</Button>}
      {(!user && router.pathname !== "/register") && <Button color="inherit" variant="outlined" onClick={() => router.push("/register")}>Register</Button>}
    </Stack>
  )

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" sx={{ width: (isSmallScreen ? "100%" : `calc(100% - ${drawerWidth}px)`) }}>
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" sx={{ marginRight: "2rem", display: isSmallScreen ? "inherit" : "none" }} onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Journal</Typography>
            {user && <Typography>{`Welcome ${user.firstname} ${user.lastname}`}</Typography>}
            {authButtons}
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer} variant={isSmallScreen ? "temporary" : "permanent"}
          sx={{
            width: isSmallScreen ? "0px" : drawerWidth,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}>
          {user ? <LoggedInMenu toggleDrawer={toggleDrawer} /> : <LoggedOutMenu toggleDrawer={toggleDrawer} />}
        </Drawer>
        <Box component="main" flexGrow={1}>
          <Toolbar />
          <Paper elevation={4} sx={{ margin: "1rem", padding: "1rem" }}>
            {children}
          </Paper>
        </Box>
      </Box>
    </>
  )
}

function LoggedInMenu({ toggleDrawer }: MenuProps) {
  const { logout } = useUser();
  const router = useRouter();

  const handleNavigate = (to: string) => {
    toggleDrawer();
    router.push(to);
  }

  const logoutHandler = () => {
    toggleDrawer();
    logout();
  }

  return (
    <List>
      <ListItem>
        <ListItemButton onClick={() => handleNavigate("/")}>
          <ListItemIcon>
            <DashboardIcon color={router.pathname === "/" ? "secondary" : "primary"} />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => handleNavigate("/entries/new-entry")}>
          <ListItemIcon>
            <AddIcon color={router.pathname === "/entries/new-entry" ? "secondary" : "primary"} />
          </ListItemIcon>
          <ListItemText>New Entry</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => handleNavigate("/entries")}>
          <ListItemIcon>
            <MessageIcon color={router.pathname === "/entries" ? "secondary" : "primary"} />
          </ListItemIcon>
          <ListItemText>Entries</ListItemText>
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemButton onClick={logoutHandler}>
          <ListItemIcon>
            <LogoutIcon color="error" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </ListItemButton>
      </ListItem>
    </List>
  )
}

function LoggedOutMenu({ toggleDrawer }: MenuProps) {
  const router = useRouter();

  const handleNavigate = (to: string) => {
    router.push(to)
    toggleDrawer()
  }

  return (
    <List>
      <ListItem>
        <ListItemButton onClick={() => handleNavigate("/login")}>
          <ListItemIcon>
            <LoginIcon color="primary" />
          </ListItemIcon>
          <ListItemText>Login</ListItemText>
        </ListItemButton>
      </ListItem>
    </List>
  )
}