import './Extras.css';
import { CiBookmarkPlus } from "react-icons/ci";
export const Extras = () => {
    return( 
        <div className="extras">
            {/* <div className="extra-sec">
                <h2>Recommended Topics</h2>
                <div className="tags">
                    <ul>
                        <li>Productivity</li>
                        <li>Politics</li>
                        <li>Cryptocurrency</li>
                        <li>Psychology</li>
                        <li>Money</li>
                        <li>Business</li>
                        <li>Python</li>
                    </ul>
                    <span>See more topics</span>
                </div>
            </div> */}
            <div className="extra-sec">
                <h2>Reading List</h2>
                <div className="reading">
                    <p>{"Click the "} <CiBookmarkPlus />  {"on any story to easily add it to your reading list or  a custom list that you can share."}</p>
                    <ul>
                        <li>Help</li>
                        <li>Status</li>
                        <li>About</li>
                        <li>Careers</li>
                        <li>Blogs</li>
                        <li>Privacy</li>
                        <li>Terms</li>
                        <li>Text to speech</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}