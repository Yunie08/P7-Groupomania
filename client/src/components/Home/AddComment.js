import { useState } from "react";
import { Formik, Field, Form } from "formik";
import axios from "../../utils/api/axiosConfig";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { commentSchema } from "../../utils/validation/commentSchema";
import { StyledButton } from "../../utils/style/styles";
import styled from "styled-components";

const ARTICLE_URL = "/article";

const FormGroup = styled.div`
  textarea {
    height: 100px !important;
    padding-top: 30px !important;
  }
`;

const AddComment = ({
  articleId,
  commentRefresh,
  setCommentRefresh,
  setCommentsCount,
  commentsCount,
}) => {
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const postComment = async ({ content }) => {
    try {
      await axios.post(
        `${ARTICLE_URL}/${articleId}/comment`,
        {
          content,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // FIXME: !commentRefresh => true
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
