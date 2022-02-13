import React, {useState} from 'react';
import LoginPage from './LoginPage';
import BookingPage from './BookingPage';

export default function AdminPage() {
    
    const [logedIn, setLogedIn] = useState(false);
    const userLoggedIn=()=>{
        setLogedIn(true);
    }
  return(
        <div style={{textAlign: "-webkit-center"}}>
            <h2>Welcome Admin</h2>
            {logedIn ? <BookingPage/>: <LoginPage userLoggedIn={()=>userLoggedIn()}/>}
        </div>
  );
}