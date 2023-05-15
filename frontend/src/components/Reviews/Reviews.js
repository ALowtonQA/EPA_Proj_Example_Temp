import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MainNavBar from '../Navigation/MainNavBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert } from '@mui/material';
import '../../css/scrollbars.css';
import ReviewList from './ReviewList';
import {Link as RouterLink} from 'react-router-dom';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Album() {
    // const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/review/getAll")
            .then((response) => {
                // setIsLoading(false);
                setError(null);
                setRefresh(false);
                setData(response.data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, [refresh]);

    return (
        <>
            <CssBaseline />
            <MainNavBar />
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="lg">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            QA Project Example
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            This is an example web application for book lovers. You can write a review, as well as edit and delete your reviews. You can manage your account via the optoins menu in the top right.
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained" component={RouterLink} to={"/Create Review"}>Write a Review</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="xl">
                    {/* End hero unit */}
                    {error && <Alert severity="error" sx={{ mt: 5}}>{error}</Alert>}
                    {data &&
                        <Grid container spacing={4}>
                            <ReviewList reviews={data} setRefresh={setRefresh}/>
                        </Grid>
                    }
                </Container>
            </main>
        </>
    );
}