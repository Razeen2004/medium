import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Trending from '../components/Trending'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <Trending/>
    </div>
  )
}

export default Home