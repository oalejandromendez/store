import React from 'react';
import { useTable, useFilters, useSortBy } from 'react-table';
import { Filter } from './Filter';
import { Actions } from './Actions';

interface TableProps {
    columns: any[],
    data: any[],
    onEdit: (id: string) => void,
    onDelete: (id: string) => void
    onNew: () => void
}

const Table: React.FC<TableProps> = ({ columns, data, onEdit, onDelete, onNew }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable(
        { columns, data },
        useFilters,
        useSortBy
    );

    return (

        <>
            <div className='col-md-2'>
                <button type="button" className="btn btn-primary" onClick={onNew}>Nuevo</button>
            </div>

            <table {...getTableProps()} style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    {headerGroups.map((headerGroup) => {
                        const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
                        return (
                            <tr key={key} {...restHeaderGroupProps}>
                                {headerGroup.headers.map((column) => {
                                    const { key, ...restColumn } = column.getHeaderProps(column.getSortByToggleProps());
                                    return (
                                        <th key={key} {...restColumn} style={{ borderBottom: '2px solid black', padding: '8px', display: column.id === 'id' ? 'none' : 'table-cell' }}>
                                            {column.render("Header")}
                                            <span>
                                                {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                            </span>
                                            <div>
                                                {column.canFilter ? <Filter column={column} /> : null}
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </thead>
                <tbody {...getTableBodyProps}>
                    {rows.map((row) => {
                        prepareRow(row);
                        const { key, ...restRowProps } = row.getRowProps();
                        return (
                            <tr key={key} {...restRowProps}>
                                {row.cells.map((cell) => {
                                    const { key, ...restCellProps } = cell.getCellProps();
                                    const { column } = cell;
                                    return (
                                        <td key={key} {...restCellProps} style={{ borderBottom: '1px solid black', padding: '8px', display: column.id === 'id' ? 'none' : 'table-cell' }}>
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                                <td>
                                    <Actions
                                        onEdit={() => onEdit(row.values.id)}
                                        onDelete={() => onDelete(row.values.id)}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default Table;
