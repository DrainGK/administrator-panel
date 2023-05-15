import React from 'react';
import {Link} from "react-router-dom"
import "./post.css"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Post = ({post}) => {
    const publicFolder = "http://localhost:5000/images/"
    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            component="img"
            alt={post.title}
            height="140"
            image={publicFolder + post.photo}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {post.desc}
            </Typography>
        </CardContent>
        <CardActions>
            <Link　className='link' to={`/post/${post._id}`}>
                <Button size="small">Edit</Button>
            </Link>
            <Typography variant="body2" color="text.secondary">
                {new Date(post.createdAt).toDateString()}
            </Typography>
        </CardActions>
        </Card>
    );
};

export default Post;