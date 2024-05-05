import React from 'react';

export const Filter: React.FC<{ column: any }> = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <input
      value={filterValue || ''}
      onChange={(e) => setFilter(e.target.value)}
      placeholder={`Buscar`}
    />
  );
};
