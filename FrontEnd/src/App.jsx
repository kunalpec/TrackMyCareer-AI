import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRef, useState } from "react";

import HeaderComp from "./Components/Header";
import Home from "./Components/Home";
import About from "./Components/About";
import ContactInfoList from "./Components/Contact";
import ApplyComp from "./Components/ApplyJobs";
import ProvideComp from "./Components/ProvideJobs";
import AdminLogin from "./Components/LoginAdmin";

function App() {
  // ✅ useRef to store whether admin is logged in
  const [AdminRef,setAdminRef] = useState(1);

  return (
    <Router>
      <HeaderComp />
      <Routes>
        <Route path="/" element={<Home />} />
    
        <Route
          path="/providejobs"
          element={AdminRef? <ProvideComp /> : <AdminLogin />}
        />
        
        <Route path="/applyjobs" element={<ApplyComp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactInfoList />} />
      </Routes>
    </Router>
  );
}

export default App;
