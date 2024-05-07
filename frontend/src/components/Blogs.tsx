import { LiaPlusSolid } from "react-icons/lia";
import './Blogs.css';
import { Blog } from "./Blog";

export const Blogs = () => {
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
                <Blog title="This is a title" description="this is the description of the blog" author="Razeen Baig" publishedDate="5 May 2024" />
                <Blog title="This is a title" description="this is the description of the blog this is the description of the blog this is the description of the blog this is the description of the blog" author="Razeen Baig" publishedDate="5 May 2024" />
                <Blog title="This is a title" description="this is the description of the blog" author="Razeen Baig" publishedDate="5 May 2024" />
            </div>
        </div>
    )
}