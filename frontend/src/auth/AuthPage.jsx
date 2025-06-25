import React from "react";
import { SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";

function AuthPage() {
  return (
    <main className="min-w-[400px] w-screen h-screen my-8 mx-auto bg-slate-50 rounded-lg shadow flex flex-col items-center justify-center">
      <SignedOut>
        <SignIn routing="path" path="/sign-in" />
        <SignUp routing="path" path="/sign-up" />
      </SignedOut>
      <SignedIn>
        <div className="text-center text-text mt-4">
          <p>You are already signed in.</p>
        </div>
      </SignedIn>
    </main>
  );
}

export default AuthPage;
