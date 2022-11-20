import { body } from "express-validator";

export const transactionCreateValidation = () => {
  return [
    body("username")
      .isString()
      .withMessage("Username can't be empty."),
    body("value")
      .isDecimal()
      .withMessage("Value can't be empty.")
      .custom((value: number) => {
        if (value <= 0) {
          throw new Error("Invalid value.");
        }
        return true;
      }),
  ];
};
