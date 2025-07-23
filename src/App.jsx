import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import CodeCademy from "./components/CodeCademy";
import Collaboration from "./components/Collaboration";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <CodeCademy />
        <Benefits />
        <Collaboration />
      </div>
      <ButtonGradient />
    </>
  );
};

export default App;
