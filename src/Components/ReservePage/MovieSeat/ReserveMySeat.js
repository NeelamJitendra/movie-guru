import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import  './ReserveMySeat.css';
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

const ReserveMySeat = (props) => {
  let totalSeatArr = [];
  
  if(props.movie !== undefined){
    props.movie.SeatFor.map(e => {
      const seatArr= createSeats(e.endRow, e.startRow, e.letterTill);
      const concatArr=totalSeatArr.concat(seatArr);
      return totalSeatArr=concatArr;
    }); 
  }

  const [isBooked, setIsBooked] = useState(['1A', '1B', '2A', '2B']);
  const [isReserved, setIsReserved] = useState(['10A', '10B'])
  const [urSelection, setUrSelection] = useState([]);
  const [bookedStatus, setBookedStatus] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const addSeat = (ev) => {
      if(numberOfSeats && !ev.target.className.includes('disabled')) {
          const seatsToBook = parseInt(numberOfSeats, 10);
        if(urSelection.length <= seatsToBook) {
            if (urSelection.includes(ev.target.innerText)) {
                const newAvailable = urSelection.filter(seat => seat !== ev.target.innerText);
                setUrSelection(newAvailable);
            } else if(urSelection.length < numberOfSeats) {
                setUrSelection([...urSelection, ev.target.innerText]);

            } else if (urSelection.length === seatsToBook) {
                urSelection.shift();
                setUrSelection([...urSelection, ev.target.innerText]);
            }
        }
      }
    };

  const confirmBooking = () => {
      setBookedStatus('Mr/Mrs '+name+' you have successfully Reserved the following seats: ');
      urSelection.forEach(seat => {
           setBookedStatus(prevState => {
               return prevState + seat + ' ';
           })
      });
      const newAvailableSeats = isBooked.filter(seat => !urSelection.includes(seat));
      setIsBooked(newAvailableSeats);
      setUrSelection([]);
      setNumberOfSeats(0);
      setName('');
      setPhoneNo('');
      setEmail('');
  };

  return (
        <div style={{paddingLeft:'10px'}}>
            <p>Enter number of seats (Max 5 per reservation)</p>
            
            <Box sx={{'& .MuiTextField-root': { width: '40ch', marginTop:'-12px'}}}>
                <TextField variant="outlined" type="number" value={numberOfSeats} 
                    InputProps={{ inputProps: { min: "0", max: "5"} }}
                    onChange={(ev) => ev.target.value <=5 ? setNumberOfSeats(ev.target.value): setNumberOfSeats(5) }/>
            </Box>
            <div>
                <span style={{"display": "flex", "marginTop":10}}>Booked Seats
                    <Box
                        sx={{
                            width: 20,
                            height: 20,
                            marginLeft:6,
                            backgroundColor: 'rgb(165, 15, 15)'}}/>
                </span>
                <span  style={{"display": "flex", "marginTop":10}}>Reserved Seats
                    <Box
                        sx={{
                            width: 20,
                            height: 20,
                            marginLeft:6,
                            backgroundColor: '#a9b409'}}/>
                            
                </span>
            </div>
            <div className='screenDiv'>
                <span className='screen'>Screen</span> 
            </div> 
            <Seats values={totalSeatArr}
                   isBooked={isBooked}
                   isReserved={isReserved}
                   urSelection={urSelection}
                   addSeat={addSeat}/>
             <Box sx={{'& .MuiTextField-root': { m: '10px', width: '30ch' }}}>
                <TextField id="name" label="Name *" variant="outlined" value={name} onChange={e=>setName(e.target.value)}/>
                <TextField id="phone" type="number" label="Phone Number *" variant="outlined" value={phoneNo} onChange={e=>setPhoneNo(e.target.value)}/>
                <TextField id="email" type="email" label="Email *" variant="outlined" value={email} maxlength="10"onChange={e=>setEmail(e.target.value)}/>
            </Box>
            <Box m={'10px'}>
            <Button variant="contained" disabled={!name|| phoneNo.length <= 8 || !email || urSelection.length===0} onClick={()=>confirmBooking()}>
                Reserve Seats
            </Button>
            </Box>
            <p style={{paddingLeft:'20px'}}>{bookedStatus}</p>
        </div>

    );
}

export default ReserveMySeat;