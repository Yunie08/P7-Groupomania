import { useState } from "react";

// Service
import commentService from "../../services/commentService";

// Components
import { Formik, Field, Form } from "formik";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { StyledButton } from "../../utils/style/styles";

// Validation schema
import { commentSchema } from "../../utils/validation/commentSchema";

// Style
import styled from "styled-components";

const AddComment = ({
  articleId,
  setCommentRefresh,
  setCommentsCount,
  commentsCount,
}) => {
  const [error, setError] = useState(null);

  const postComment = async ({ content }) => {
    try {
      await commentService.addComment(articleId, { content });
      setCommentRefresh(true);
      setCommentsCount(commentsCount + 1);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <Formik
      initialValues={{ content: "" }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        postComment(values);
        resetForm();
      }}
      validateOnBlur={false}
      validationSchema={commentSchema}
    >
      {(formik, isSubmitting) => (
        <Form className="mt-3 d-flex">
          <div className="form-group w-100 me-2">
            <label htmlFor={`commentInput-${articleId}`} className="sr-only">
              Ajouter un commentaire
            </label>
            <Field
              name="content"
              id={`commentInput-${articleId}`}
              className={
                formik.touched.content && formik.errors.content
                  ? "form-control is-invalid bg-light"
                  : "form-control bg-light "
              }
              placeholder="Laisser un commentaire..."
              as="textarea"
              maxLength="400"
            />

            {formik.touched.content && formik.errors.content ? (
              <div className="invalid-feedback">{formik.errors.content}</div>
            ) : null}
            {error && <div className="invalid-feedback">{error}</div>}
          </div>

          <StyledButton $submit $outline type="submit">
            <span className="sr-only">Envoyer le commentaire</span>
            <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
          </StyledButton>
        </Form>
      )}
    </Formik>
  );
};

export default AddComment;
