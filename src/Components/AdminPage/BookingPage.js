import React, {useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SeatFormat from '../SeatFormat.json';
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

export default function BookingPage() {
  const [expanded, setExpanded] = useState('');
  const [movie, setMovie] = useState([]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
  <div>
    <Autocomplete
      disablePortal
      disableClearable
      id="MovieList"
      getOptionLabel={(option) => option.movie+" - "+option.city}
      options={SeatFormat}
      sx={{ width: 300, m: '10px' }}
      renderInput={(params) => <TextField {...params} label="Select Movie - City" />}
      onChange={(e, newValue)=>newValue!==null ? setMovie(newValue): []}
      />
    {movie.length!==0 ?
      <div>
        <Accordion expanded={expanded === 'reservedList'} onChange={handleChange('reservedList')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="bookedList"
            id="reservedList">
            <Typography>Reserved List</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ResBookTable ReservedList={ReservedList} columns={ReserveColumns}/>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'bookedList'} onChange={handleChange('bookedList')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="bookedList"
            id="bookedList">
            <Typography>Booked List</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ResBookTable ReservedList={BookedList} columns={BookColumns}/>
          </AccordionDetails>
        </Accordion>
      </div>: ''}
  </div>
  );
}