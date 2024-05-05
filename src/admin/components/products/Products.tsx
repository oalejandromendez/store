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
import { deleteProduct, getAllProducts, getProductById, save, update } from '../../../fakeApi/providers/products';
import './Products.css';

Modal.setAppElement('#root');

interface AddProduct {
  category: string,
  description: string,
  image: string,
  price: number,
  title: string
}

type ProductKey = keyof AddProduct;

export const Products: React.FC = () => {

  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Título', accessor: 'title' },
      { Header: 'Precio', accessor: 'price' }
    ],
    []
  );

  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [initialValues, setInitialFormValues] = useState({ category: '', description: '', image: '', price: 0, title: '' });
  const [action, setAction] = useState('');

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await getAllProducts();
    setProducts(response);
  }

  const fetchProduct = async (id:string) => {
    try {
      const response = await getProductById(id ?? "");
      setAction('update');
      setModalIsOpen(true);
      setInitialFormValues(response);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const validate = (values: AddProduct) => {
    const errors: Partial<any> = {};
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const productKey = key as ProductKey;
        const value = values[productKey];
        if (!value) {
          errors[productKey] = `Campo requerido`;
        }
      }
    }
    return errors;
  };

  const handleSubmit = async (values: AddProduct, actions: FormikHelpers<AddProduct>) => {
    actions.setSubmitting(false);
    if( action === 'new' ) {
      await save((error: any, response?: any) => {
        afetSubmit(actions, error ?? false, error? 'Error al guardar el producto' : 'El producto se creo satisfactoriamente');
      }, values);
    } else {
      await update((error: any, response?: any) => {
        afetSubmit(actions, error ?? false, error? 'Error al modificar el producto' : 'El producto se modifico satisfactoriamente');
      }, values);
    }
  };

  const afetSubmit = (actions: FormikHelpers<AddProduct>, error: boolean, description: string) => {
    actions.resetForm();
    getProducts();
    if(error) {
      showAlert('Error!', description, 'error');
    } else {
      showAlert('Proceso Satisfactorio!', description, 'success');
      closeModal();
    }
  }

  const handleEdit = async(id: string) => {
    await fetchProduct(id);
  };

  const handleDelete = async(id: string) => {
    const response = await deleteProduct(id);
    if(response) {
      Swal.fire(
        "¡Eliminado!",
        "El campo ha sido eliminado con éxito",
        "success"
      );
      getProducts();
    }
  };

  const handleNew = () => {
    setInitialFormValues({ category: '', description: '', image: '', price: 0, title: '' })
    setModalIsOpen(true);
    setAction('new');
  };

  const showAlert = (title: string, message: string, type: SweetAlertIcon) => {
    Swal.fire(title, message, type);
  };

  return (
    <div className="container mt-5">
      <h1>Productos</h1>
      <hr />
      <div className="row">
        <Table
          columns={columns}
          data={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onNew={handleNew}
        />
      </div>
      <div>

        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Modal
              className="modal-products"
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Producto"
            >
              <h1 className="mt-2">
                {
                  action === 'new' ? ('Nuevo Producto') : ('Modificar Producto')
                }
              </h1>
              <Form className="mt-3">
                <div className="form-group">
                  <label htmlFor="title">Titulo:</label>
                  <Field type="text" name="title" className="form-control" />
                  <ErrorMessage name="title" component="div" className="text-danger" />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Precio:</label>
                  <Field type="text" name="price" className="form-control" />
                  <ErrorMessage name="price" component="div" className="text-danger" />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Descripción:</label>
                  <Field component="textarea" rows="4" name="description" className="form-control" />
                  <ErrorMessage name="description" component="div" className="text-danger" />
                </div>
                <div className="form-group">
                  <label htmlFor="image">Imagen:</label>
                  <Field type="text" name="image" className="form-control" />
                  <ErrorMessage name="image" component="div" className="text-danger" />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Categoria:</label>
                  <Field type="text" name="category" className="form-control" />
                  <ErrorMessage name="category" component="div" className="text-danger" />
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
        </Formik>
      </div>
    </div>
  )
}