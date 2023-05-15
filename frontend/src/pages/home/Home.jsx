import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import SideBar from '../../components/sideBar/SideBar';
import "./home.css"
import axios from "axios"
import { Link, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Divider, ToggleButton, ToggleButtonGroup } from '@mui/material';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [cats, setCats] = useState([]);
    const { search } = useLocation();
    const publicFolder = "http://localhost:5000/images/"

    
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("http://localhost:5000/api/post" + search);
            setPosts(res.data)
        }
        fetchPosts();
    },[search])

    useEffect(() => {
        const getCats = async ()=>{
            const res = await axios.get("http://localhost:5000/api/categories")
            setCats(res.data);
        }
        getCats()
    },[])

    
    return (
        <>
            <Header />
            <Container 
            sx={{ py: 8, display: {xs: "grid", md:"flex"}  }} 
            maxWidth="md">

            <ToggleButtonGroup
            
            // orientation='vertical'
            
            sx={{ 
                marginRight:"1rem",
                padding:"0.5rem",
                height:"fit-content",
                display:"flex",
                flexDirection:{xs:"row",md:"column"},
                flexWrap:{xs:"wrap", md:"nowrap"},
                alignItems:"center",
                justifyContent:"center"
            }}
            exclusive
            
            >
                <Link className='link' to={"/"}>
                    <ToggleButton value="list" aria-label="list"
                    sx={{width:"75px",mb:"5px"}}>Tous</ToggleButton>
                </Link>
                {cats.map((category)=>(
                    <Link className='link' to={`/?cat=${category.name}`}>
                        <ToggleButton value="list" aria-label="list"
                        sx={{width:"75px",mb:"5px"}}>{category.name}</ToggleButton>
                    </Link>
                ))}
            </ToggleButtonGroup>
            {/* End hero unit */}
            <Grid container spacing={4}>
                {posts.map((post) => (
                <Grid item key={post._id} xs={12} sm={6} md={4}>
                    <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                    <CardMedia
                        component="img"
                        image={publicFolder + post.photo}
                        alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {post.title}
                        </Typography>
                        <Typography
                            className='post-description'
                        >
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
                </Grid>
                ))}
            </Grid>
            </Container>
        </>
    );
};

export default Home;