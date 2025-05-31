import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [firebaseErrorMessage, setFirebaseErrorMessage] = useState(null);
  const navigate = useNavigate();
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
              "https://i.pinimg.com/736x/92/b4/e7/92b4e7c57de1b5e1e8c5e883fd915450.jpg",
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
              navigate("/browse");
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
          navigate("/browse");

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
          src="https://assets.nflxext.com/ffe/siteui/vlv3/914ad279-199e-4095-9c10-2409dc9e5e1b/web/IN-en-20250519-TRIFECTA-perspective_8f1ca896-9e49-4a4e-90f0-22fc49650bd9_large.jpg"
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
          <h1 className="text-3xl font-bold text-center">
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
