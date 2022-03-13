import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { Box, TextField, Typography, Button } from '@mui/material';

function Login(props) {
    let navigate = useNavigate();
    const [incorrectInput, setIncorrectInput] = useState(false);
    const handleClick = () => {
        fetch(`https://21wsp4pw.course.tamk.cloud/api/v2/user/${props.email}/super_secret_pass`)
        .then(response => response.json())
        .then(data => {
            if (data.password == props.pass) {
                navigate("/dashboard");
                props.setEmail(data.email);
                props.setPass(data.password);
                props.setId(data.id);
            } else {
                setIncorrectInput(true);
            }
        })
        .catch(err => console.error(err))
    }
    const emailInputChange = (event) => {
        props.setEmail(event.target.value);
    }
    const passInputChange = (event) => {
        props.setPass(event.target.value);
    }
    return(
        <div>
            <Header title="Login"/>
            <Box 
                component="form" 
                sx={{margin: 10}}
                onSubmit={handleClick}
            >
                <Typography variant='h5'>Enter your credentials</Typography>
                <TextField 
                    label="email" 
                    type={"email"}
                    name="email"
                    sx={{margin: 1}}
                    error={incorrectInput}
                    onChange={emailInputChange}
                /> <br/>
                <TextField 
                    label="Password" 
                    type={"password"}
                    name="pass"
                    sx={{margin: 1}}
                    error={incorrectInput}
                    onChange={passInputChange}
                /> <br/>
                <Button 
                    variant='contained' 
                    onClick={handleClick}
                    sx={{margin: 1}}
                    size='large'
                >
                    Enter
                </Button>
            </Box>
        </div>
    )
}

export default Login;