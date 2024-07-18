"use client";

import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Button } from '../ui/button';

const columns = (handleEdit, handleDelete) => [
  {
    accessorKey: '_id',
    header: 'ID',
  },
  {
    accessorKey: 'title',
    header: 'TITLE',
    editable: true,
  },
  {
    accessorKey: 'amount',
    header: 'AMOUNT',
    editable: true,
  },
  {
    accessorKey: 'type',
    header: 'TYPE',
  },
  {
    accessorKey: 'date',
    header: 'DATE',
    cell: ({ cell }) => format(new Date(cell.getValue()), 'yyyy-MM-dd'),
  },
  {
    accessorKey: 'category',
    header: 'CATEGORY',
    editable: true,
  },
  {
    accessorKey: 'description',
    header: 'DESCRIPTION',
    editable: true,
  },
  {
    accessorKey: 'actions',
    header: 'ACTIONS',
    cell: ({ row }) => (
      <div className='flex gap-2'>
        <Button onClick={() => handleEdit(row.original)}>Update</Button>
        <Button onClick={() => handleDelete(row.original)} variant="destructive">Delete</Button>
      </div>
    ),
  },
];

columns.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default columns;

