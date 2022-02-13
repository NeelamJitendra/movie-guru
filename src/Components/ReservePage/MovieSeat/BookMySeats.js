import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import  './BookMySeats.css';
import Seats from './Seats';

const createSeats = (rows, startIndex, endLetter) => {
    let i = 0;
    let j = startIndex;
    let k = 'A';
    const section = [];
    let rowArr=[];
    while(i < 6 && j <= rows) {
        if(k > endLetter) {
            k = 'A';
            j++;
            section.push(rowArr)
            rowArr=[]
            
        }
        if(j < rows + 1) {
            rowArr.push(j + k);
            k = String.fromCharCode(k.charCodeAt(0) + 1);
        }
    }
    return section;

}

const BookMySeats = (props) => {
  let totalSeatArr = [];
  
  if(props.movie !== undefined){
    props.movie.SeatFor.map(e => {
      const seatArr= createSeats(e.endRow, e.startRow, e.letterTill);
      const concatArr=totalSeatArr.concat(seatArr);
      return totalSeatArr=concatArr;
    }); 
  }

  const [isBooked, setIsBooked] = useState(['1A', '1B', '2A', '2B', '10A', '10B']);
  const [urBooking, setUrBooking] = useState([]);
  const [bookedStatus, setBookedStatus] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const addSeat = (ev) => {
      if(numberOfSeats && !ev.target.className.includes('disabled')) {
          const seatsToBook = parseInt(numberOfSeats, 10);
        if(urBooking.length <= seatsToBook) {
            if (urBooking.includes(ev.target.innerText)) {
                const newAvailable = urBooking.filter(seat => seat !== ev.target.innerText);
                setUrBooking(newAvailable);
            } else if(urBooking.length < numberOfSeats) {
                setUrBooking([...urBooking, ev.target.innerText]);

            } else if (urBooking.length === seatsToBook) {
                urBooking.shift();
                setUrBooking([...urBooking, ev.target.innerText]);
            }
        }
      }
    };

  const confirmBooking = () => {
      setBookedStatus('Mr/Mrs '+name+' you have successfully Reserved the following seats: ');
      urBooking.forEach(seat => {
           setBookedStatus(prevState => {
               return prevState + seat + ' ';
           })
      });
      const newAvailableSeats = isBooked.filter(seat => !urBooking.includes(seat));
      setIsBooked(newAvailableSeats);
      setUrBooking([]);
      setNumberOfSeats(0);
      setName('');
      setPhoneNo('');
      setEmail('');
  };
  console.log(phoneNo.length);

  return (
        <div>
            <p style={{paddingLeft:'20px'}}>How many seats would you like to book?</p>
            
            <Box sx={{'& .MuiTextField-root': { m: '10px', width: '40ch', marginTop:'-12px'}}}>
                <TextField variant="outlined" type="number" value={numberOfSeats} 
                    onChange={(ev) => setNumberOfSeats(ev.target.value)}/>
            </Box>
            <div className='screenDiv'>
                <span className='screen'>Screen</span> 
            </div> 
            <Seats values={totalSeatArr}
                   isBooked={isBooked}
                   urBooking={urBooking}
                   addSeat={addSeat}/>
             <Box sx={{'& .MuiTextField-root': { m: '10px', width: '30ch' }}}>
                <TextField id="name" label="Name *" variant="outlined" value={name} onChange={e=>setName(e.target.value)}/>
                <TextField id="phone" type="number" label="Phone Number *" variant="outlined" value={phoneNo} onChange={e=>setPhoneNo(e.target.value)}/>
                <TextField id="email" type="email" label="Email *" variant="outlined" value={email} onChange={e=>setEmail(e.target.value)}/>
            </Box>
            <Box m={'10px'}>
            <Button variant="contained" disabled={!name|| phoneNo.length <= 8 || !email || urBooking.length===0} onClick={()=>confirmBooking()}>
                Reserve Seats
            </Button>
            </Box>
            <p style={{paddingLeft:'20px'}}>{bookedStatus}</p>
        </div>

    );
}

export default BookMySeats;