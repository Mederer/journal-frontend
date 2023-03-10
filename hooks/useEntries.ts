import { getToken } from "@/helpers/tokenHelper";
import { Entry, NewEntry } from "@/types";
import useSWR from "swr";

const fetcher = ([url, token]: [url: string, token: string]) =>
  fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json().then((resJson) => resJson));

export default function useEntries() {
  const token = getToken();

  const { data, error, mutate } = useSWR(
    ["http://localhost:5000/entry", token],
    fetcher
  );

  const deleteEntry = async (id: number) => {
    const res = await fetch(`http://localhost:5000/entry/${id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      console.log("Entry deleted");
      mutate();
    }
  };

  const addEntry = async (entry: NewEntry) => {
    const res = await fetch("http://localhost:5000/entry", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(entry),
    });
    if (res.ok) {
      console.log("Entry added!");
      mutate();
    }
  };

  return { entries: data?.entries, error, deleteEntry, addEntry };
}
