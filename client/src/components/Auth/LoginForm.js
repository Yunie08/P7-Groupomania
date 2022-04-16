import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { AuthContext } from "../../utils/context/AuthContext";

// Validation schema
import { loginSchema } from "../../utils/validation/loginSchema";

// Services
import authService from "../../services/authService";

// Components
import { Formik, Field, Form } from "formik";
import { StyledButton } from "../../utils/style/styles";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const loginHandler = async ({ email, password }) => {
    try {
      const response = await authService.login({ email, password });
      if (response?.data?.token) {
        login(response.data);
        navigate("/home");
      }
    } catch (err) {
      if (err.response.status === 429) {
        setError("Trop de tentatives de connexion, réessayez dans 15 minutes");
      }
      if (err.response.status === 401) {
        setError(err?.response?.data?.message);
      } else {
        setError("Oups! Veuillez réessayer plus tard.");
      }
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        loginHandler(values);
      }}
      validationSchema={loginSchema}
    >
      {(formik, isSubmitting) => (
        <Form onClick={() => setError(null)}>
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
