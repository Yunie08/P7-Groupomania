const Yup = require('yup');

const catchAsync = require('../../utils/catchAsync');

const commentSchema = Yup.object({
  content: Yup.string()
    .trim()
    .min(20, 'Le titre doit contenir au moins 20 caractères')
    .max(300, 'Le titre doit contenir moins de 300 caractères')
    .required('Veuillez renseigner du texte'),
});

exports.commentValidation = catchAsync(async (req, res, next) => {
  const value = await commentSchema.validate(
    { ...req.body },
    { abortEarly: false, stripUnknown: true }
  );
  req.body = value;
  next();
});
