import { object, string, boolean } from 'yup';

const LoginSchema = object({
    username: string()
        .email("Formato de email inválido.")
        .trim()
        .required("Este campo é obrigatório."),
    password: string()
        .trim()
        .required("Este campo é obrigatório."),
    keepConnected: boolean()
});

export default LoginSchema;
