import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [firebaseErrorMessage, setFirebaseErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
    setFirebaseErrorMessage(null);
  };

  const handleButtonClick = () => {
    setFirebaseErrorMessage(null);
    //validate the form data

    const errors = checkValidData(email.current.value, password.current.value);
    setErrorMessage(errors);

    if (errors) return;

    //Sign in / Sign up logic
    if (!isSignInForm) {
      //Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setFirebaseErrorMessage(errorCode + " - " + errorMessage);
        });
    } else {
      //Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setFirebaseErrorMessage(errorCode + " - " + errorMessage);
        });
    }
  };

  return (
    <div className="relative min-h-screen">
      <Header />

      <div className="absolute inset-0 -z-10 ">
        <img
          src={BG_URL}
          alt="background"
          className="w-full h-full object-cover "
        />
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="bg-black/70 p-8 rounded-lg space-y-6 w-full max-w-md text-white z-10"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="w-full p-2 rounded bg-gray-800"
            />
          )}

          <input
            ref={email}
            type="email"
            placeholder="Email Address"
            className="w-full p-2 rounded bg-gray-800"
          />
          {errorMessage?.email && (
            <p className="text-sm text-red-500">{errorMessage.email}</p>
          )}

          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-gray-800"
          />
          {errorMessage?.password && (
            <p className="text-sm text-red-500">{errorMessage.password}</p>
          )}

          <button
            className="w-full p-3 my-2 text-white bg-red-600 rounded-lg font-semibold cursor-pointer"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          {firebaseErrorMessage && (
            <p className="text-sm text-red-500">{firebaseErrorMessage}</p>
          )}

          <p className="py-6 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm
              ? "New to Netflix? Sign up now."
              : "Already registered? Sign in now."}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
