import { BrowserRouter, Routes, Route } from "react-router-dom";
import Problems from "./pages/Problems";
import Practice from "./pages/Practice";
import Feedback from "./pages/Feedback";
import History from "./pages/History";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Problems />} />
        <Route
          path="/practice/:attemptId"
          element={<Practice />}
        />
        <Route
          path="/feedback/:evaluationId"
          element={<Feedback />}
        />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;