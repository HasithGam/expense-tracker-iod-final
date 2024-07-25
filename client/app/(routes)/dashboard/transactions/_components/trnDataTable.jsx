"use client";
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';

const TranDataTable = ({ columns, data = [] }) => {
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns: columns(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
  });

  return (
    <div>
      <div className='flex items-center py-4'>
          <Input
            placeholder="Filter Title Here"
            value={table.getColumn('title')?.getFilterValue() ?? ''}
            onChange={(e) => table.getColumn('title')?.setFilterValue(e.target.value)}
          />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className='cursor-pointer bg-gray-200'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={
                      header.column.getIsSorted()
                        ? header.column.getIsSorted() === 'desc'
                          ? 'sorted-desc'
                          : 'sorted-asc'
                        : ''
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="pagination flex justify-between items-center p-4">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-gray-300 px-4 py-2 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="page-info">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-gray-300 px-4 py-2 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

TranDataTable.propTypes = {
  columns: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TranDataTable;
