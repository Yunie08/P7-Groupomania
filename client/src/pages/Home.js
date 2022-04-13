import { useState } from "react";

// Components
import AddArticleModal from "../components/Home/AddArticleModal";
import { StyledButton } from "../utils/style/styles";
import ArticlesList from "../components/Shared/ArticlesList";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const [articleListEdited, setArticleListEdited] = useState(true);

  return (
    <main className="d-flex flex-column align-items-center">
      <h1>Un espace d'échange avec vos collègues</h1>
      <StyledButton
        $outline
        className="rounded-pill mt-4"
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

      <ArticlesList
        articleListEdited={articleListEdited}
        setArticleListEdited={setArticleListEdited}
      />
    </main>
  );
};

export default Home;
