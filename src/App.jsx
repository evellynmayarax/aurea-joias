import Catalog from "./components/Catalog";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Institutional from "./components/Institutional";
import PromoBar from "./components/PromoBar";
import Collections from "./components/Collections";
import RingExperience from "./components/RingExperience";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";



function App() {
  return (
    <>
      <PromoBar />
      <Header />

      <main>
        <Hero />
        <Catalog />
        <Institutional />
        <Collections />
        <RingExperience />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

export default App;