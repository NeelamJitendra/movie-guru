import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import  './ReserveMySeat.css';
import Seats from './Seats';
import { getApi, reserveApi } from "../../Api";
import ReservationBox from '../../DialogBox/ReservationBox';

const createLetterSeats = (rows, startIndex, endLetter) => {
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
            rowArr.push(k + j);
            k = String.fromCharCode(k.charCodeAt(0) + 1);
        }
    }
    return section;

}

const ReserveMySeat = (props) => {
  let totalSeatArr = [];
  let premiumSeatArr=[];
  if(props.movie !== undefined){
      if(props.movie.type==='letter'){
        props.movie.SeatFor.map(e => {
            const seatArr= createLetterSeats(e.endRow, e.startRow, e.letterTill);
            const concatArr=totalSeatArr.concat(seatArr);
            return totalSeatArr=concatArr;
        });
      }
      else{
        props.movie.SeatFor.map(e => {
            let rowArr=[]
            for(let i =e.startRow; i <= e.endRow; i++) {
                rowArr.push(i);
            }
            return totalSeatArr.push(rowArr);
        });
        if(props.movie.PremiumSeatFor){
            props.movie.PremiumSeatFor.map(e => {
                let rowArr=[]
                for(let i =e.startRow; i <= e.endRow; i++) {
                    rowArr.push(i);
                }
                return premiumSeatArr.push(rowArr);
            })
        }
      }

    
  }

  useEffect(() => {
    async function fetchReservedList() {
      let result = await getApi("/reserved", props.movie.movie, props.movie.city );
      let response = result.data;
      setIsReserved(response.reservedList);
      setIsBooked(response.bookedList);
    }
    fetchReservedList();
  }, [props.movie]);

  const [isBooked, setIsBooked] = useState([]);
  const [isReserved, setIsReserved] = useState([])
  const [urSelection, setUrSelection] = useState([]);
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");

  const addSeat = (ev) => {
        if (urSelection.includes(ev)) {
            const newAvailable = urSelection.filter(seat => seat !== ev);
            setUrSelection(newAvailable);
        }else if(urSelection.length!==5){
        setUrSelection([...urSelection, ev]);
        }else if (urSelection.length === 5) {
            urSelection.shift();
            setUrSelection([...urSelection, ev]);
        }
    };

    async function confirmReservation () {
        props.setLoading(true);
      
        let body= {
            "city": props.movie.city,
            "movie": props.movie.movie,
            "emailid": email,
            "name": name,
            "mobilenumber": phoneNo,
            "seats": urSelection
        }
        await reserveApi("/reserved", body )
            .then(()=>
                setDialogTitle('Thank You'),
                setDialogContent('Mr/Mrs '+name+' you have successfully Reserved the following seats: '+urSelection),
                setOpen(true),
                props.setLoading(false));
      
        const newAvailableSeats = isBooked.filter(seat => !urSelection.includes(seat));
        setIsBooked(newAvailableSeats);
        setUrSelection([]);
        setName('');
        setPhoneNo('');
        setEmail('');
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
        <div style={{paddingLeft:'10px'}}>
            <h2>Max 5 per reservation</h2>
            
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
                <span  style={{"display": "flex", "marginTop":10}}>Premium Seats
                    <Box
                        sx={{
                            width: 20,
                            height: 20,
                            marginLeft:6,
                            backgroundColor: '#5f92d4'}}/>
                            
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
                   <br/>
            <Seats values={premiumSeatArr}
                   premiumSeat={true}
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
            <Button variant="contained" /*disabled={!name|| phoneNo.length <= 8 || !email || urSelection.length===0}*/ onClick={()=>{confirmReservation()}}>
                Reserve Seats
            </Button>
            </Box>
            <ReservationBox open={open} handleClose={()=>handleClose()} dialogTitle={dialogTitle} dialogContent={dialogContent}/>
        </div>

    );
}

export default ReserveMySeat;