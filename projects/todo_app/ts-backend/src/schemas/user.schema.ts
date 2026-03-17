import { object, string, ref } from "yup";

export const userLoginSchema = object().shape({
  body: object({
    email: string().email().required("Email is required"),
    password: string().required("Password is Required"),
  }),
});

export const userRegisterSchema = object().shape({
    body : object({
        email : string().email().required("Email is required"),
        password : string().required("Password is required"),
        password2: string()
      .oneOf([ref("password")], "Password Must Match")
      .required("Confirm Password is required")
    })
});
