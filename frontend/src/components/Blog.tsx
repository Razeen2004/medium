import { PiUserCircleLight } from "react-icons/pi";
import './Blog.css'
import { CiBookmarkPlus } from "react-icons/ci";
import { PiDotsThreeLight } from "react-icons/pi";
interface BlogType{
    author?: string;
    publishedDate?: string;
    title?: string;
    description: string;
}

export const Blog = ({author, publishedDate, title, description}: BlogType) => {
    return(
        <div className="blog">
            <div className="blog-left">
                <div className="author">
                    <div><PiUserCircleLight />{author}</div> <div className="published"> · {publishedDate}</div>
                </div>
                <div className="title">
                    {title}
                </div>
                <div className="description">{description?.slice(0, 100) + "..."}</div>
                <div className="options">
                    <div className="read">{`${Math.ceil(description.length / 100)} minutes read`} · Selected for you</div> 
                    <div><CiBookmarkPlus/> <PiDotsThreeLight /></div>
                </div>
            </div>
            <div className="blog-right">
                <img src="" alt="" />
            </div>
        </div>
    )
}