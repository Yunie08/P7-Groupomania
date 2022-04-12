import { useState } from "react";

// Components
import { Formik, Field, Form } from "formik";
import { StyledButton } from "../../utils/style/styles";

// Services and helpers
import userService from "../../services/userService";

// Validation schema
import { passwordSchema } from "../../utils/validation/passwordSchema";

const UpdatePasswordForm = ({ setModalShow, userId }) => {
  const [error, setError] = useState(null);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const handleSubmit = async (values) => {
    try {
      await userService.updateUserPassword(userId, values);
      setPasswordUpdated(true);
      setTimeout(() => setModalShow(false), 3000);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <Formik
      initialValues={{
        oldPassword: "",
        updatedPassword: "",
        updatedPasswordConfirm: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
      }}
      validationSchema={passwordSchema}
    >
      {(formik, isSubmitting) => (
        <Form onClick={() => setError(null)}>
          {passwordUpdated && (
            <div className="text-success text-center py-2">
              Votre mot de passe a été modifié !
            </div>
          )}
          {error && <div className="text-danger text-center py-2">{error}</div>}
          <div className="form-group">
            <label htmlFor="oldPassword">Mot de passe actuel</label>
            <Field
              name="oldPassword"
              id="oldPassword"
              className={
                formik.touched.oldPassword && formik.errors.oldPassword
                  ? "form-control is-invalid"
                  : "form-control"
              }
              type="password"
            />
            {formik.touched.oldPassword && formik.errors.oldPassword ? (
              <div className="invalid-feedback">
                {formik.errors.oldPassword}
              </div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="updatedPassword" className="mt-3">
              Nouveau mot de passe
            </label>
            <Field
              name="updatedPassword"
              id="updatedPassword"
              className={
                formik.touched.updatedPassword && formik.errors.updatedPassword
                  ? "form-control is-invalid"
                  : "form-control"
              }
              type="password"
            />
            {formik.touched.updatedPassword && formik.errors.updatedPassword ? (
              <div className="invalid-feedback">
                {formik.errors.updatedPassword}
              </div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="updatedPasswordConfirm" className="mt-3">
              Confirmation nouveau mot de passe
            </label>
            <Field
              name="updatedPasswordConfirm"
              id="updatedPasswordConfirm"
              className={
                formik.touched.updatedPasswordConfirm &&
                formik.errors.updatedPasswordConfirm
                  ? "form-control is-invalid"
                  : "form-control"
              }
              type="password"
            />
            {formik.touched.updatedPasswordConfirm &&
            formik.errors.updatedPasswordConfirm ? (
              <div className="invalid-feedback">
                {formik.errors.updatedPasswordConfirm}
              </div>
            ) : null}
          </div>

          <div className="form-group d-flex flex-column align-items-center">
            <StyledButton
              type="submit"
              className="btn btn-primary mt-4 rounded-pill mb-2"
            >
              Envoyer
            </StyledButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePasswordForm;
