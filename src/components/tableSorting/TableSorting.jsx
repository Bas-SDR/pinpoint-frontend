import React from "react";
import { flexRender } from "@tanstack/react-table";
import './TableSorting.css';

function TableSorting({ table }) {
    return (
        <table className="table-outer-styling">
            <thead>
            {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <th
                            key={header.id}
                            onClick={header.column.getToggleSortingHandler()}
                            className="table-inner-styling"
                        >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                                asc: "🔺",
                                desc: "🔻",
                            }[header.column.getIsSorted()] ?? null}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                        <td
                            key={cell.id}
                            className="table-styling"
                        >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default TableSorting;