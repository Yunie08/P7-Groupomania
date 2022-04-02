import * as Yup from "yup";

export const commentSchema = Yup.object({
  content: Yup.string()
    .trim()
    .min(3, "Le titre doit contenir au moins 20 caractères")
    .max(400, "Le titre doit contenir moins de 400 caractères")
    .required("Veuillez renseigner du texte"),
});
