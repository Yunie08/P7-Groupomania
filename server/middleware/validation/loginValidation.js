const Yup = require('yup');

const catchAsync = require('../../utils/catchAsync');

const loginSchema = Yup.object({
  email: Yup.string().trim().email().required('Email obligatoire'),
  password: Yup.string().trim().required('Mot de passe obligatoire'),
});

exports.loginValidation = catchAsync(async (req, res, next) => {
  const value = await loginSchema.validate(
    { ...req.body },
    { abortEarly: false, stripUnknown: true }
  );
  req.body = value;
  next();
});
