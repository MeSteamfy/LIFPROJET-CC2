import Header from "./Frontend/Header Component/Header"
import JSONSection from "./Frontend/JSON Component/JSONSection"
import Transition from "./Frontend/Transition/Transition"
import Main from "./Frontend/Main Component/Main"

function App() {

  return (
    <>
      <Header />
      <Main />
      <Transition styles="mainJson" />
      <JSONSection />
    </>
  )
}

export default App
