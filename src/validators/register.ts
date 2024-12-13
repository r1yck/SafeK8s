import { object, string, ref } from 'yup';

const RegisterSchema = object({
  username: string()
    .trim()
    .required("This field is required.")
    .matches(/^[a-zA-Z0-9]+$/, "Username must contain only letters and numbers."),
  fullName: string()
    .trim()
    .required("Full name is required.")
    .min(3, "Full name must be at least 3 characters long."),
  password: string()
    .trim()
    .required("This field is required.")
    .min(6, "Password must be at least 6 characters long."),
  confirmPassword: string()
    .trim()
    .oneOf([ref('password')], "Passwords do not match.") 
    .required("Password confirmation is required.")
});

export default RegisterSchema;
