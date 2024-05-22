import { PiHandsClappingThin } from "react-icons/pi";
import { VscComment } from "react-icons/vsc";
import { CiBookmarkPlus } from "react-icons/ci";
import { PiDotsThreeLight } from "react-icons/pi";
// import { Blog } from "../hooks";
export const FullBlog = ({author, title, desc, image, date}: any) =>{
    
    return(
        <div className="singleBlog-container">
                <div className="blog-main">
                    <div className="blog-title">
                        <h2>{title}</h2>
                    </div>
                    <div className="blog-author">
                        <div className="avatar">RA</div>
                        <div className="desc">
                            <div className="name">{author || "Anonymous"}</div>
                            <div className="read-time">8 mins read || {date} </div>
                        </div>
                    </div>
                    <div className="blog-stats">
                        <div className="left-stats">
                            <div className="like"><PiHandsClappingThin /> 3.2K</div>
                            <div className="comment"><VscComment /> 90</div>
                        </div>
                        <div className="right-stats">
                            <CiBookmarkPlus/>
                            <PiDotsThreeLight/>
                        </div>
                    </div>
                    <div className="blog-image">
                        <img src={image} alt="" />
                    </div>
                    <div className="blog-desc">
                        <p>{desc}</p>
                    </div>
                </div>
            </div>
    )
}