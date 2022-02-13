import React, {useState} from 'react';
import SelectMovie from "./MovieSeat/BookMySeats";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SeatFormat from '../SeatFormat.json';

const Main = () => {
    
  const [movie, setMovie] = useState([]);
    return (
        <div>
            <Autocomplete
                disablePortal
                disableClearable
                id="MovieList"
                options={SeatFormat}
                sx={{ width: 300, m: '10px' }}
                renderInput={(params) => <TextField {...params} label="Select Movie" />}
                onChange={(e, newValue)=>newValue!==null ? setMovie(newValue): []}
                />
            {movie.length!==0 ?<SelectMovie movie={movie}/>:''}
        </div>
    )
};

export default Main;