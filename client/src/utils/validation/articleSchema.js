import * as Yup from "yup";

export const articleSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "Le titre doit contenir au moins 3 caractères")
    .max(50, "Le titre doit contenir moins de 50 caractères")
    .required("Veuillez renseigner un titre"),
  content: Yup.string()
    .trim()
    .min(20, "L'article doit contenir au moins 20 caractères")
    .max(5000, "L'article doit contenir moins de 5000 caractères")
    .required("Veuillez renseigner du contenu pour votre article"),
});
