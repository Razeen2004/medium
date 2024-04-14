import { IoIosTrendingUp } from "react-icons/io";
import './Trending.css'
const Trending = () => {
  return (
    <div className='trending'>
        <div className="container">
            <h2> <IoIosTrendingUp /> Trending on Medium</h2>

            <div className="trending-cards">
                <TrendingCard />
                <TrendingCard />
                <TrendingCard />
                <TrendingCard />
                <TrendingCard />
                <TrendingCard />
            </div>
        </div>
    </div>
  )
}

export default Trending

const TrendingCard = () => {
    return(
        <div className='trending-card'>
            <h1>01</h1>
            <div>
                <div><img src="https://miro.medium.com/v2/resize:fill:20:20/1*07lesGIGjBy3AqvnMCFx8Q.jpeg" alt="" /><span>Oscar Wallis</span></div>
                <h2>Welcome To The Emergency Room, Your Stay Will Be Unforgettable</h2>
                <p>Apr 12, 2024</p>
            </div>
        </div>
    )
}