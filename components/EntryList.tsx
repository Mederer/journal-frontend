import { Entry } from "@/types";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import EntryCard from "./EntryCard";

interface EntryListProps {
  entries: Entry[]
}

export default function EntryList({ entries }: EntryListProps) {
  return (
    <Grid2 container spacing={6}>
      {
        entries.map(entry => (
          <Grid2 key={entry.id} xs={12} sm={12} md={6} lg={4}>
            <EntryCard entry={entry} />
          </Grid2>
        ))
      }
    </Grid2 >
  )
}