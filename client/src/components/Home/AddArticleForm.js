import { useState } from "react";
import { Formik, Field, Form } from "formik";
import axios from "../../utils/api/axiosConfig";
import { StyledButton } from "../../utils/style/styles";
import PreviewImage from "../Shared/PreviewImage";

import { articleSchema } from "../../utils/validation/articleSchema";

import articleService from "../../services/articleService";

const AddArticleForm = ({ setModalShow, setArticleListEdited }) => {
  const [error, setError] = useState(null);

  const dataFormatter = (data) => {
    if (data?.image) {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("image", data.image);

      return formData;
    } else {
      return data;
    }
  };

  const postArticle = async (values) => {
    try {
      const data = dataFormatter(values);
      const isMultipart = values?.image ? true : false;
      const response = await articleService.addArticle(data, isMultipart);
      console.log(response);
      setArticleListEdited(true);
      setModalShow(false);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <Formik
      initialValues={{ title: "", content: "", image: null }}
      onSubmit={(values, { setSubmitting }) => {
        postArticle(values);
      }}
      validationSchema={articleSchema}
    >
      {(formik, isSubmitting) => (
        <Form>
          {error && <div className="text-danger text-center py-2">{error}</div>}
          <div className="form-group">
            <label htmlFor="articleTitle">Titre</label>
            <Field
              name="title"
              id="articleTitle"
              className={
                formik.touched.title && formik.errors.title
                  ? "form-control is-invalid"
                  : "form-control"
              }
              type="text"
              onClick={() => setError(null)}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="invalid-feedback">{formik.errors.title}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="articleContent" className="mt-3">
              Contenu
            </label>
            <Field
              name="content"
              id="articleContent"
              className={
                formik.touched.content && formik.errors.content
                  ? "form-control is-invalid"
                  : "form-control"
              }
              as="textarea"
              onClick={() => setError(null)}
            />
            {formik.touched.content && formik.errors.content ? (
              <div className="invalid-feedback">{formik.errors.content}</div>
            ) : null}
          </div>
          {formik.values.image && (
            <PreviewImage file={formik.values.image} className="image-fluid" />
          )}
          <div className="form-group">
            <label htmlFor="articleImage" className="mt-3">
              Image <small>(option)</small>
            </label>

            <input
              id="articleImage"
              name="image"
              type="file"
              onChange={(event) => {
                formik.setFieldValue("image", event.target.files[0]);
              }}
              className={
                formik.touched.image && formik.errors.image
                  ? "form-control is-invalid"
                  : "form-control"
              }
            />

            {formik.touched.image && formik.errors.image ? (
              <div className="invalid-feedback">{formik.errors.image}</div>
            ) : null}
          </div>

          <div className="form-group d-flex flex-column align-items-center">
            <StyledButton
              type="submit"
              className="btn btn-primary mt-4 rounded-pill mb-2"
            >
              Publier
            </StyledButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddArticleForm;