import Catalog from "./components/Catalog";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Institutional from "./components/Institutional";
import PromoBar from "./components/PromoBar";

function App() {
  return (
    <>
      <PromoBar />
      <Header />

      <main>
        <Hero />
        <Catalog />
        <Institutional />
      </main>
    </>
  );
}

export default App;