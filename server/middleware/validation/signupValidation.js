const Yup = require('yup');

const catchAsync = require('../../utils/catchAsync');
const { passwordPattern, namePattern } = require('../../utils/regexValidation');

const signupSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Email non valide')
    .required('Adresse email requise'),
  firstname: Yup.string()
    .trim()
    .matches(namePattern, 'Prénom invalide')
    .required('Prénom requis'),
  lastname: Yup.string()
    .trim()
    .matches(namePattern, 'Nom invalide')
    .required('Nom requis'),
  password: Yup.string().trim().matches(passwordPattern).required(),
  passwordConfirm: Yup.string()
    .oneOf(
      [Yup.ref('password'), null],
      'Les mots de passe ne correspondent pas'
    )
    .strip(),
});

exports.signupValidation = catchAsync(async (req, res, next) => {
  const value = await signupSchema.validate(
    { ...req.body },
    { abortEarly: false, stripUnknown: true }
  );
  req.body = value;
  next();
});
