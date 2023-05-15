import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Tick from '../Extras/Tick';
import { useState } from 'react';
import { Alert } from '@mui/material';
import MainNavBar from '../Navigation/MainNavBar';

export default function DeleteUser() {
    const [successful, setIsSuccessful] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const deleteReq = () => {
        axios.delete(`http://localhost:8080/user/delete/${sessionStorage.getItem("username")}`)
            .then((response) => {
                setIsSuccessful(true);
                setTimeout(() => {
                    setError(null);
                    sessionStorage.removeItem("username");
                    navigate("/");
                }, 2000);
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <>
            <MainNavBar />
            {successful && <Tick />}
            {!successful &&
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Are you sure you want to delete your account? This action is final.
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <Button 
                                type="submit" 
                                variant="contained"
                                color="error"
                                onClick={() => { deleteReq() }}
                            >
                                Delete 
                            </Button>
                            <Button 
                                type="submit"
                                variant="contained"
                                color="success"
                                sx={{ ml: 10 }}
                                onClick={() => { navigate("/Reviews") }} 
                            > 
                                Don't Delete 
                            </Button>
                        </Box>
                    </Box>
                    {error && <Alert severity="error" sx={{ mt: 5 }}>{error}</Alert>}
                </Container>
            }
        </>
    );
}