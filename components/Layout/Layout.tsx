import Navbar from "./Navbar";
import { ReactElement, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../../lib/context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../lib/firebase";

const Layout = ({ children }: { children: ReactElement }) => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = firestore.collection("users").doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null)
    }
    return unsubscribe;
  }, [user]);

  return (
    <UserContext.Provider value={{ user, username }}>
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
