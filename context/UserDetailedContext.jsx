"use client";
import { createContext } from "react";

// default empty context value
const UserDetailedContext = createContext({
  user: null,
  setUser: () => {},
});

export default UserDetailedContext;
