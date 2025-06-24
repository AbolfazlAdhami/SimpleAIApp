import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import { Outlet, Link, Navigate } from "react-router-dom";

function Layout() {
  return (
    <main className="app-layout">
      <header className="app-header">
        <div className="">
          <h1>Code Challenge Generator</h1>
          <nav>
            <SignIn>
              <Link to={"/"}></Link>
              <Link to="/history">History</Link>
              <UserButton />
            </SignIn>
          </nav>
        </div>
      </header>
      <section>
        <SignedOut>
          <Navigate replace to="/sign-in" />
        </SignedOut>
        <SignedIn>
          <Outlet />
        </SignedIn>
      </section>
    </main>
  );
}

export default Layout;
