import React, { useEffect, useState } from "react";
import axios from "../utils/api/axiosConfig";
import Article from "../components/Article";

import { StyledButton } from "../utils/style/styles";

const ARTICLE_URL = "/article";

const Home = () => {
  const [isDataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState(false);
  const [articlesList, setArticlesList] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setDataLoading(true);
        const token = localStorage.getItem("token");

        const response = await axios.get(ARTICLE_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        //TODO:
        setArticlesList(response.data.articles);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        console.log(articlesList[0].id);
        setDataLoading(false);
      }
    };
    getArticles();
  }, []);

  if (error) {
    return <span>{error}</span>;
  }

  return (
    <main className="d-flex flex-column align-items-center">
      <h1>Un espace d'échange avec vos collègues</h1>
      <StyledButton outline className="rounded-pill my-4">
        Publier un article
      </StyledButton>
      {isDataLoading ? (
        <div>Patience, ça charge</div>
      ) : (
        articlesList.map((article) => (
          <Article
            key={`article-${article.id}`}
            articleId={article.id}
            userId={article.User.userId}
            firstname={article.User.firstname}
            lastname={article.User.lastname}
            profilePic={article.User.profilePic}
            title={article.title}
            content={article.content}
            createdAt={article.createdAt}
          />
        ))
      )}
    </main>
  );
};

export default Home;
