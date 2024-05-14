import { PiUserCircleLight } from "react-icons/pi";
import './Blog.css'
import { CiBookmarkPlus } from "react-icons/ci";
import { PiDotsThreeLight } from "react-icons/pi";
import { Link } from "react-router-dom";
interface BlogType{
    id: number;
    author?: string;
    publishedDate?: any;
    title?: string;
    description: string;
    image?: string;
}


export const Blog = ({author, publishedDate, title, description, image, id}:BlogType) => {
    // Calculate the difference in milliseconds
    const now = Date.now(); // Get current timestamp in milliseconds
    const postedDateInMs = new Date(publishedDate).getTime();
    const timeDifference = now - postedDateInMs;

// Function to convert milliseconds to human-readable format
function formatTimeDifference(ms:any):any {
    const secondsInHour = 3600000;  // Milliseconds in an hour
    const minutesInHour = 60000;   // Milliseconds in a minute
  
    const days = Math.floor(ms / (24 * secondsInHour));
    const hours = Math.floor((ms % (24 * secondsInHour)) / secondsInHour);
    const minutes = Math.floor((ms % secondsInHour) / minutesInHour);
  
    const timeElapsed = [];
    if (days > 0) {
      timeElapsed.push(`${days} day${days > 1 ? 's' : ''}`);
    } else if (hours > 0) {
      timeElapsed.push(`${hours} hr${hours > 1 ? 's' : ''}`);
    }
    if (minutes > 0) {
      timeElapsed.push(`${minutes} min${minutes > 1 ? 's ago' : ''}`);
    } else {
      // Handle cases less than a minute (optional):
      timeElapsed.push("Just now");  // Display "Just now" for very recent posts
    }
  
    return timeElapsed.join(", ");
  }
  
  const timeSinceUpload = formatTimeDifference(timeDifference);
  
  console.log(`Time since upload: ${timeSinceUpload}`);
    return(
        <div className="blog">
            <div className="blog-left">
                <div className="author">
                    <div><PiUserCircleLight />{author}</div> <div className="published"> · {timeSinceUpload}</div>
                </div>
                <div className="title">
                  <Link to={`/blog/${id}`}>
                    {title}
                  </Link>
                </div>
                <div className="description">{description?.slice(0, 100) + "..."}</div>
                <div className="options">
                    <div className="read">{`${Math.ceil(description.length / 100)} min read`} · Selected for you</div> 
                    <div><CiBookmarkPlus/> <PiDotsThreeLight /></div>
                </div>
            </div>
            <div className="blog-right">
              <Link to={`/blog/${id}`}>
                <img className="" src={image} alt="" />
              </Link>
            </div>
        </div>
    )
}