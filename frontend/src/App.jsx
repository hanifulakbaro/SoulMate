import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage"; 
import InputPage from "./pages/InputPage";
import RecommendationPage from "./pages/RecommendationPage";
import GraphicPage from "./pages/GraphicPage";
import HistoryPage from "./pages/HistoryPage";
import RecommendationDetail from './pages/RecommendationDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/recom" element={<RecommendationPage />} />
        <Route path="/graph" element={<GraphicPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/recommendation/:id" element={<RecommendationDetail />} />
      </Routes>
    </Router>
  );
};

export default App;