import React, { useEffect, useState } from 'react';
import "./sidebar.css"
import axios from 'axios';
import { Link } from 'react-router-dom';

const SideBar = () => {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async ()=>{
            const res = await axios.get("http://localhost:5000/api/categories")
            setCats(res.data);
        }
        getCats()
    },[])
    return (
        <div className='sidebar'>
            <div className="sidebar-item">
                <span className="sidebar-title">About Me</span>
                <img src="https://www.ldi2.fr/wp-content/uploads/2021/09/Logo-sombre-1.png" width="159px" height="150px" alt="" />
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum dignissimos, repudiandae </p>
            </div>
            <div className="sidebar-item">
                <span className="sidebar-title">Categories</span>
                    <ul className="sidebar-list">
                        {cats.map((category)=>(
                            <Link className='link' to={`/?cat=${category.name}`}>
                                <li className="sidebar-list-item">{category.name}</li>
                            </Link>
                        ))}
                    </ul>
            </div>
            <div className="sidebar-item">
                <span className="sidebar-title">Follow Us</span>
                <div className="sidebar-social">
                <i className="sidebarIcon fab fa-facebook-square"></i>
                <i className="sidebarIcon fab fa-twitter-square"></i>
                <i className="sidebarIcon fab fa-pinterest-square"></i>
                <i className="sidebarIcon fab fa-instagram-square"></i>
                </div>
            </div>
        </div>
    );
};

export default SideBar;