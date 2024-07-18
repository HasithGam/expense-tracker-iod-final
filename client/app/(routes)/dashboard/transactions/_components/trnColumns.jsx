"use client";
import { format } from 'date-fns';

const trnColumns = () => [
  
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
  
];


export default trnColumns;
