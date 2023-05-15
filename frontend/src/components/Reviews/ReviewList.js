import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { Alert } from '@mui/material';
import Tick from '../Extras/Tick';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ReviewList(props) {

    const [successful, setIsSuccessful] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const deleteReview = (id) => {
        axios.delete(`http://localhost:8080/review/delete/${id}`)
            .then((response) => {
                setIsSuccessful(true);
                setError(null);
                setTimeout(() => {
                    props.setRefresh(true);
                    setIsSuccessful(false);
                }, 2000);
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    const reviews = props.reviews.map(review => {
        return (
            <Grid sx={{ maxHeight: '40vh' }} item key={review._id} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'scroll' }} >
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {review.book_title} review by {review.user}
                        </Typography>
                        <Typography sx={{ "word-break": "break-all", "white-space": "normal" }}>
                            {review.body}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        { (sessionStorage.getItem("username") === review.user) &&
                            <>
                            <Button size="small" component={Link} to={`/review/update/${review._id}`}>Edit</Button>
                            <Button size="small" onClick={() => {deleteReview(review._id)}}>Delete</Button>
                            </>
                        }
                    </CardActions>
                </Card>
            </Grid>
        );
    });

    return (
        <>
            {successful && <Tick/>}
            {!successful && reviews}
            {error && <Alert severity="error" sx={{ mt: 5 }}>{error}</Alert>}
        </>
    );
}