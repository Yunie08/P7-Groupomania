const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const { User, Article, Comment } = require('../models');

// Authorization to access to a resource
module.exports = (Model) =>
  catchAsync(async (req, res, next) => {
    const reqUserId = req.auth.userId;
    const hasAccess = req.auth.isAuthorized;
    let documentId;
    // Depending on the type of document the user is trying to access to, we specify the parameter to check
    if (Model === User) {
      documentId = req.params.userId;
    } else if (Model === Article) {
      documentId = req.params.articleId;
    } else if (Model === Comment) {
      documentId = req.params.commentId;
    }

    // We query the document the user is willing to access to in the database
    const document = await Model.findOne({
      where: {
        id: documentId,
      },
    });
    if (!document) {
      return next(new AppError('Aucun élément trouvé avec cet ID', 404));
    }

    // Configuration of the id we want to check, depending on Model
    const ownerId = Model === User ? document.id : document.userId;

    // The user can access to the resource if they are the owner of the resource or have granted access
    if (ownerId !== reqUserId && !hasAccess) {
      return next(new AppError('Requête non autorisée', 403));
    }

    next();
  });
