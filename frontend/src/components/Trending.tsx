import { IoIosTrendingUp } from "react-icons/io";
import './Trending.css'
const Trending = () => {
  return (
    <div className='trending'>
        <div className="container">
            <h2> <IoIosTrendingUp /> Trending on Medium</h2>

            <div className="trending-cards">
                <TrendingCard number="01" author="Srijanie Dey" description="Deep Dive into Transformers by Hand ✍︎"  />
                <TrendingCard number="02" author="Oscar Wallis" description="Welcome To The Emergency Room, Your Stay Will Be Unforgettable"  />
                <TrendingCard number="03" author="Jake Page" description="The guide to Git I never had."  />
                <TrendingCard number="04" author="RICHELLE CAREY" description="The Complexity of Choice: Abortion, Motherhood, and the Adoption"  />
                <TrendingCard number="05" author="Pete Sena" description="MVP is Over. You Need to Think About MVE."  />
                <TrendingCard number="06" author="Varant Zanoyan" description="Chronon, Airbnb’s ML Feature Platform, Is Now Open Source"  />
            </div>
        </div>
    </div>
  )
}

// 

export default Trending

interface TrendingCardType{
    number: string;
    author: string;
    description: string;
}

const TrendingCard = ({number,author, description}:TrendingCardType) => {
    return(
        <div className='trending-card'>
            <h1>{number}</h1>
            <div>
                <div><img src="https://miro.medium.com/v2/resize:fill:20:20/1*07lesGIGjBy3AqvnMCFx8Q.jpeg" alt="" /><span>{author}</span></div>
                <h2>{description}</h2>
                <p>Apr 12, 2024</p>
            </div>
        </div>
    )
}