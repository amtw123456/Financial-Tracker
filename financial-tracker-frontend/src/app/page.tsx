import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full h-20 bg-emerald-800 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/dashboard">
                  <p>Dashboard</p>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <p>Login</p>
                </Link>
              </li>
              <li>
                <Link href="/signin">
                  <p>Signin</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

