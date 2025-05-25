import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import CodeCademy from "./components/CodeCademy";
import Collaboration from "./components/Collaboration";
import Comments from "./components/Comments";
import Header from "./components/Header";

const App = () => {
  const dummyComments = [
    { text: "Sjajan rad!", author: "Ana" },
    { text: "Vrlo korisno, hvala!", author: "Marko" },
    { text: "Odličan dizajn!", author: "Jovana" },
    { text: "Veoma jasno objašnjeno.", author: "Ivan" },
    { text: "Dodao bih još jedan primer.", author: "Petar" },
    { text: "Zanimljiva tema!", author: "Milica" },
  ];
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <CodeCademy />
        <Benefits />
        <Collaboration />
        <Comments comments={dummyComments} />
      </div>
      <ButtonGradient />
    </>
  );
};

export default App;
