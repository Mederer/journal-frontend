import { AppBar, Box, Button, Divider, IconButton, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar } from "@mui/material";
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

interface MenuProps {
  toggleDrawer: () => void
}

export default function UIShell({ children }: any) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout } = useUser();
  const router = useRouter();

  console.log(router.pathname)

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
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ marginRight: "2rem" }} onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Journal</Typography>
          {user && <Typography>{`Welcome ${user.firstname} ${user.lastname}`}</Typography>}
          {authButtons}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        {user ? <LoggedInMenu toggleDrawer={toggleDrawer} /> : <LoggedOutMenu toggleDrawer={toggleDrawer} />}
      </Drawer>
      <Paper sx={{ margin: "1rem", padding: "1rem" }}>
        {children}
      </Paper>
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
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => handleNavigate("/entries")}>
          <ListItemIcon>
            <MessageIcon />
          </ListItemIcon>
          <ListItemText>Entries</ListItemText>
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemButton onClick={logoutHandler}>
          <ListItemIcon>
            <LogoutIcon />
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
            <LoginIcon />
          </ListItemIcon>
          <ListItemText>Login</ListItemText>
        </ListItemButton>
      </ListItem>
    </List>
  )
}