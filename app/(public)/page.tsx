import Navbar from "../../components/public/Navbar";
import Hero from "../../components/public/Hero";
import Menu from "../../components/public/Menu";
import Gallery from "../../components/public/Gallery";
import About from "../../components/public/About";
import BusinessHours from "../../components/public/BusinessHours";
import Footer from "../../components/public/Footer";

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div className="space-y-12">
        <Menu />
        <Gallery />
        <About />
        <section className="mx-auto max-w-6xl px-4">
          <iframe
            title="Mapa Curumaní"
            src="https://www.google.com/maps?q=Cra.+17+%23+9A-68%2C+Curuman%C3%AD%2C+Cesar&output=embed"
            className="h-96 w-full rounded-2xl shadow-lg"
            loading="lazy"
          />
        </section>
        <Footer />
      </div>
    </main>
  );
}