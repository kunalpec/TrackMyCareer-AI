import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
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
  const { user, initializing } = useAppContext();

  if (initializing) {
    return (
      <div className="app-loading">
        <p>Loading...</p>
      </div>
    );
  }

  const isRecruiter = user?.role === "recruiter";
  const isCandidate = user?.role === "candidate";

  return (
    <Router>
      <HeaderComp />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/providejobs"
          element={isRecruiter ? <ProvideComp /> : <AdminLogin />}
        />
        <Route
          path="/applyjobs"
          element={isCandidate ? <ApplyComp /> : <UserLogin />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactInfoList />} />
        <Route path="/admin-signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
