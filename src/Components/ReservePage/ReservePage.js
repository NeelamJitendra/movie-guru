import React, {useState} from 'react';
import ReserveMySeat from "./MovieSeat/ReserveMySeat";
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
                getOptionLabel={(option) => option.movie+" - "+option.city}
                options={SeatFormat}
                sx={{ width: 300, m: '10px' }}
                renderInput={(params) => <TextField {...params} label="Select Movie - City" />}
                onChange={(e, newValue)=>newValue!==null ? setMovie(newValue): []}
                />
            {movie.length!==0 ?<ReserveMySeat movie={movie}/>:''}
        </div>
    )
};

export default Main;