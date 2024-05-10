import { LoginNavbar } from "../components/LoginNavbar";
import "./SingleBlog.css";
import { Footer } from "../components/Footer";
import { useBlogs } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { useParams } from "react-router-dom";
export const SingleBlog = () => {
    const { id } = useParams();
    const { loading, blogs } = useBlogs({
        id: id || ""
    });

    if(loading){
        return(<>loading...</>)
    }


    return (
        <div className="singleBlog">
            <LoginNavbar />
                <FullBlog blogs={blogs}/>
            <Footer/>
        </div>
    )
}