// utils/validate.js
export const checkValidData = (email, password) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);

  const errors = {
    email:  isEmailValid  ? null : "Email ID is not valid",
    password: isPasswordValid ? null : "Password is not valid"
  };

  // if both fields passed, return null
  return !errors.email && !errors.password ? null : errors;
};
