import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Education from "./pages/Education";
import PrayerTimesPage from "./pages/PrayerTimesPage";
import MainLayout from "./layouts/MainLayout";

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/education" element={<Education />} />
          <Route path="/prayer-times" element={<PrayerTimesPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
