import { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

type ShowcaseItemProps = {
    title: string;
    pageUrl: string;
    imagePath?: string;
}

export const ShowcaseItem: FC<ShowcaseItemProps> = props => {

    let image = require("../" + props.imagePath);

    return (
        <Card sx={{ textAlign: 'center', p: 1 }}
            onClick={() => window.open(props.pageUrl)}>
            <CardMedia
                component="img"
                height="250"
                image={image}
                alt=" " />
            <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {props.title}
                </Typography>
            </CardContent>
        </Card>
    )
}