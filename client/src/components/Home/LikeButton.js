import { useState, useEffect } from "react";
import axios from "../../utils/api/axiosConfig";
import { LinkStyledButton } from "../../utils/style/styles";

const ARTICLE_URL = "/article";

const LikeButton = ({
  articleId,
  likesCount,
  setLikesCount,
  likedByUser,
  setLikedByUser,
}) => {
  const [error, setError] = useState(false);
  const token = localStorage.getItem("token");
  const userId = JSON.parse(localStorage.getItem("userId"));

  // Check if a user likes this article
  const checkLikes = (likes, user) => {
    let isLikedByUser = false;
    likes.forEach((like) => {
      if (like.userId === user) {
        isLikedByUser = true;
      }
    });
    return isLikedByUser;
  };

  // Get list of users liking article
  useEffect(() => {
    const getIsLiked = async () => {
      try {
        const response = await axios.get(`${ARTICLE_URL}/${articleId}/like`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const isLikedByUser = checkLikes(response.data, userId);
        setLikedByUser(isLikedByUser);
        setLikesCount(response.data.length);
      } catch (err) {
        console.log(err);
      }
    };
    getIsLiked();
  }, [likedByUser]);

  const postLike = async () => {
    try {
      // If the user currently likes then, will send an unlike
      const newLikeValue = likedByUser ? false : true;

      await axios.post(
        `${ARTICLE_URL}/${articleId}/like`,
        {
          isLiked: newLikeValue,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLikedByUser(!likedByUser);
      newLikeValue
        ? setLikesCount(likesCount + 1)
        : setLikesCount(likesCount - 1);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <LinkStyledButton
      onClick={() => postLike()}
      likedByUser={likedByUser}
      className="me-3"
    >
      <i className="fa-solid fa-thumbs-up fa-lg"></i>
      {likesCount && <span>{likesCount} </span>} J'aime
    </LinkStyledButton>
  );
};

export default LikeButton;
