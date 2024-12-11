import { object, string, ref } from 'yup';

const RegisterSchema = object({
  username: string()
    .trim()
    .required("Este campo é obrigatório.")
    .matches(/^[a-zA-Z0-9]+$/, "Nome de usuário deve conter apenas letras e números."),
  fullName: string()
    .trim()
    .required("Nome completo é obrigatório.")
    .min(3, "Nome completo deve ter pelo menos 3 caracteres."),
  password: string()
    .trim()
    .required("Este campo é obrigatório.")
    .min(6, "A senha deve ter pelo menos 6 caracteres."),
  confirmPassword: string()
    .trim()
    .oneOf([ref('password')], "As senhas não coincidem.") 
    .required("Confirmação de senha é obrigatória.")
});

export default RegisterSchema;
