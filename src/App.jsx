import Header from "./Frontend/Header Component/Header"
import JSONSection from "./Frontend/JSON Component/JSONSection"
import Transition from "./Frontend/Transition/Transition"
import Main from "./Frontend/Main Component/Main"
import Footer from "./Frontend/Footer Component/Footer"
import DonnesPrediction, { DataContext } from "./Frontend/DataContext"
import Prediction from "./Frontend/Prediction Component/Prediction"
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Cartes from "./Frontend/Cartes/showcarte";
import Graphes from "./Frontend/Graphes/showgraphes";

function App() {
  return (
    <Router>
      <DonnesPrediction> {/* On déplace DonnesPrediction ici pour englober toute l'application */}
        <Header />
        <Routes>
          <Route path="/" element={<PoketchAPI />} />
          <Route path="/cartes" element={<Cartes />} />
          <Route path="/graphes" element={<Graphes />} />
        </Routes>
      </DonnesPrediction>
    </Router>
  )
}

function PoketchAPI() {
  const { predictionOn } = useContext(DataContext);

  return (
    <>
      <Main />
      <Transition styles="mainJson" />
      <JSONSection />
      <Transition styles="jsonFooter" />
      <Footer />

      {predictionOn && <Prediction />}
    </>
  );
}

export default App;
