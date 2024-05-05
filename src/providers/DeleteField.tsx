import Swal from "sweetalert2";

interface PropsDeleteConfirmation {
    onConfirm: () => void;
  }

export const DeleteConfirmation: React.FC<PropsDeleteConfirmation> = ({ onConfirm }) => {
    const handleDelete = () => {
        Swal.fire({
          title: "¿Está seguro?",
          text: "Esta seguro de eliminar el campo?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar"
        }).then((result) => {
          if (result.isConfirmed) {
            onConfirm();
          } else {
            Swal.fire(
              "Cancelado",
              "Proceso Cancelado",
              "info"
            );
          }
        });
    };
    return (
        <button type="button" onClick={handleDelete} className="btn btn-danger" style={{ marginLeft: '5px'}}>Eliminar</button>
    );
  };