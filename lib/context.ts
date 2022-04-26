import { User } from "firebase/auth";
import { createContext } from "react";

type UserContextType = {
  user: User | null | undefined,
  username: null | string,
}
const contextData : UserContextType = { user: null, username: null }
export const UserContext = createContext(contextData);
