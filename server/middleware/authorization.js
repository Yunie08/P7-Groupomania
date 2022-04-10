const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const { User, Article, Comment } = require('../models');

// TODO:
module.exports = (Model) =>
  catchAsync(async (req, res, next) => {
    const reqUserId = req.auth.userId;
    const adminAccess = req.auth.isAdmin;
    let documentId;
    // Depending on the type of document the user is trying to access, we specify the parameter to check
    if (Model === User) {
      documentId = req.params.userId;
    } else if (Model === Article) {
      documentId = req.params.articleId;
    } else if (Model === Comment) {
      documentId = req.params.commentId;
    }

    // We get the document the user is willing to access to
    const document = await Model.findOne({
      where: {
        id: documentId,
      },
    });
    // Configuration of the id we want to check, depending on Model
    const ownerId = Model === User ? document.id : document.userId;
    // If the user who's sending the request and the user who created the document are the same
    if (ownerId !== reqUserId && !adminAccess) {
      return next(new AppError('Requête non autorisée', 403));
    }

    next();
  });
