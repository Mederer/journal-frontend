import useEntries from "@/hooks/useEntries";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";

export default function EntryPage() {
  const router = useRouter();
  const { entries, error } = useEntries();
  const id = parseInt(router.query.id as string);

  const entry = entries.filter(e => e.id === id)[0];

  return (
    <Stack spacing={8}>
      <Typography variant="h5" textAlign="center">{entry.title}</Typography>
      <Typography>{entry.body}</Typography>
    </Stack>
  )
}