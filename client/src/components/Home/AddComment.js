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

const FormGroup = styled.div`
  textarea {
    height: 100px !important;
    padding-top: 30px !important;
  }
`;

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
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={commentSchema}
    >
      {(formik, isSubmitting) => (
        <Form className="mt-3">
          <FormGroup className="form-group">
            <label htmlFor={`commentInput-${articleId}`} className="sr-only">
              Laisser un commentaire
            </label>
            <FloatingLabel
              htmlFor="content"
              label="Laisser un commentaire..."
              className="mb-1"
            >
              <Field
                name="content"
                id={`commentInput-${articleId}`}
                className={
                  formik.touched.content && formik.errors.content
                    ? "form-control is-invalid bg-light"
                    : "form-control bg-light"
                }
                placeholder="Laisser un commentaire"
                as="textarea"
                maxLength="400"
              />

              {formik.touched.content && formik.errors.content ? (
                <div className="invalid-feedback">{formik.errors.content}</div>
              ) : null}
              {error && <div className="invalid-feedback">{error}</div>}
            </FloatingLabel>
          </FormGroup>

          <div className="form-group d-flex flex-column align-items-center">
            <StyledButton
              type="submit"
              className="btn btn-primary ms-auto mt-2 rounded-pill mb-2"
            >
              Publier
            </StyledButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddComment;
