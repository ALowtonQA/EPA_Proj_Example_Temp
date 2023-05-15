import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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

export default function UpdateUsername() {
  const [successful, setIsSuccessful] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.patch("http://localhost:8080/user/updateU", {"oldUsername" : sessionStorage.getItem("username"), "newUsername" : data.get("username")})
      .then((response) => {
          setIsSuccessful(true);
          setTimeout(() => {
            setError(null);
            sessionStorage.setItem("username", data.get("username"));
            navigate("/Reviews");
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
              Update Username
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
            </Box>
          </Box>
          {error && <Alert severity="error" sx={{ mt: 5}}>{error}</Alert>}
        </Container>
      }
    </>
  );
}