import React from "react";
import { Formik, Field, Form } from "formik";
import { PrimaryButton } from "../utils/style/styles";

// Validation schema
import { loginSchema } from "../utils/validation/loginSchema";

const LoginForm = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 1000);
      }}
      validationSchema={loginSchema}
    >
      {(formik, isSubmitting) => (
        <Form>
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
            <PrimaryButton
              type="submit"
              className="btn btn-primary mt-4 rounded-pill mb-2"
            >
              Se connecter
            </PrimaryButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
