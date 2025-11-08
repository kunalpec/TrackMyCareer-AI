import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderComp from "./Components/Header";
import Home from "./Components/Home";
import About from "./Components/About";
import Login from "./Components/Login";
import ContactInfoList from "./Components/Contact";
import ApplyComp from "./Components/ApplyJobs";
import ProvideComp from "./Components/ProvideJobs";

function App() {
  return (
    <Router>
      <HeaderComp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/providejobs" element={<ProvideComp />} />
        <Route path="/applyjobs" element={<ApplyComp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactInfoList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
