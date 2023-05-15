import React, { useContext, useState } from 'react';
import "./write.css"
import axios from "axios"
import { Context } from "../../context/Context"

import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import {Box, InputLabel, FormControl, MenuItem} from '@mui/material';

const Write = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [categories, setCategories] = useState([]);
    const [file, setFile] = useState(null);
    const {user} = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
            categories,
        };
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;

            try{
                await axios.post("http://localhost:5000/api/upload", data)
            } catch (err){}
        }
        try{
            const res = axios.post("http://localhost:5000/api/post", newPost);
            window.location.replace("/")
        }catch(err){}
    }

    return (
            <Container maxWidth="md" sx={{mb:"5rem", mt:"5rem"}}>

                { file &&
                    <CardMedia
                    component="img"
                    image={URL.createObjectURL(file)}
                    alt="random"
                    sx={{mb:"1rem", borderRadius:"15px"}}
                    />
                }
                <Box maxWidth="md"　sx={{display:"flex", justifyContent:"space-between"}}>
                    <Button component="label">
                        <input type="file" id="fileInput" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}/>
                        Image
                    </Button>
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
                </Box>
                <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="Title"
                autoFocus
                onChange={e=>setTitle(e.target.value)}
              />
              <TextField
                placeholder="Description"
                required
                fullWidth
                id="description"
                label="Description"
                name="Description"
                multiline
                rows={10}
                maxRows={Infinity}
                onChange={e=>setDesc(e.target.value)}
                />
                <Button type='submit' fullWidth onClick={handleSubmit}
                variant="contained"
                sx={{ mt: 3, mb: 2,py:2, borderRadius: "50px" }}>
                    Publier
                </Button>
            </Container>

    );
};

export default Write;