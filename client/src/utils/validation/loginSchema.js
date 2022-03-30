import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Adresse email invalide")
    .required("Email obligatoire"),
  password: Yup.string().required("Mot de passe obligatoire"),
});
