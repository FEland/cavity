import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Typography, Link } from '@mui/material';

const DentistCarousel = ({ dentists }) => {
    return (
        <Carousel>
            {dentists.map((dentist, index) => (
                <Paper key={index} style={{ padding: '20px', textAlign: 'center' }}>
                    <img src={dentist.favicon} alt={`${dentist.name} favicon`} style={{ width: '50px', height: '50px' }} />
                    <Typography variant="h6">{dentist.name}</Typography>
                    <Link href={dentist.website} target="_blank" rel="noopener">
                        Visit Website
                    </Link>
                </Paper>
            ))}
        </Carousel>
    );
};

export default DentistCarousel;