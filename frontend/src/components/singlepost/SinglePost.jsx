import React, { useContext, useEffect, useState} from 'react';
import "./singlepost.css"
import {Link, useParams } from 'react-router-dom';
import axios from "axios"
import {Context} from "../../context/Context"
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import {Box, InputLabel, FormControl, MenuItem} from '@mui/material';

const SinglePost = () => {
    const { id } = useParams();
    const [post, setPost] = useState({})
    const publicFolder = "http://localhost:5000/images/"
    const {user} = useContext(Context);
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [categories, setCategories] = useState("")
    const [file, setFile] = useState(null);
    const [updateMode, setUpdateMode] = useState(false)

    useEffect(()=> {
        const getPost = async ()=> {
            const res = await axios.get("http://localhost:5000/api/post/");
            const postFiltered = res.data.filter((item) => item._id === id);
            setPost(postFiltered[0]);
            setTitle(postFiltered[0].title)
            setDesc(postFiltered[0].desc)
            setCategories(postFiltered[0].categories)
            setFile(postFiltered[0].photo)
        };
        getPost();
    }, [id]);

    const handleDelete = async()=>{

        try{
         await axios.delete(`http://localhost:5000/api/post/${post._id}`, {data: {username: user.username}});
         window.location.replace("/")
        } catch(err){}
    }

    const handleUpdate = async () => {
        const updatedPost = {
            username: user.username,
            title,
            desc,
            categories,
            file,
        };
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedPost.photo = filename;

            try{
                await axios.post("http://localhost:5000/api/upload", data)
            } catch (err){}
        }
        try{
            await axios.put(`http://localhost:5000/api/post/${post._id}`, updatedPost);
            setUpdateMode(false);
            window.location.replace("/")
           } catch(err){}
        }

    return (
            <Container maxWidth="md" sx={{mb:"5rem", mt:"5rem", padding:"2rem", backgroundColor:"whitesmoke", borderRadius:"15px"}}>

                {post.photo && 
                    <CardMedia
                    component="img"
                    src={publicFolder + post.photo}
                    alt={post.title}
                    sx={{mb:"1rem", borderRadius:"15px"}}
                    />
                }
                
                {
                    updateMode ? <TextField
                    margin="normal"
                    required
                    fullWidth
                    id={post.title}
                    label={post.title}
                    name={post.title}
                    placeholder={post.title}
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  /> : (

                        
                    <Typography variant='h1' textAlign="center">
                        {title}
                        {post.username === user?.username &&
                        <div className="single-post-edit">
                            <i className="single-post-icon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
                            <i className="single-post-icon far fa-trash-alt" onClick={handleDelete}></i>
                        </div>
                        }
                    </Typography>
                 )
                }

               
                    <Box maxWidth="md" textAlign="center"　sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mt:"2rem"}}>
                        {updateMode && 
                        <Button component="label">
                            <input required type="file" id="fileInput" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}/>
                            Image*
                        </Button>}

                        <Typography>{new Date(post.createdAt).toDateString()}</Typography>
                        <Typography>Laurent: <b>{post.username}</b></Typography>
                        { updateMode ? (
                            <FormControl maxWidth="150px">
                                <InputLabel id="Categories" maxWidth="150px">Categories</InputLabel>
                                <Select
                                    labelId="Categories"
                                    id="Categories"
                                    label="Categories"
                                    maxWidth="150px"
                                    onChange={e=>setCategories(e.target.value)}
                                >
                                    <MenuItem value="laptop">Laptop</MenuItem>
                                    <MenuItem value="gaming">gaming</MenuItem>
                                    <MenuItem value="bureau">bureau</MenuItem>
                                    <MenuItem value="apple">apple</MenuItem>
                                    <MenuItem value="site">site</MenuItem>
                                </Select>
                            </FormControl> 
                            ):(
                                <Typography><b>{post.categories}</b></Typography>
                            )
                        }
                    </Box>
                

                {
                    updateMode ? (
                        <TextField
                        placeholder={post.desc}
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        name="Description"
                        multiline
                        rows={10}
                        maxRows={Infinity}
                        onChange={e=>setDesc(e.target.value)}
                        sx={{mt:"2rem"}}
                        />
                    ) : (
                        <Typography
                        sx={{padding:"10px", border:"2px solid teal", borderRadius:"15px", mt:"2rem"}}
                        > {desc} </Typography>
                    )
                }

                {updateMode &&   
                    <Button type='submit' fullWidth onClick={handleUpdate}
                    variant="contained"
                    sx={{ mt: 3, mb: 2,py:2, borderRadius: "50px" }}>
                        Mettre a jour
                    </Button>
                }

            </Container>
    );
};

export default SinglePost;