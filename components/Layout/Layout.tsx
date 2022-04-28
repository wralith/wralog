import Navbar from "./Navbar";
import { ReactElement, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../../lib/context";
import useUserData from "../../lib/hooks/useUserData";

const Layout = ({ children }: { children: ReactElement }) => {
  const userData = useUserData()

  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <main>{children}</main>
      <Toaster
        toastOptions={{
          className: "shadow-md",
          style: {
            backgroundColor: "hsl(var(--nc))", // DaisyUi base-100
            color: "hsl(var(--n))", // DaisyUi base-content
          },
        }}
      />
    </UserContext.Provider>
  );
};

export default Layout;
