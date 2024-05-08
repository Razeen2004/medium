import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";


interface Blog{
    "id": number;
    "title": string;
    "description": string;
    "published": boolean;
    "date": string;
    "author": {
        "name": string
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const token = localStorage.getItem("token");

    useEffect(()=>{
        axios.get(`http://localhost:8787/api/v1/blog/bulk`,{
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