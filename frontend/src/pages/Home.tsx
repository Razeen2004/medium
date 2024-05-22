import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Trending from '../components/Trending'
import Feed from '../components/Feed'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <Trending/>
        <Feed />
    </div>
  )
}

export default Home