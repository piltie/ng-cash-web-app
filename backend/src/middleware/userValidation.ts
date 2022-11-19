import { body } from "express-validator";

export const userCreateValidation = () => {
  return [
    body("username")
      .isString()
      .withMessage("O username é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O username precisa ter no mínimo 3 caracteres"),
    body("password")
      .isString()
      .withMessage("A senha é obrigatória.")
      .isLength({ min: 8 })
      .withMessage("A senha precisa ter no mínimo 8 caracteres")
      .custom((password: string) => {
        if (!/\d/.test(password)) {
          throw new Error("A senha precisa conter no mínimo um número");
        }
        if (!/[A-Z]/.test(password)) {
          throw new Error(
            "A senha precisa conter no mínimo uma letra maiúscula número"
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
      .withMessage("O username é obrigatório.")
      .isLength({ min: 1 })
      .withMessage("O username é obrigatório. 3"),
    body("password")
      .isString()
      .withMessage("A senha é obrigatória.")
      .isLength({ min: 1 })
      .withMessage("A senha é obrigatória. 3"),
  ];
};