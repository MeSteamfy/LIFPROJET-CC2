import Header from "./Frontend/Header Component/Header"
import JSONSection from "./Frontend/JSON Component/JSONSection"
import Transition from "./Frontend/Transition/Transition"
import Main from "./Frontend/Main Component/Main"
import Footer from "./Frontend/Footer Component/Footer"
import DonnesPrediction, { DataContext } from "./Frontend/DataContext"
import Prediction from "./Frontend/Prediction Component/Prediction"
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sets from "./Frontend/Sets/Sets"
import Graphes from "./Frontend/Graphes/Graphes"
import SetCartes from "./Frontend/Sets/Cartes Set/SetCartes"
import CartesQuery from "./Frontend/Sets/Cartes Query/CartesQuery"

function App() {
  return (
    <Router>
      <DonnesPrediction> {/* On déplace DonnesPrediction ici pour englober toute l'application */}
        <Header />
        <Routes>
          <Route path="/" element={<PoketchAPI />} />
          <Route path="/sets" element={ <Sets />} />
          <Route path="/graphes" element={<Graphes />} />
          <Route path="/sets/:setID" element={ <SetCartes />} />
          <Route path="/pokemon/search/:pokemonName" element={<CartesQuery />} />
        </Routes>
      </DonnesPrediction>
    </Router>
  )
}

function PoketchAPI() {
  return (
    <>
      <Main />
      <Transition styles="mainJson" />
      <JSONSection />
      <Transition styles="jsonFooter" />
      <Footer />
    </>
  );
}

export default App;
