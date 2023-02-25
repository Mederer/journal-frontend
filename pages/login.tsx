import useUser from "@/hooks/useUser";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useUser();

  const [email, setEmail] = useState("mederer@me.com");
  const [password, setPassword] = useState("password");

  const loginHandler = () => {
    login(email, password)
  }

  return (
    <>
      <Stack direction="column" alignItems="flex-start" spacing={2}>
        <Typography variant="h5">Login</Typography>
        <Grid2 spacing={2} container>
          <Grid2 xs={12} sm={6} md={6} lg={6}>
            <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
          </Grid2>
          <Grid2 xs={12} sm={6} md={6} lg={6}>
            <TextField label="Password" value={password} onChange={e => setPassword(e.target.value)} fullWidth />
          </Grid2>
        </Grid2>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="secondary" onClick={() => router.push("/")}>Back</Button>
          <Button variant="contained" onClick={loginHandler}>Login</Button>
        </Stack>
      </Stack>
    </>
  )
}