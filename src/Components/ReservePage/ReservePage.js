import React, {useState} from 'react';
import ReserveMySeat from "./MovieSeat/ReserveMySeat";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SeatFormat from '../SeatFormat.json';
import ReactLoading from "react-loading";

const Main = () => {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
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
            {loading ?
                <div style={{textAlign: '-webkit-center'}}>
                    <ReactLoading type={'spinningBubbles'} color="#2E3147" height={'10%'} width={'10%'}/>
                    <h3> Loading... </h3>
                </div>: 
                movie.length!==0 ?<ReserveMySeat movie={movie} setLoading={setLoading}/>:''
            }
            
        </div>
    )
};

export default Main;