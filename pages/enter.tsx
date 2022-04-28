import type { NextPage } from "next";
import { auth, firestore, googleAuthProvider } from "../lib/firebase";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/context";
import debounce from "lodash.debounce";

const Enter: NextPage = () => {
  const { user, username } = useContext(UserContext);

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
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // For Character Validations
    if (val.length < 3) {
      setFormValue(val);
      setIsLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setIsLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUserName(formValue);
  }, [formValue]);

  const checkUserName = useCallback(
    debounce(async (username) => {
      if (username.length > 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log("Firestore Reads!!");
        setIsValid(!exists);
        setIsLoading(false);
      }
    }, 500),
    []
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    // Sending data
    const batch = firestore.batch();
    try {
      batch.set(userDoc, {
        username: formValue,
        photoURL: user.photoURL,
        displayName: user.displayName,
      });
      batch.set(usernameDoc, { uid: user.uid });

      await batch.commit();
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  return (
    <>
      {!username && (
      <section>
        <h3>Pick a name</h3>
        <form onSubmit={onSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            isLoading={isLoading}
          />
          <button className="btn btn-primary" type="submit" disabled={!isValid}>
            Apply
          </button>

          <h3>Debug Test</h3>
          <div>
            username: {formValue} <br />
            Loading: {isLoading.toString()} <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
      )}
    </>
  );
}

function UsernameMessage({ username, isValid, isLoading }) {
  if (isLoading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is unavailable!</p>;
  } else {
    return <p></p>;
  }
}

export default Enter;
