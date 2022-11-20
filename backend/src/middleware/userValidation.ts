import { body } from "express-validator";

export const userCreateValidation = () => {
  return [
    body("username")
      .isString()
      .withMessage("Username can't be empty.")
      .isLength({ min: 3 })
      .withMessage("Username should be minimum 3 characters."),
    body("password")
      .isString()
      .withMessage("Password can't be empty.")
      .isLength({ min: 8 })
      .withMessage("Password should be minimum 8 characters.")
      .custom((password: string) => {
        if (!/\d/.test(password)) {
          throw new Error("Password should have at least 1 number.");
        }
        if (!/[A-Z]/.test(password)) {
          throw new Error(
            "Password should have at least 1 uppercase letter."
          );
        }
        return true;
      }),
  ];
};

export const userLoginValidation = () => {
  return [
    body("username")
      .isString()
      .withMessage("Username can't be empty."),
    body("password")
      .isString()
      .withMessage("Password can't be empty."),
  ];
};