import Catalog from "./components/Catalog";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Institutional from "./components/Institutional";
import PromoBar from "./components/PromoBar";
import Collections from "./components/Collections";
import RingExperience from "./components/RingExperience";

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
      </main>
    </>
  );
}

export default App;