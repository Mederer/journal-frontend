import EntryCard from "@/components/EntryCard";
import UnauthorizedScreen from "@/components/screens/UnauthorizedScreen";
import useEntries from "@/hooks/useEntries";
import useUser from "@/hooks/useUser";
import { Skeleton, Typography } from "@mui/material";
import { Stack } from "@mui/material";

export default function EntriesPage() {
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

  return (
    <Stack>
      <Typography> Entries</ Typography>
      {entries.length === 0 && <Typography>You have no entries! Make one to get started</Typography>}
      {entries.map(entry => (
        <EntryCard key={entry.id} title={entry.title} body={entry.body} />
      ))}
    </Stack>
  )
}