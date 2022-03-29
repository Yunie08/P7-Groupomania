const { Like, Article, User } = require('../models');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.toggleLike = catchAsync(async (req, res, next) => {
  const { userId } = req.auth;
  const { articleId } = req.params;

  const article = await Article.findByPk(articleId);
  if (!article) {
    return next(new AppError('Aucun article trouvé avec cet ID', 404));
  }

  const [like, created] = await Like.findOrCreate({
    where: { userId: userId, articleId: articleId },
    defaults: {
      userId: userId,
      articleId: articleId,
      isLiked: true,
    },
  });

  if (!created) {
    if (!like.isLiked) {
      await like.update({ isLiked: false });
      res.status(200).json({ status: 'success', message: 'Like ajouté' });
    } else {
      await like.destroy();
      res.status(200).json({ status: 'success', message: 'Like supprimé' });
    }
  }

  res.status(201).json({ status: 'success', message: 'Like ajouté' });
});
exports.deleteLike = catchAsync(async (req, res, next) => {});
exports.updateLike = catchAsync(async (req, res, next) => {});
