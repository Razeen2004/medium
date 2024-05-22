import { LiaPlusSolid } from "react-icons/lia";
import './Blogs.css';
import { Blog } from "./Blog";
import { useBlogs } from "../hooks";
import { Link } from "react-router-dom";

export const Blogs = () => {
    const {loading, blogs} = useBlogs();
    console.log(blogs)
    if(loading){
        return(
            <div className="blogs">
                <div className="top-bar">
                    <ul>
                        <span className="skeleton skeleton-text skeleton-text__body">< LiaPlusSolid /></span>
                        <li className="skeleton skeleton-text skeleton-text__body">For you</li>
                        {/* <li className="skeleton skeleton-text skeleton-text__body">Following</li> */}
                    </ul>
                </div>
                <div className="blogs-container">
                    <div className="blog">
                        <div className="blog-left">
                            <div className="author">
                                <div className="skeleton skeleton-text skeleton-text__body" > dasd</div> <div className="published skeleton skeleton-text skeleton-text__body">dasd</div>
                            </div>
                            <div className="title skeleton skeleton-text skeleton-text__body">
                            dasd
                            </div>
                            <div className="description skeleton skeleton-text skeleton-text__body">dasd</div>
                            <div className="options">
                                <div className="read skeleton skeleton-text skeleton-text__body">dasd</div> 
                                <div className="skeleton skeleton-text skeleton-text__body">dasda</div>
                            </div>
                        </div>
                        <div className="blog-right">
                            <img className="skeleton skeleton-text skeleton-text__body" alt="" />
                        </div>
                    </div>
                    <div className="blog">
                        <div className="blog-left">
                            <div className="author">
                                <div className="skeleton skeleton-text skeleton-text__body" > dasd</div> <div className="published skeleton skeleton-text skeleton-text__body">dasd</div>
                            </div>
                            <div className="title skeleton skeleton-text skeleton-text__body">
                            dasd
                            </div>
                            <div className="description skeleton skeleton-text skeleton-text__body">dasdas</div>
                            <div className="options">
                                <div className="read skeleton skeleton-text skeleton-text__body">dasd</div> 
                                <div className="skeleton skeleton-text skeleton-text__body">dasda</div>
                            </div>
                        </div>
                        <div className="blog-right">
                            <img className="skeleton skeleton-text skeleton-text__body" alt="" />
                        </div>
                    </div>
                    <div className="blog">
                        <div className="blog-left">
                            <div className="author">
                                <div className="skeleton skeleton-text skeleton-text__body" > dasd</div> <div className="published skeleton skeleton-text skeleton-text__body">dasd</div>
                            </div>
                            <div className="title skeleton skeleton-text skeleton-text__body">
                            dasd
                            </div>
                            <div className="description skeleton skeleton-text skeleton-text__body">dasd</div>
                            <div className="options">
                                <div className="read skeleton skeleton-text skeleton-text__body">dasd</div> 
                                <div className="skeleton skeleton-text skeleton-text__body">dasda</div>
                            </div>
                        </div>
                        <div className="blog-right">
                            <img className="skeleton skeleton-text skeleton-text__body" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="blogs">
            <div className="top-bar">
                <ul>
                    <Link to={"/write"}>
                        <span><LiaPlusSolid /></span>
                    </Link>
                    <li className="active">For you</li>
                    {/* <li className="">Following</li> */}
                </ul>
            </div>
            <div className="blogs-container">
                {blogs.map(blog=> <Blog id={blog.id} author={blog.author.name} title={blog.title} description={blog.description} publishedDate={blog.postedDate} image={blog.image} />)}
            </div>
        </div>
    )
}