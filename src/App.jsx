import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import BookingCTA from './components/BookingCTA'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Gallery />
        <Testimonials />
        <BookingCTA />
      </main>
    </>
  )
}
