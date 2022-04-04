import React, { useRef } from "react";
import { Formik, Field, Form } from "formik";

// React-bootsrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { StyledButton } from "../../utils/style/styles";

// Validation schema
import { userSchema } from "../../utils/validation/userSchema";
import PreviewImage from "../Shared/PreviewImage";

const ProfileForm = () => {
  const fileRef = useRef(null);
  return (
    <Formik
      initialValues={{
        firstname: "Ambre",
        lastname: "",
        bio: "",
        linkedinProfile: "",
        twitterProfile: "",
        facebookProfile: "",
        instagramProfile: "",
        profilePic: null,
      }}
      onSubmit={(values, { setSubmitting }, errors) => {
        console.log(values);
      }}
      validationSchema={userSchema}
    >
      {(formik, isSubmitting, values) => (
        <Form>
          <div className="form-group">
            <label htmlFor="profilePic"></label>
            <input
              ref={fileRef}
              id="profilePic"
              name="profilePic"
              type="file"
              onChange={(event) => {
                formik.setFieldValue("profilePic", event.target.files[0]);
              }}
              className={
                formik.touched.firstname && formik.errors.firstname
                  ? "form-control is-invalid"
                  : "form-control"
              }
            />

            {formik.values.profilePic && (
              <PreviewImage file={formik.values.profilePic} />
            )}
            {formik.touched.profilePic && formik.errors.profilePic ? (
              <div className="invalid-feedback">{formik.errors.profilePic}</div>
            ) : null}
          </div>
          <Row>
            <Col md={6}>
              <div className="form-group">
                <label htmlFor="profileFirstName" className="mt-3">
                  Prénom
                </label>
                <Field
                  name="firstname"
                  id="profileFirstName"
                  className={
                    formik.touched.firstname && formik.errors.firstname
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  type="text"
                />
                {formik.touched.firstname && formik.errors.firstname ? (
                  <div className="invalid-feedback">
                    {formik.errors.firstname}
                  </div>
                ) : null}
              </div>
            </Col>

            <Col md={6}>
              <div className="form-group">
                <label htmlFor="profileLastName" className="mt-3">
                  Nom
                </label>
                <Field
                  name="lastname"
                  id="profileLastName"
                  className={
                    formik.touched.lastname && formik.errors.lastname
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  type="text"
                />
                {formik.touched.lastname && formik.errors.lastname ? (
                  <div className="invalid-feedback">
                    {formik.errors.lastname}
                  </div>
                ) : null}
              </div>
            </Col>
          </Row>

          <div className="form-group">
            <label htmlFor="profileBio" className="mt-3">
              Bio
            </label>
            <Field
              name="bio"
              id="profileBio"
              className={
                formik.touched.bio && formik.errors.bio
                  ? "form-control is-invalid"
                  : "form-control"
              }
              as="textarea"
            />
            {formik.touched.bio && formik.errors.bio ? (
              <div className="invalid-feedback">{formik.errors.bio}</div>
            ) : null}
          </div>

          <Row>
            <Col md={6}>
              <div className="form-group">
                <label htmlFor="linkedinProfile" className="mt-3">
                  Linkedin
                </label>
                <Field
                  name="linkedinProfile"
                  id="linkedinProfile"
                  className={
                    formik.touched.linkedinProfile &&
                    formik.errors.linkedinProfile
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  type="text"
                />
                {formik.touched.linkedinProfile &&
                formik.errors.linkedinProfile ? (
                  <div className="invalid-feedback">
                    {formik.errors.linkedinProfile}
                  </div>
                ) : null}
              </div>
            </Col>

            <Col md={6}>
              <div className="form-group">
                <label htmlFor="twitterProfile" className="mt-3">
                  Twitter
                </label>
                <Field
                  name="twitterProfile"
                  id="twitterProfile"
                  className={
                    formik.touched.twitterProfile &&
                    formik.errors.twitterProfile
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  type="text"
                />
                {formik.touched.twitterProfile &&
                formik.errors.twitterProfile ? (
                  <div className="invalid-feedback">
                    {formik.errors.twitterProfile}
                  </div>
                ) : null}
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="form-group">
                <label htmlFor="facebookProfile" className="mt-3">
                  Facebook
                </label>
                <Field
                  name="facebookProfile"
                  id="facebookProfile"
                  className={
                    formik.touched.facebookProfile &&
                    formik.errors.facebookProfile
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  type="text"
                />
                {formik.touched.facebookProfile &&
                formik.errors.facebookProfile ? (
                  <div className="invalid-feedback">
                    {formik.errors.facebookProfile}
                  </div>
                ) : null}
              </div>
            </Col>

            <Col md={6}>
              <div className="form-group">
                <label htmlFor="instagramProfile" className="mt-3">
                  Instagram
                </label>
                <Field
                  name="instagramProfile"
                  id="instagramProfile"
                  className={
                    formik.touched.instagramProfile &&
                    formik.errors.instagramProfile
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  type="text"
                />
                {formik.touched.instagramProfile &&
                formik.errors.instagramProfile ? (
                  <div className="invalid-feedback">
                    {formik.errors.instagramProfile}
                  </div>
                ) : null}
              </div>
            </Col>
          </Row>

          <div className="form-group d-flex flex-column align-items-center">
            <StyledButton
              type="submit"
              className="btn btn-primary mt-4 rounded-pill mb-2"
            >
              Mettre à jour mon profil
            </StyledButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileForm;
