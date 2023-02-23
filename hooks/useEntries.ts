import { getToken } from "@/helpers/tokenHelper";
import { Entry } from "@/types";
import useSWR from "swr";

const fetcher = ([url, token]: [url: string, token: string]) =>
  fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json().then((resJson) => resJson));

export default function useEntries(): { entries: Entry[]; error: any } {
  const token = getToken();

  const { data, error } = useSWR(
    ["http://localhost:5000/entry", token],
    fetcher
  );

  return { entries: data?.entries, error };
}
