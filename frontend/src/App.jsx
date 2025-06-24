import { Route, Routes } from "react-router-dom";
import ClerkProviderWithRoutes from "./auth/ClerkProviderWithRoutes";
import Layout from "./layout/Layout";
import AuthPage from "./auth/AuthPage";
import { ChallengeGenerator, HistoryPanel } from "./components";
import "./App.css";

function App() {
  return (
    <ClerkProviderWithRoutes>
      <Routes>
        <Route path="/sign-in/*" element={<AuthPage />} />
        <Route path="/sign-up" element={<AuthPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={ChallengeGenerator} />
          <Route path="/history" element={HistoryPanel} />
        </Route>
      </Routes>
    </ClerkProviderWithRoutes>
  );
}

export default App;
