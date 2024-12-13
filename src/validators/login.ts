import { object, string, boolean } from 'yup';

const LoginSchema = object({
    username: string()
        .trim()
        .required("This field is required."),
    password: string()
        .trim()
        .required("This field is required."),
    keepConnected: boolean()
});

export default LoginSchema;
