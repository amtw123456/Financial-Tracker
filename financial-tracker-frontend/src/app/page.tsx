import React from "react";
import Link from "next/link";
import { NextUIProvider } from "@nextui-org/react";

export default function App() {
  return (
    <NextUIProvider>
      <main  >
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
                  <Link href="/signup">
                    <p>signup</p>
                  </Link>
                </li>
                <li>
                  <Link href="/transactions">
                    <p>transaction</p>
                  </Link>
                </li>
                <li>
                  <Link href="/analytics">
                    <p>Analytics</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </NextUIProvider>

  );
};

