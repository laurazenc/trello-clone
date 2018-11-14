import * as yup from "yup";
import { userMessages } from "./messages/userMessages";

const registerPasswordValidation = yup
  .string()
  .min(3, userMessages.passwordNotLongEnough)
  .required()
  .max(255);

const displayNameValidation = yup
  .string()
  .min(3, userMessages.displayNameNotLongEnough)
  .max(255);

const confirmPasswordValidation = yup
  .string()
  .oneOf([yup.ref("password"), null], userMessages.confirmPasswordDoesntMatch)
  .required();

const emailValidation = yup
  .string()
  .min(3, userMessages.emailNotLongEnough)
  .max(255)
  .email(userMessages.invalidEmail)
  .required();

export const validUserSchema = yup.object().shape({
  email: emailValidation,
  displayName: displayNameValidation,
  password: registerPasswordValidation,
  confirmPassword: confirmPasswordValidation
});

export const loginSchema = yup.object().shape({
  email: emailValidation,
  password: registerPasswordValidation
});

export const emailSchema = yup.object().shape({
  email: emailValidation
});
export const changePasswordSchema = yup.object().shape({
  newPassword: registerPasswordValidation
});
