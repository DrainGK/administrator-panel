import React from 'react';
import Post from '../post/Post';
import "./posts.css"

const Posts = ({posts}) => {
    return (
        <div className='posts'>
            {posts.map(info =>(
                <Post post={info} />
            ))}
        </div>
    );
};

export default Posts;