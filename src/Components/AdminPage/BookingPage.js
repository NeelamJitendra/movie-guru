import * as React from 'react';
import ReservedList from '../ReservedList.json';
import BookedList from '../BookedList.json';
import ResBookTable from './ResBookTable';

const ReserveColumns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'phoneNo', label: 'Phone\u00a0Number', minWidth: 100 },
  {
    id: 'Email',
    label: 'Email',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'reservedSeats',
    label: 'Reserved\u00a0Seats',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'right',
  },
];

const BookColumns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'phoneNo', label: 'Phone\u00a0Number', minWidth: 100 },
    {
      id: 'Email',
      label: 'Email',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'bookedSeats',
      label: 'Booked\u00a0Seats',
      minWidth: 170,
      align: 'right',
    },
  ];

export default function StickyHeadTable() {

  return (
  <div>
      <h2>Reserved List</h2>
      <ResBookTable ReservedList={ReservedList} columns={ReserveColumns}/>
      <h2>Booked List</h2>
      <ResBookTable ReservedList={BookedList} columns={BookColumns}/>
  </div>
  );
}