const Yup = require('yup');

const catchAsync = require('../../utils/catchAsync');

const commentSchema = Yup.object({
  content: Yup.string()
    .trim()
    .min(3, 'Le titre doit contenir au moins 3 caractères')
    .max(400, 'Le titre doit contenir moins de 400 caractères')
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
