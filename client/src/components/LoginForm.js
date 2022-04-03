import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import axios from "../utils/api/axiosConfig";
import { StyledButton } from "../utils/style/styles";
// Validation schema
import { loginSchema } from "../utils/validation/loginSchema";

const LOGIN_URL = "/auth/login";

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Send login request to API
  // TODO: separate services in another folder
  const login = async ({ email, password }) => {
    try {
      const response = await axios.post(LOGIN_URL, {
        email,
        password,
      });
      console.log(response);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        navigate("/home");
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        login(values);
      }}
      validationSchema={loginSchema}
    >
      {(formik, isSubmitting) => (
        <Form>
          {error && <div className="text-danger text-center py-2">{error}</div>}
          <div className="form-group">
            <label htmlFor="loginEmail">Email</label>
            <Field
              name="email"
              id="loginEmail"
              className={
                formik.touched.email && formik.errors.email
                  ? "form-control is-invalid"
                  : "form-control"
              }
              type="text"
              onClick={() => setError(null)}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="invalid-feedback">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="loginPassword" className="mt-3">
              Mot de passe
            </label>
            <Field
              name="password"
              id="loginPassword"
              className={
                formik.touched.password && formik.errors.password
                  ? "form-control is-invalid"
                  : "form-control"
              }
              type="password"
              onClick={() => setError(null)}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="invalid-feedback">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="form-group d-flex flex-column align-items-center">
            <StyledButton
              type="submit"
              className="btn btn-primary mt-4 rounded-pill mb-2"
            >
              Se connecter
            </StyledButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
