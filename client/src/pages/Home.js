import React, { useEffect, useState } from "react";
import axios from "../utils/api/axiosConfig";
import Article from "../components/Home/Article";

import { StyledButton } from "../utils/style/styles";

const ARTICLE_URL = "/article";

const Home = () => {
  const [isDataLoading, setDataLoading] = useState();
  const [error, setError] = useState(false);
  const [articlesList, setArticlesList] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      setDataLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(ARTICLE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticlesList(response.data);
      console.log(response.data);
      setDataLoading(false);
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
          <Article key={`article-${article.id}`} data={article} />
        ))
      )}
    </main>
  );
};

export default Home;
