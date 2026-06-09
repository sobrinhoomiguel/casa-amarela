import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Rooms from './components/Rooms'
import Features from './components/Features'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Location from './components/Location'
import BookingCTA from './components/BookingCTA'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Rooms />
        <Features />
        <Gallery />
        <Testimonials />
        <Location />
        <BookingCTA />
      </main>
    </>
  )
}