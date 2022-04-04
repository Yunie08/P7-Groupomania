import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import axios from "../../utils/api/axiosConfig";

// React-bootsrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { StyledButton } from "../../utils/style/styles";

// Yup validation schema
import { signupSchema } from "../../utils/validation/signupSchema";

const SIGNUP_URL = "/auth/signup";

const SignupForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isRegistered, setRegistered] = useState(false);

  // Send registering request to API
  // TODO: separate services in another folder
  const signup = async ({
    firstname,
    lastname,
    email,
    password,
    passwordConfirm,
  }) => {
    try {
      setRegistered(false);
      await axios.post(SIGNUP_URL, {
        firstname,
        lastname,
        email,
        password,
        passwordConfirm,
      });
      setRegistered(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordConfirm: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        signup(values);
      }}
      validationSchema={signupSchema}
    >
      {(formik, isSubmitting) => (
        <Form>
          <Row>
            {isRegistered && (
              <div className="text-success text-center py-2">
                Compte créé ! Vous allez être redirigé pour vous connecter.
              </div>
            )}
            {error && (
              <div className="text-danger text-center py-2">{error}</div>
            )}
            <Col lg={6}>
              <div className="form-group">
                <label htmlFor="signupFirstName" className="mt-3">
                  Prénom
                </label>
                <Field
                  name="firstname"
                  id="signupFirstName"
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

            <Col lg={6}>
              <div className="form-group">
                <label htmlFor="signupLastName" className="mt-3">
                  Nom
                </label>
                <Field
                  name="lastname"
                  id="signupLastName"
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
            <label htmlFor="signupEmail" className="mt-3">
              Email
            </label>
            <Field
              name="email"
              id="signupEmail"
              className={
                formik.touched.email && formik.errors.email
                  ? "form-control is-invalid"
                  : "form-control"
              }
              type="text"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="invalid-feedback">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="signupPassword" className="mt-3">
              Mot de passe
            </label>
            <Field
              name="password"
              id="signupPassword"
              className={
                formik.touched.password && formik.errors.password
                  ? "form-control is-invalid"
                  : "form-control"
              }
              type="password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="invalid-feedback">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="signupPasswordConfirm" className="mt-3">
              Confirmation mot de passe
            </label>
            <Field
              name="passwordConfirm"
              id="signupPasswordConfirm"
              className={
                formik.touched.passwordConfirm && formik.errors.passwordConfirm
                  ? "form-control is-invalid"
                  : "form-control"
              }
              type="password"
            />
            {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
              <div className="invalid-feedback">
                {formik.errors.passwordConfirm}
              </div>
            ) : null}
          </div>

          <div className="form-group d-flex flex-column align-items-center">
            <StyledButton
              type="submit"
              className="btn btn-primary mt-4 rounded-pill mb-2"
            >
              S'inscrire
            </StyledButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
