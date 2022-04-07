import React, { useEffect, useState } from "react";
import axios from "../utils/api/axiosConfig";
import Article from "../components/Home/Article";
import AddArticleModal from "../components/Home/AddArticleModal";

import { StyledButton } from "../utils/style/styles";

const ARTICLE_URL = "/article";

const Home = () => {
  const [isDataLoading, setDataLoading] = useState();
  const [error, setError] = useState(false);
  const [articlesList, setArticlesList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [articleListEdited, setArticleListEdited] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      setDataLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(ARTICLE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticlesList(response.data);
      setDataLoading(false);
    };
    if (articleListEdited) {
      getArticles();
    }
    setArticleListEdited(false);
  }, [articleListEdited]);

  if (error) {
    setError(error);
    return <span>{error}</span>;
  }

  return (
    <main className="d-flex flex-column align-items-center">
      <h1>Un espace d'échange avec vos collègues</h1>
      <StyledButton
        $outline
        className="rounded-pill my-4"
        onClick={() => setModalShow(true)}
      >
        Publier un article
      </StyledButton>
      <AddArticleModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setModalShow={setModalShow}
        setArticleListEdited={setArticleListEdited}
      />

      {isDataLoading ? (
        <div>Patience, ça charge</div>
      ) : (
        articlesList.map((article) => (
          <Article
            key={`article-${article.id}`}
            data={article}
            articleListEdited={articleListEdited}
            setArticleListEdited={setArticleListEdited}
          />
        ))
      )}
    </main>
  );
};

export default Home;
