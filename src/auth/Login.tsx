import * as React from 'react';
import {
  Formik,
  FormikHelpers,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import { useNavigate } from 'react-router-dom';
import { login } from '../fakeApi/providers/auth';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import './Login.css';
import { LoginUser } from '../interfaces/login';

export const Login: React.FC = () => {

  const navigate = useNavigate();

  const onNavigateBack = () => {
    navigate('/index');
  }

  const initialValues: LoginUser = { username: '', password: '' };

  const validate = (values: LoginUser) => {
    const errors: Partial<LoginUser> = {};
    if (!values.username) {
      errors.username = 'El nombre de usuario es requerido';
    }
    if (!values.password) {
      errors.password = 'La contraseña es requerida';
    }
    return errors;
  };

  const handleSubmit = async (values: LoginUser, actions: FormikHelpers<LoginUser>) => {
    actions.setSubmitting(false);
    await login((error: any, response?: any) => {
      if (error) {
        showAlert('Error!', 'Nombre de usuario o contraseña incorrecta', 'error');
      } else {
        if (response.token) {
          sessionStorage.setItem('token', response.token);
          navigate('/index');
        }
      }
    }, values);
  };

  const showAlert = (title: string, message: string, type: SweetAlertIcon) => {
    Swal.fire(title, message, type);
  };

  return (
    <div className="container col-md-5">
      <h1 className="mt-5">Login</h1>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mt-3">
            <div className="form-group">
              <label htmlFor="username">Nombre de usuario:</label>
              <Field type="text" name="username" className="form-control" />
              <ErrorMessage name="username" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            <div className="d-flex justify-content-center mt-2">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                Iniciar Sesion
              </button>
              <button type="button" className="btn btn-secondary ml-5" onClick={onNavigateBack}>Home</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

