import { LoginNavbar } from "../components/LoginNavbar";
import "./SingleBlog.css";
import { Footer } from "../components/Footer";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { useParams } from "react-router-dom";
import { PiHandsClappingThin } from "react-icons/pi";
import { VscComment } from "react-icons/vsc";
import { CiBookmarkPlus } from "react-icons/ci";
import { PiDotsThreeLight } from "react-icons/pi";

export const SingleBlog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || ""
    });

    console.log(blog)

    if(loading){
        return(
            <div className="singleBlog">
                <LoginNavbar />
                <div className="singleBlog-container">
                    <div className="blog-main">
                            <div className="blog-title">
                                <h2></h2>
                            </div>
                            <div className="blog-author">
                                <div className="avatar skeleton skeleton-text skeleton-text__body">sdad</div>
                                <div className="desc">
                                    <div className="name skeleton skeleton-text skeleton-text__body">RB</div>
                                    <div className="read-time skeleton skeleton-text skeleton-text__body">8 mins read</div>
                                </div>
                            </div>
                            <div className="blog-stats">
                                <div className="left-stats">
                                    <div className="like skeleton skeleton-text skeleton-text__body"><PiHandsClappingThin /> 3.2K</div>
                                    <div className="comment skeleton skeleton-text skeleton-text__body"><VscComment /> 90</div>
                                </div>
                                <div className="right-stats skeleton skeleton-text skeleton-text__body">
                                    <CiBookmarkPlus/>
                                    <PiDotsThreeLight/>
                                </div>
                            </div>
                            <div className="blog-image skeleton skeleton-text skeleton-text__body">
                                <img className="skeleton skeleton-text skeleton-text__body" src="" alt="" />
                            </div>
                            <div className="blog-desc skeleton skeleton-text skeleton-text__body">
                                <p className="skeleton skeleton-text skeleton-text__body">dsad</p>
                                <p className="skeleton skeleton-text skeleton-text__body">dsad</p>
                                <p className="skeleton skeleton-text skeleton-text__body">dsad</p>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }

    return (
        <div className="singleBlog">
            <LoginNavbar />
                <FullBlog author={blog?.author.name}
                title={blog?.title}
                desc={blog?.description}
                date={blog?.postedDate}
                image={blog?.image}
                />
            <Footer/>
        </div>
    )
}