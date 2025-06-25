import React from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter as Router } from "react-router-dom";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function ClerkProviderWithRoutes({ children }) {
  console.log(PUBLISHABLE_KEY, "PUBLISHABLE_KEY");
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Router>{children}</Router>
    </ClerkProvider>
  );
}

export default ClerkProviderWithRoutes;
