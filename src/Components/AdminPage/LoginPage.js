import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function LoginPage(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const loginUser=()=>{
        if(userName==='jitu' || password==='123456'){
            props.userLoggedIn();
        }
    }
  return (
    <Stack
      component="form"
      sx={{
        width: '25ch',
        alignItems:'center',
        justifyContent:"center"
      }}
      spacing={2}
      noValidate
      autoComplete="off">
      <TextField id="userName" label="User Name *" value={userName} variant="outlined" onChange={e=>setUserName(e.target.value)}/>
      <TextField id="Password" label="Password *" value={password} type="password" variant="outlined" onChange={e=>setPassword(e.target.value)}/>
      <Button variant="contained" disabled={!userName || password.length < 6} onClick={()=>loginUser()}>Login</Button>
    </Stack>
  );
}