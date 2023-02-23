import { Card, CardContent, Typography } from "@mui/material";

interface EntryCardProps {
  title: string;
  body: string;
}

export default function EntryCard({ title, body }: EntryCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography textAlign="center">{title}</Typography>
        <Typography>{body}</Typography>
      </CardContent>
    </Card>
  )
}