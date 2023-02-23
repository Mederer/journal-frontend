import EntryList from "@/components/EntryList";
import UnauthorizedScreen from "@/components/screens/UnauthorizedScreen";
import useEntries from "@/hooks/useEntries";
import useUser from "@/hooks/useUser";
import { Button, Skeleton, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";

export default function EntriesPage() {
  const router = useRouter();
  const { user } = useUser();
  const { entries, error } = useEntries();

  if (!user) {
    return (
      <UnauthorizedScreen />
    )
  }

  if (!entries && !error) {
    return (
      <Skeleton />
    )
  }

  const newEntryHandler = () => {
    router.push("/entries/new-entry");
  }

  return (
    <Stack spacing={2}>
      <Stack justifyContent="space-between" direction="row">
        <Typography variant="h5">Entries</Typography>
        <Button variant="contained" onClick={newEntryHandler}>New</Button>
      </Stack>
      <EntryList entries={entries} />
    </Stack>
  )
}