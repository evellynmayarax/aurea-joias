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
      </main>
    </>
  );
}

export default App;