import { useState } from "react";
import Header from "./Header";


const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }

  return (
    <div className="relative min-h-screen">
      <Header />

      {/* Background image (furthest back) */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/914ad279-199e-4095-9c10-2409dc9e5e1b/web/IN-en-20250519-TRIFECTA-perspective_8f1ca896-9e49-4a4e-90f0-22fc49650bd9_large.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Centered form container */}
      <div className="flex items-center justify-center min-h-screen">
        <form className="bg-black/70 p-8 rounded-lg space-y-6 w-full max-w-md text-white z-10">
          <h1 className="text-3xl font-bold text-center">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

          {!isSignInForm && <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 rounded bg-gray-800"
          />}
          
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-2 rounded bg-gray-800"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-gray-800"
          />

          <button className="w-full p-3 my-2 text-white bg-red-600 rounded-lg font-semibold cursor-pointer">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="py-6 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign up now." : "Already registered? Sign in now."}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
