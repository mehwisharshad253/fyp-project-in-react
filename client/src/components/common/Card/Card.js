import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CourseSingleCard({
    imageUrl,
    title,
    id,
    price,
    rating,
    openModel,
    setcourseId,
    isButtonVisible
}) {



    const user = localStorage.getItem('userDetails')

    const loggedUser = JSON.parse(user)


    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img" // Use 'component="img"' to specify that this is an image
                height="140"
                style={{ objectFit: 'cover' }}
                src={imageUrl} // Ensure that the 'imageUrl' prop is correctly passed
                alt={title} // Provide an 'alt' attribute for accessibility
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Rating: {rating.length}/5
                </Typography>
            </CardContent>
            <CardActions>
                
                   {
                    isButtonVisible &&

                        <Button disabled={rating.includes(loggedUser._id)} onClick={() => {
                            setcourseId(id)
                            openModel()
                        }} size="small">Rate</Button>
                   }

                
                {/* <Button size="small">Delete</Button> */}
            </CardActions>
        </Card>
    );
}