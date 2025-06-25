import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import { Outlet, Link, Navigate } from "react-router-dom";

function Layout() {
  return (
    <main className="min-h-screen flex flex-col w-full bg-mainBackground">
      <header className="bg-slate-100 p-4 border-b border-b-gray-200 ">
        <div className="w-full max-w-7xl my-0 mx-auto flex justify-between items-center py-0 px-4">
          <h1 className="text-text text-2xl">Code Challenge Generator</h1>
          <nav className="flex gap-6 items-center">
            <SignIn>
              <Link className="text-text font-medium transition-colors ease-in duration-200 hover:text-primary" to={"/"}></Link>
              <Link className="text-text font-medium transition-colors ease-in duration-200 hover:text-primary" to="/history">
                History
              </Link>
              <UserButton />
            </SignIn>
          </nav>
        </div>
      </header>
      <section className="flex-1 w-full max-w-6xl my-0 mx-auto p-6">
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
