import * as Yup from "yup";

// Regex patterns
const namePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const passwordPattern =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

export const signupSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Adresse email non valide")
    .required("Adresse email obligatoire"),
  firstname: Yup.string()
    .trim()
    .matches(namePattern, "Prénom invalide")
    .required("Prénom obligatoire"),
  lastname: Yup.string()
    .trim()
    .matches(namePattern, "Nom invalide")
    .required("Nom obligatoire"),
  password: Yup.string()
    .trim()
    .matches(
      passwordPattern,
      "Le mot de passe doit contenir un minimum de 8 caractères dont au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial (!@#$%^&*)"
    )
    .required("Mot de passe obligatoire"),
  passwordConfirm: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Les mots de passe ne correspondent pas"
    )
    .required("Confirmation de mot de passe obligatoire "),
});
