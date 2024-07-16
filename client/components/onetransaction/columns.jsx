"use client";

import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Button } from '../ui/button';

const columns = (handleEdit, handleUpdate, handleDelete) => [
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
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default columns;









// "use client";

// import PropTypes from 'prop-types';
// import { format } from 'date-fns';
// import { Button } from '../ui/button';

// export const columns = (handleEdit, handleSave, handleCancelEdit, handleDelete, editableRows) => [
//   {
//     accessorKey: 'title',
//     header: 'TITLE',
//     editable: true,
//   },
//   {
//     accessorKey: 'amount',
//     header: 'AMOUNT',
//     editable: true,
//   },
//   {
//     accessorKey: 'type',
//     header: 'TYPE',
//   },
//   {
//     accessorKey: 'date',
//     header: 'DATE',
//     cell: ({ cell }) => format(new Date(cell.getValue()), 'yyyy-MM-dd'),
//   },
//   {
//     accessorKey: 'category',
//     header: 'CATEGORY',
//     editable: true,
//   },
//   {
//     accessorKey: 'description',
//     header: 'DESCRIPTION',
//     editable: true,
//   },
//   {
//     accessorKey: 'actions',
//     header: 'ACTIONS',
//     cell: ({ row }) => (
//       <>
//         {editableRows[row.original._id] ? ( // Check if row is in edit mode
//           <div className='flex gap-2'>
//             <Button onClick={() => handleSave(row.original)}>Save</Button> {/* Change button to "Save" */}
//             <Button onClick={() => handleCancelEdit(row.original)}>Cancel</Button> {/* Add Cancel button */}
//           </div>
//         ) : (
//           <div className='flex gap-2'>
//             <Button onClick={() => handleEdit(row.original)}>Update</Button> {/* Change button to "Update" */}
//             <Button onClick={() => handleDelete(row.original)} variant="destructive">Delete</Button>
//           </div>
//         )}
//       </>
//     ),
//   },
// ];

// columns.propTypes = {
//   handleEdit: PropTypes.func.isRequired,
//   handleSave: PropTypes.func.isRequired,
//   handleCancelEdit: PropTypes.func.isRequired,
//   handleDelete: PropTypes.func.isRequired,
//   editableRows: PropTypes.object.isRequired,
// };
