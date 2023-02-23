import useEntries from "@/hooks/useEntries";
import { Entry } from "@/types";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/router";

interface EntryCardProps {
  entry: Entry;
}

export default function EntryCard({ entry }: EntryCardProps) {
  const { deleteEntry } = useEntries();
  const router = useRouter();

  const { id, title, body } = entry;

  const handleDelete = () => {
    deleteEntry(id);
  }

  const handleView = () => {
    router.push(`/entries/${id}`)
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" textAlign="center">{title}</Typography>
        <Typography>{body}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleView}>View</Button>
        <Button color="error" onClick={handleDelete}>Delete</Button>
      </CardActions>
    </Card>
  )
}