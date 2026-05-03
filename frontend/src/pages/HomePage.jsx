import Hero from '../components/Hero/Hero';
import InfoBar from '../components/InfoBar/InfoBar';
import About from '../components/About/About';
import Services from '../components/Services/Services';
import Gallery from '../components/Gallery/Gallery';
import Booking from '../components/Booking/Booking';
import Packages from '../components/Packages/Packages';
import Testimonials from '../components/Testimonials/Testimonials';
import Contact from '../components/Contact/Contact';

/**
 * HomePage assembles all the main-page sections in order.
 * Each section is a self-contained component with its own SCSS.
 */
const HomePage = () => (
  <>
    <InfoBar />
    <Hero />
    <About />
    <Services />
    <Gallery />
    <Booking />
    <Packages />
    <Testimonials />
    <Contact />
  </>
);

export default HomePage;
