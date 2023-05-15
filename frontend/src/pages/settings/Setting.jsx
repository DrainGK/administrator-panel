import { useContext, useState } from 'react';
import SideBar from '../../components/sideBar/SideBar';
import "./setting.css";
import { Context } from '../../context/Context';
import axios from 'axios';
import { Container,Box,Avatar,Typography,TextField,Button} from "@mui/material";

const Setting = () => {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false)
    const {user, dispatch } = useContext(Context);
    const publicFolder = "http://localhost:5000/images/"

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type:"UPDATE_START"})
        const updatedUser = {
            userId: user._id,
            username, email, password
        };
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;

            try{
                await axios.post("http://localhost:5000/api/upload", data);
            } catch (err){}
        }
        try{
            const res = await axios.put("http://localhost:5000/api/user/"+user._id, updatedUser);
            setSuccess(true);
            dispatch({type:"UPDATE_SUCCESS", payload: res.data})
        }catch(err){
            dispatch({type:"UPDATE_FAILURE"})
        }
    }

    return (

            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                    >
                    <Typography component="h1" variant="h5">
                        Profil
                    </Typography>
                    <Button component="label">
                            <input type="file" id="fileInput" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}/>
                            
                    <Avatar alt="Profile Picture" src={file ? URL.createObjectURL(file) : publicFolder+user.profilePic}>
                    </Avatar>
                    </Button>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="current-username"
                        autoFocus
                        onChange={e=>setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="current-email"
                        autoFocus
                        onChange={e=>setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e=>setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2,py:2, borderRadius: "50px" }}
                        // onClick={handleSubmit}
                    >
                        Mettre a jour
                    </Button>
                    {success && <Typography textAlign="center" style={{color: "teal"}}>Profil mis a jour</Typography>}
                    </Box>
                </Box>
            </Container>
    );
};

export default Setting;