import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { ColumnResizeMode } from '@tanstack/table-core';
import { useState } from 'react';

interface Person {
    name: string;
    age: number;
    country: string;
    status: string;
}

const data: Person[] = [
    { name: 'John Doe', age: 25, country: 'USA', status: 'Active' },
    { name: 'Jane Smith', age: 30, country: 'Canada', status: 'Inactive' },
    { name: 'Alex Johnson', age: 22, country: 'UK', status: 'Pending' },
];

const columns: ColumnDef<Person>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'age',
        header: 'Age',
    },
    {
        accessorKey: 'country',
        header: 'Country',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
];

export const CustomTable = () => {
    const [columnResizeMode] = useState<ColumnResizeMode>('onChange');

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode, // Optional: To handle resizing columns
    });

    return (
        <div className="p-1 w-full overflow-x-auto">
            <table className=" border-collapse w-full">
                <thead className="bg-gray-200">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    className="px-4 py-2 text-left font-medium text-gray-700 border-b border-gray-300"
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="hover:bg-gray-100">
                            {row.getVisibleCells().map(cell => (
                                <td
                                    key={cell.id}
                                    className="px-4 py-2 border-b border-gray-300 text-gray-700"
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
