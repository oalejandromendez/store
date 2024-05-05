import React from 'react';
import { DeleteConfirmation } from './DeleteField';

interface ActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}
export const Actions: React.FC<ActionsProps> = ({ onEdit, onDelete }) => {
  return (
    <div>
      <button type="button" className="btn btn-warning" onClick={onEdit} style={{ marginLeft: '5px'}}>Editar</button>
      <DeleteConfirmation onConfirm={onDelete}></DeleteConfirmation>
    </div>
  );
};
