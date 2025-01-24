import Header from "./Frontend/Header Component/Header"
import JSONSection from "./Frontend/JSON Component/JSONSection"
import Transition from "./Frontend/Transition/Transition"
import Main from "./Frontend/Main Component/Main"
import Footer from "./Frontend/Footer Component/Footer"
import DonnesPrediction from "./Frontend/DataContext"

function App() {

  return (
    <>
      <DonnesPrediction>
        <Header />
        <Main />
        <Transition styles="mainJson" />
        <JSONSection />
        <Transition styles="jsonFooter" />
        <Footer />
      </DonnesPrediction>
    </>
  )
}

export default App
