import { getErrors } from "@/helpers/errorHelper";
import useUser from "@/hooks/useUser";
import { ValidationError } from "@/types";
import { Alert, Box, Button, Stack, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2"
import { useRouter } from "next/router";
import { useState } from "react";
import { z } from "zod"
import { set, ZodError } from "zod/lib";

const userSchema = z.object({
  firstname: z.string().min(2, { message: "Firstname must be at least 2 characters" }),
  lastname: z.string().min(2, { message: "Lastname must be at least 2 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [errors, setErrors] = useState<ValidationError[]>([])

  const registerHandler = () => {
    const errors = getErrors(userSchema, { firstname, lastname, password });
    console.log(errors)
    if (errors.length === 0) {
      register(firstname, lastname, email, password)
    } else {
      setErrors(errors)
    }
  }

  // const getErrors = () => {
  //   const errors: ValidationError[] = []
  //   try {
  //     userSchema.parse({
  //       firstname,
  //       lastname,
  //       email,
  //       password
  //     })
  //   } catch (error) {
  //     console.log(error)
  //     for (let issue of (error as ZodError).issues) {
  //       errors.push({
  //         field: issue.path[0] as string,
  //         message: issue.message
  //       })
  //     }
  //   }
  //   return errors
  // }

  const hasError = (field: string) => {
    for (let error of errors) {
      if (error.field === field) {
        return true
      }
    }
    return false;
  }

  return (
    <>
      <Stack direction="column" alignItems="flex-start" spacing={2}>
        <Typography variant="h5">Register</Typography>
        <Box>
          <Stack spacing={1}>

            {errors.map(e => (
              <Alert key={e.field} severity="error">{e.message}</Alert>
            ))}
          </Stack>
        </Box>
        <Grid2 spacing={2} container>
          <Grid2 xs={12} sm={6} md={6} lg={6}>
            <TextField label="First Name" value={firstname} onChange={e => setFirstname(e.target.value)} error={hasError("firstname") ? true : false} fullWidth />
          </Grid2>
          <Grid2 xs={12} sm={6} md={6} lg={6}>
            <TextField label="Last Name" value={lastname} onChange={e => setLastname(e.target.value)} error={hasError("lastname") ? true : false} fullWidth />
          </Grid2>
          <Grid2 xs={12} sm={6} md={6} lg={6}>
            <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} error={hasError("email") ? true : false} fullWidth />
          </Grid2>
          <Grid2 xs={12} sm={6} md={6} lg={6}>
            <TextField label="Password" value={password} onChange={e => setPassword(e.target.value)} error={hasError("password") ? true : false} fullWidth />
          </Grid2>
        </Grid2>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="secondary" onClick={() => router.push("/")}>Back</Button>
          <Button variant="contained" onClick={registerHandler}>Register</Button>
        </Stack>

      </Stack>
    </>
  )
}