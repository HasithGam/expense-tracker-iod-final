// columns.jsx

import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Button } from '../ui/button';

export const columns = (handleUpdate, handleDelete) => [
  {
    accessorKey: 'title',
    header: 'TITLE',
  },
  {
    accessorKey: 'amount',
    header: 'AMOUNT',
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
  },
  {
    accessorKey: 'description',
    header: 'DESCRIPTION',
  },
  {
    accessorKey: 'actions',
    header: 'ACTIONS',
    cell: ({ row }) => (
      <>
      <div className='flex gap-2'>
        <Button onClick={() => handleUpdate(row.original)}>Update</Button>
        <Button onClick={() => handleDelete(row.original)} variant="destructive" >Delete</Button>
      </div>
      </>
    ),
  },
];

columns.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
