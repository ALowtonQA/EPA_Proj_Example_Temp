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
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Tick from '../Extras/Tick';
import { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import MainNavBar from '../Navigation/MainNavBar';

export default function UpdateReview() {
    const [currentReview, setCurrentReview] = useState(null);
    const [successful, setIsSuccessful] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/review/get/${id}`)
            .then((response) => {
                setError(null);
                setCurrentReview(response.data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newReview = {
            "book_title": data.get("bookTitle"),
            "body": data.get("review"),
            "author": data.get("author"),
           "user": sessionStorage.getItem("username"),
           "date": new Date() 
        };

        axios.put(`http://localhost:8080/review/update/${id}`, newReview)
            .then((response) => {
                setIsSuccessful(true);
                setTimeout(() => {
                    setError(null);
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
            {!successful && currentReview &&
                <Container component="main" maxWidth="xl">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="bookTitle"
                                        label="Book Title"
                                        name="bookTitle"
                                        defaultValue={currentReview.book_title}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="author"
                                        label="Author"
                                        name="author"
                                        defaultValue={currentReview.author}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="review"
                                        label="Review"
                                        multiline
                                        minRows={4}
                                        name="review"
                                        defaultValue={currentReview.body}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Update Review
                            </Button>
                        </Box>
                    </Box>
                    {error && <Alert severity="error" sx={{ mt: 5 }}>{error}</Alert>}
                </Container>
            }
        </>
    );
}