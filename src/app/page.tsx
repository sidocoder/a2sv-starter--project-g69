import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Partners from './components/Partners';
import Journey from './components/Journey';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Apply from './components/Apply';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <Partners />
      <Journey />
      <About />
      <Testimonials />
      <Apply />
      <Footer />
    </main>
  );
}
