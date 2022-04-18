const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const { User, Article, Comment } = require('../models');

// Authorization to access to a resource
module.exports = (Model) =>
  catchAsync(async (req, res, next) => {
    const reqUserId = req.auth.userId;
    const hasAccess = req.auth.isAuthorized;
    let objectId;

    // Depending on the object the user is trying to have access to, we specify the parameter to check
    if (Model === User) {
      objectId = req.params.userId;
    } else if (Model === Article) {
      objectId = req.params.articleId;
    } else if (Model === Comment) {
      objectId = req.params.commentId;
    }

    // We query the document the user is willing to access in the database
    const object = await Model.findOne({
      where: {
        id: objectId,
      },
    });
    if (!object) {
      return next(new AppError('Aucun élément trouvé avec cet ID', 404));
    }

    // Configuration of the id we want to check, depending on Model
    const ownerId = Model === User ? object.id : object.userId;

    // The user can only have access to the resource if they are the owner of the resource
    // or if their role grant them access to it
    if (ownerId !== reqUserId && !hasAccess) {
      return next(new AppError('Requête non autorisée', 403));
    }

    next();
  });
