import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";


export interface Blog{
    "id": number;
    "title": string;
    "description": string;
    "published": boolean;
    "postedDate": string;
    "image"?: string;
    "author": {
        "name": string
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const token = localStorage.getItem("token");

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{ Authorization: token} 
        })
        .then(response =>{
            setLoading(false);
            setBlogs(response.data.blogs);
        })
    },[])

    return{
        loading,
        blogs
    }
}
export const useBlog = ({ id }:{ id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    const token = localStorage.getItem("token");

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{ Authorization: token} 
        })
        .then(response =>{
            setLoading(false);
            setBlog(response.data.blog);
        })
    },[])

    return{
        loading,
        blog
    }
}