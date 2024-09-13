"use client";

import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LoginResponse {
    token: string; // Adjust this based on your API response structure
}

export default function Signup() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>(""); // State for confirm password
    const [data, setData] = useState<LoginResponse | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const router = useRouter();

    const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post("/api/signup", {
                username: email,
                password: password,
            });
            console.log("Registration successful:", response.data);
            // router.push("/dashboard"); // Redirect to dashboard after successful login
        } catch (error) {
            console.error("Login failed:", error);
            // setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <main className="h-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSignup}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    name="confirm-password"
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        aria-describedby="terms"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="terms"
                                        className="font-light text-gray-500 dark:text-gray-300"
                                    >
                                        I accept the{" "}
                                        <a
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                            href="#"
                                        >
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Create an account
                            </button>
                            <div className="flex flex-row text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?&nbsp;
                                <Link href="/login">
                                    <div className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Login here
                                    </div>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
