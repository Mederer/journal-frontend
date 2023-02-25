export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

export interface Entry {
  id: number;
  title: string;
  body: string;
}

export type NewEntry = Omit<Entry, "id">;

export interface UserContextType {
  user: User?;
  setUser: Dispatch<SetStateAction<User | null>>;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => void;
}

export interface ValidationError {
  field: string;
  message: string;
}
