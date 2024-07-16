"use client";
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  flexRender,
  getCoreRowModel,
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
import UpdateIncome from '@/app/(routes)/dashboard/income/_components/UpdateIncome';

const TransactionDataTable = ({ columns, data = [],onUpdate, onDelete }) => {
  const actionColums = columns(onUpdate, onDelete);

  const table = useReactTable({
    data,
    columns: actionColums,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [{ id: 'date', desc: true }], // Default sort by date in descending order
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
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
    </div>
  );
};

TransactionDataTable.propTypes = {
  columns: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TransactionDataTable;


// "use client";
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import {
//   flexRender,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from '@tanstack/react-table';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';

// const TransactionDataTable = ({ columns = [], data = [], onUpdate, onDelete }) => {
//   const [editableRows, setEditableRows] = useState({});

//   const handleEdit = (row) => {
//     setEditableRows((prevState) => ({
//       ...prevState,
//       [row._id]: true, // Set editing state for this row
//     }));
//   };

//   const handleSave = async (row) => {
//     try {
//       const updatedRow = data.find(item => item._id === row._id);
//       await onUpdate(updatedRow);
//       setEditableRows((prevState) => ({
//         ...prevState,
//         [row._id]: false, // Turn off editing state for this row
//       }));
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleCancelEdit = (row) => {
//     setEditableRows((prevState) => ({
//       ...prevState,
//       [row._id]: false, // Cancel editing for this row
//     }));
//   };

//   const handleUpdateCell = (row, accessorKey, value) => {
//     const updatedRow = {
//       ...row,
//       [accessorKey]: value,
      
//     };
//     onUpdate(updatedRow);
    
//   };

//   const updatedColumns = columns(handleEdit, handleSave, handleCancelEdit, onDelete, editableRows);

//   const table = useReactTable({
//     data,
//     columns: updatedColumns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     initialState: {
//       sorting: [{ id: 'date', desc: true }], // Default sort by date in descending order
//     },
//   });

//   return (
//     <div className="rounded-md border">
//       <Table>
//         <TableHeader>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <TableRow key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <TableHead
//                   key={header.id}
//                   onClick={header.column.getToggleSortingHandler()}
//                   className={header.column.getIsSorted() ? header.column.getIsSorted() === 'desc' ? 'sorted-desc' : 'sorted-asc' : ''}
//                 >
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                 </TableHead>
//               ))}
//             </TableRow>
//           ))}
//         </TableHeader>
//         <TableBody>
//           {table.getRowModel().rows.length ? (
//             table.getRowModel().rows.map((row) => (
//               <TableRow
//                 key={row.id}
//                 data-state={row.getIsSelected() && 'selected'}
//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell key={cell.id}>
//                     {editableRows[row.original._id] ? (
//                       <input
//                         type="text"
//                         value={cell.getValue()}
//                         onChange={(e) => handleUpdateCell(row.original, cell.column.accessorKey, e.target.value)}
//                       />
//                     ) : (
//                       flexRender(cell.column.columnDef.cell, cell.getContext())
//                     )}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={columns.length} className="h-24 text-center">
//                 No results.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// TransactionDataTable.propTypes = {
//   columns: PropTypes.func.isRequired,
//   data: PropTypes.arrayOf(PropTypes.object).isRequired,
//   onUpdate: PropTypes.func.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

// export default TransactionDataTable;
