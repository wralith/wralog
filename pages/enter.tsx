import type { NextPage } from "next";
import { auth, googleAuthProvider } from "../lib/firebase";
import { useContext } from "react";
import { UserContext } from "../lib/context";


const Enter: NextPage = () => {
  const { user, username } = useContext(UserContext) 

  return (
    <div className="min-h-screen flex flex-col items-center text-center justify-center">
      {user ? (
        !username ? (
          <UsernameForm /> // Is user not have username 
        ) : (
          <SignOutButton /> // Both True
        )
      ) : (
        <SignInButton /> // Both False
      )}
    </div>
  );
};

function SignInButton() {
  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <button className="btn btn-primary" onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  );
}

function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {
  return <p>Form</p>;
}

export default Enter;
