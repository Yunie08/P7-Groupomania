import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Email invalide").required("Adresse email requise"),
  password: Yup.string().required("Mot de passe requis"),
});
