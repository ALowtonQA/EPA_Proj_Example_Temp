import { Container, CssBaseline } from '@mui/material';
import '../../css/tick.css';

export default function Tick() {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div class="wrapper"> 
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> 
                    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /> 
                    <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
            </div>
        </Container>
    )
}