import { Route, Routes } from "react-router-dom";
import ClerkProviderWithRoutes from "./auth/ClerkProviderWithRoutes";

function App() {
  return (
    <ClerkProviderWithRoutes>
      <Routes>
        <Route path="/" element={} />
      </Routes>
    </ClerkProviderWithRoutes>
  );
}

export default App;
