import { LiaPlusSolid } from "react-icons/lia";
import './Blogs.css';
import { Blog } from "./Blog";
import { useBlogs } from "../hooks";
import { useState } from "react";

export const Blogs = () => {
    const {loading, blogs} = useBlogs();
    console.log(blogs)
    if(loading){
        return(
            <>loading</>
        )
    }
    return (
        <div className="blogs">
            <div className="top-bar">
                <ul>
                    <span><LiaPlusSolid /></span>
                    <li className="active">For you</li>
                    <li>Following</li>
                </ul>
            </div>
            <div className="blogs-container">
                {blogs.map(blog=> <Blog author={blog.author.name} title={blog.title} description={blog.description} publishedDate={blog.postedDate} image={blog.image} />)}
            </div>
        </div>
    )
}