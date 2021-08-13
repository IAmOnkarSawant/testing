import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export default function CardM({ feature, info, image }) {
    return (
        <Card style={{ height: '390px' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="240"
                    image={image}
                    title="Contemplative Reptile"
                />
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {feature}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {info}
                </Typography>
            </CardContent>
        </Card>
    );
}