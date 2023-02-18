import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import { Gender } from "./Gender";
import { NotFound } from "./NotFound";
import { Name } from "./Name";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gender" element={<Gender />}>
          <Route path="/gender/:id" element={<Gender />} />
        </Route>
        <Route path="/name" element={<Name />}>
          <Route path="/name/:id" element={<Name />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
