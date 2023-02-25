import UnauthorizedScreen from "@/components/screens/UnauthorizedScreen";
import { getErrors, hasError } from "@/helpers/errorHelper";
import useUser from "@/hooks/useUser";
import { ValidationError } from "@/types";
import { Typography, Stack, Breadcrumbs, FormGroup, TextField, Button, Checkbox } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { entrySchema } from "@/schemas";
import useEntries from "@/hooks/useEntries";
import { useRouter } from "next/router";

export default function NewEntryPage() {
  const { user } = useUser();
  const { addEntry } = useEntries();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [errors, setErrors] = useState([] as ValidationError[])

  if (!user) {
    return <UnauthorizedScreen />
  }

  const handleSubmit = async () => {
    const errors = getErrors(entrySchema, { title, body });
    if (errors.length === 0) {
      setErrors([])
      await addEntry({ title, body })
      router.push("/entries")
    } else {
      setErrors(errors);
    }
  }

  const handleReset = () => {
    setTitle("");
    setBody("");
    setErrors([])
  }

  return (
    <Stack spacing={4}>
      <Typography variant="h5">Add Entry</Typography>
      <Stack spacing={2} alignItems="flex-start">
        <Stack>
          <TextField label="Title" value={title} error={hasError("title", errors) ? true : false} helperText={!!hasError("title", errors) ? hasError("title", errors) : null} onChange={e => setTitle(e.target.value)} />
        </Stack>
        <TextField label="Body" minRows={5} error={!!hasError("body", errors)} helperText={!!hasError("body", errors) ? hasError("body", errors) : null} multiline fullWidth value={body} onChange={e => setBody(e.target.value)} />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleReset} color="secondary">Reset</Button>
          <Button variant="contained" onClick={handleSubmit}>Add</Button>
        </Stack>
      </Stack>
    </Stack>

  )
}