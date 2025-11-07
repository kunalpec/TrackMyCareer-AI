import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderComp from "./Components/Header";
import Home from "./Components/Home";
import About from "./Components/About";
import Blog from "./Components/Blog";
import Login from "./Components/Login";
import ContactInfoList from "./Components/Contact";

function App() {
  return (
    <Router>
      <HeaderComp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactInfoList />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
