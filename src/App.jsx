import Catalog from "./components/Catalog";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PromoBar from "./components/PromoBar";

function App() {
  return (
    <>
      <PromoBar />
      <Header />

      <main>
        <Hero />
        <Catalog />
      </main>
    </>
  );
}

export default App;