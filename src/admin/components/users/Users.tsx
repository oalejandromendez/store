import React, { useEffect, useState } from 'react';
import Table from '../../../providers/Table';
import Modal from 'react-modal';
import {
  Formik,
  FormikHelpers,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { deleteUser, getAllUsers, getUserById, save, update } from '../../../fakeApi/providers/users';
import './Users.css';

Modal.setAppElement('#root');

interface User {
  id: string,
  email: string,
  username: string,
  password: string,
  firstname: string,
  lastname: string,
  city: string,
  street: string,
  number: number,
  zipcode: string,
  lat: string,
  long: string,
  phone: string
}

type UserKey = keyof User;

export const Users: React.FC = () => {

  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Nombre', accessor: 'name.firstname' },
      { Header: 'Apellido', accessor: 'name.lastname' },
      { Header: 'Correo', accessor: 'email' },
      { Header: 'Telefono', accessor: 'phone' }
    ],
    []
  );

  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [initialValues, setInitialFormValues] = useState({ id: '', email: '', username: '', password: '', firstname: '', lastname: '', city: '', street: '', number: 0, zipcode: '', lat: '', long: '', phone: '' });
  const [action, setAction] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await getAllUsers();
    setUsers(response);
  }

  const fetchUser = async (id: string) => {
    try {
      const response = await getUserById(id ?? "");
      setAction('update');
      setModalIsOpen(true);
      setInitialFormValues({
        id:   response.id, 
        email: response.email,
        username: response.username,
        password: '',
        firstname: response.name.firstname,
        lastname: response.name.firstname,
        city: response.address.city, 
        street: response.address.street, 
        number: response.address.number, 
        zipcode: response.address.zipcode, 
        lat: response.address.geolocation.lat, 
        long: response.address.geolocation.long, 
        phone: response.phone 
      });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const validate = (values: User) => {
    const errors: Partial<any> = {};
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const UserKey = key as UserKey;
        const value = values[UserKey];
        if( (action === 'new' && !value) || (action === 'update' && UserKey !== 'password' && !value) ) {
          errors[UserKey] = `Campo requerido`;
        }
      }
    }
    return errors;
  };

  const handleSubmit = async (values: User, actions: FormikHelpers<User>) => {
    actions.setSubmitting(false);

    const user = {
      id        : values.id,
      email     : values.email,
      username  : values.username,
      password  : values.password,
      name: {
          firstname: values.firstname,
          lastname: values.lastname
      },
      address: {
          city: values.city,
          street: values.street,
          number: values.number,
          zipcode: values.zipcode,
          geolocation: {
              lat: values.lat,
              long: values.long
          }
      },
      phone: values.phone
    }

    if (action === 'new') {
      await save((error: any, response?: any) => {
        afetSubmit(actions, error ?? false, error? 'Error al guardar el usuario' : 'El usuario se creo satisfactoriamente');
      }, user);
    } else {
      await update((error: any, response?: any) => {
        afetSubmit(actions, error ?? false, error? 'Error al modificar el usuario' : 'El usuario se modifico satisfactoriamente');
      }, user);
    }
  };

  const afetSubmit = (actions: FormikHelpers<User>, error: boolean, description: string) => {
    actions.resetForm();
    getUsers();
    if(error) {
      showAlert('Error!', description, 'error');
    } else {
      showAlert('Proceso Satisfactorio!', description, 'success');
      closeModal();
    }
  }

  const handleEdit = async (id: string) => {
    await fetchUser(id);
  };

  const handleDelete = async (id: string) => {
    const response = await deleteUser(id);
    if (response) {
      Swal.fire(
        "¡Eliminado!",
        "El campo ha sido eliminado con éxito",
        "success"
      );
      getUsers();
    }
  };

  const handleNew = () => {
    setInitialFormValues({ id: '', email: '', username: '', password: '', firstname: '', lastname: '', city: '', street: '', number: 0, zipcode: '', lat: '', long: '', phone: '' })
    setModalIsOpen(true);
    setAction('new');
  };

  const showAlert = (title: string, message: string, type: SweetAlertIcon) => {
    Swal.fire(title, message, type);
  };

  return (
    <div className="container mt-5">
      <h1>Usuarios</h1>
      <hr />
      <div className="row">
        <Table
          columns={columns}
          data={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onNew={handleNew}
        />
      </div>
      <div>

        {<Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Modal
              className="modal-users"
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Usuario"
            >
              <h1 className="mt-2">
                {
                  action === 'new' ? ('Nuevo Usuario') : ('Modificar Usuario')
                }
              </h1>
              <Form className="mt-3">
                <Field type="hidden" name="id" />
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="firstname">Nombre:</label>
                      <Field type="text" name="firstname" className="form-control" />
                      <ErrorMessage name="firstname" component="div" className="text-danger" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="lastname">Apellido:</label>
                      <Field type="text" name="lastname" className="form-control" />
                      <ErrorMessage name="lastname" component="div" className="text-danger" />
                    </div>
                  </div>
                  <div className="col-md-4">
                  <div className="form-group">
                      <label htmlFor="email">Correo:</label>
                      <Field type="email" name="email" className="form-control" />
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="username">Nombre de Usuario:</label>
                      <Field type="text" name="username" className="form-control" />
                      <ErrorMessage name="username" component="div" className="text-danger" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="password">Contraseña:</label>
                      <Field type="password" name="password" className="form-control" />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="phone">Telefono:</label>
                      <Field type="text" name="phone" className="form-control" />
                      <ErrorMessage name="phone" component="div" className="text-danger" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="city">Ciudad:</label>
                      <Field type="text" name="city" className="form-control" />
                      <ErrorMessage name="city" component="div" className="text-danger" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="street">Calle:</label>
                      <Field type="text" name="street" className="form-control" />
                      <ErrorMessage name="street" component="div" className="text-danger" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="number">Número:</label>
                      <Field type="number" name="number" className="form-control" />
                      <ErrorMessage name="number" component="div" className="text-danger" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="zipcode">Codigo Postal:</label>
                      <Field type="text" name="zipcode" className="form-control" />
                      <ErrorMessage name="zipcode" component="div" className="text-danger" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="lat">Latitud:</label>
                      <Field type="text" name="lat" className="form-control" />
                      <ErrorMessage name="lat" component="div" className="text-danger" />
                    </div>
                  </div>
                  <div className="col-md-4">
                  <div className="form-group">
                      <label htmlFor="long">Longitud:</label>
                      <Field type="text" name="long" className="form-control" />
                      <ErrorMessage name="long" component="div" className="text-danger" />
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-2">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {
                      action === 'new' ? ('Guardar') : ('Modificar')
                    }
                  </button>
                  <button type="button" className="btn btn-secondary ml-5" onClick={closeModal}>Cerrar</button>
                </div>
              </Form>
            </Modal>
          )}
        </Formik>}
      </div>
    </div>
  )
}