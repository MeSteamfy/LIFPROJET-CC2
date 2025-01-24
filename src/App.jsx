import Header from "./Frontend/Header Component/Header"
import JSONSection from "./Frontend/JSON Component/JSONSection"
import Transition from "./Frontend/Transition/Transition"
import Main from "./Frontend/Main Component/Main"
import Footer from "./Frontend/Footer Component/Footer"
import DonnesPrediction, { DataContext } from "./Frontend/DataContext"
import Prediction from "./Frontend/Prediction Component/Prediction"
import { useContext } from "react"

function App() {
  return (
    <>
      <DonnesPrediction>
        <PoketchAPI />
      </DonnesPrediction>
    </>
  )
}

function PoketchAPI() {

    // tu peux pas mettres predictionOn directement dans <App /> parce qu'il faut que son appel soit englober
    // dans <DonnesPrediction />

    const { predictionOn } = useContext(DataContext);
    return (
    <>
          <Header />
          <Main />
          <Transition styles="mainJson" />
          <JSONSection />
          <Transition styles="jsonFooter" />
          <Footer />
          {predictionOn && <Prediction />}
      </>
    )
}

export default App
