import Navbar from "./Navbar";
import type { ReactElement } from "react";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
