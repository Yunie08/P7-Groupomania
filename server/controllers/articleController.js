const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const { Article, User, Comment, Like, Sequelize } = require('../models');

// GET ALL ARTICLES
exports.getAllArticle = catchAsync(async (req, res, next) => {
  const articles = await Article.findAll({
    attributes: [
      'id',
      'title',
      'content',
      'createdAt',
      [
        Sequelize.fn('COUNT', Sequelize.col('comment.articleId')),
        'commentsCount',
      ],
      [Sequelize.fn('COUNT', Sequelize.col('like.articleId')), 'likesCount'],
    ],
    group: ['id'],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'firstname', 'lastname', 'profilePic'],
      },
      {
        model: Comment,
        as: 'comment',
        attributes: [],
      },
      {
        model: Like,
        as: 'like',
        attributes: [],
      },
    ],
    order: [['createdAt', 'DESC']],
  });

  if (!articles) {
    return next(new AppError('Aucun article pour le moment.', 400));
  }

  res.status(200).json(articles);
});

// CREATE ARTICLE
exports.createArticle = catchAsync(async (req, res, next) => {
  const { userId } = req.auth;
  const articleData = req.body;

  // If an image is attached, provide image URL
  const imageUrl = req.file
    ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    : undefined;

  const article = await Article.create({
    ...articleData,
    image: imageUrl,
    userId: userId,
  });

  res.status(201).json({
    status: 'success',
    data: {
      article,
    },
  });
});

// UPDATE ARTICLE
// TODO: utility function to remove old pictures
// TODO: refactor file handling
exports.updateArticle = catchAsync(async (req, res, next) => {
  const updatedData = req.body;
  const { articleId } = req.params;

  const imageUrl = req.file
    ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    : undefined;

  const article = await Article.update(
    { ...updatedData, image: imageUrl },
    { where: { id: articleId }, returning: true, plain: true }
  );

  if (article[1] === 0) {
    return next(
      new AppError("Aucun article correspondant à cet ID n'a été trouvé", 404)
    );
  }
  // FIXME: article always return null ?
  res.status(200).json({
    status: 'success',
    data: {
      data: article,
    },
  });
});

// DELETE ARTICLE
exports.deleteArticle = catchAsync(async (req, res, next) => {
  const { articleId } = req.params;
  const deletedArticle = await Article.destroy({
    where: {
      id: articleId,
    },
  });
  console.log(deletedArticle);
  if (!deletedArticle) {
    return next(new AppError('No article found with that ID', 404));
  }
  res.status(200).json({ status: 'success', message: 'Article supprimé' });
});
