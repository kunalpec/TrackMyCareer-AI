import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderComp from "./Components/Header";
import Home from "./Components/Home";
import About from "./Components/About";
import ContactInfoList from "./Components/Contact";
import ApplyComp from "./Components/ApplyJobs";
import ProvideComp from "./Components/ProvideJobs";
import AdminLogin from "./Components/LoginAdmin";
import SignupPage from "./Components/SignupPage";
import UserLogin from "./Components/userLogin";
import { useAppContext } from "./Context/AppContext";

function App() {
  const { adminRef, applyuser } = useAppContext();

  return (
    <Router>
      <HeaderComp />

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Admin Section — show dashboard if logged in, else login */}
        <Route
          path="/providejobs"
          element={adminRef ? <ProvideComp /> : <AdminLogin />}
        />

        {/* User Section — show job application if logged in, else login */}
        <Route
          path="/applyjobs"
          element={applyuser ? <ApplyComp /> : <UserLogin />}
        />

        {/* Static Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactInfoList />} />

        {/* Signup */}
        <Route path="/admin-signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
