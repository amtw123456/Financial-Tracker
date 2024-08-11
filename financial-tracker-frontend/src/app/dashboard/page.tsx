
export default function Dashboard() {
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="hidden md:flex flex-col w-64 bg-gray-800">
                <div className="flex items-center justify-center h-16 bg-gray-900">
                    <span className="text-white font-bold uppercase">Financial Tracker</span>
                </div>
                <div className="flex flex-col flex-1 overflow-y-auto">
                    <nav className="flex-1 px-2 py-4 bg-gray-800">
                        <a href="#" className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            Dashboard
                        </a>
                        <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Messages
                        </a>
                        <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Settings
                        </a>
                    </nav>
                </div>
            </div>


            <div className="flex flex-col flex-1 overflow-y-auto">
                <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
                    <div className="flex items-center px-4">
                        <button className="text-gray-500 focus:outline-none focus:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <input className="mx-4 w-full border rounded-md px-4 py-2" type="text" placeholder="Search" />
                    </div>
                    <div className="flex items-center pr-4">

                        <button
                            className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
                            logout
                        </button>
                    </div>
                </div>
                <div className="p-4">
                    {/* <h1 className="text-2xl font-bold">Welcome to my dashboard!</h1>
                    <p className="mt-2 text-gray-600">This is an example dashboard using Tailwind CSS.</p> */}
                    <div className="">
                        <div className="grid gap-4 lg:gap-8 md:grid-cols-3 p-8 pt-6">
                            <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                                <div className="space-y-2">
                                    <div
                                        className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                                        <span>Revenue</span>
                                    </div>

                                    <div className="text-3xl dark:text-gray-100">
                                        $192.1k
                                    </div>

                                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">

                                        <span>32k increase</span>

                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                            aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                                <div className="space-y-2">
                                    <div
                                        className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                                        <span>New customers</span>
                                    </div>

                                    <div className="text-3xl dark:text-gray-100">
                                        1340
                                    </div>

                                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-red-600">

                                        <span>3% decrease</span>

                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                            aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                </div>

                            </div>

                            <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                                <div className="space-y-2">
                                    <div
                                        className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">

                                        <span>New orders</span>
                                    </div>

                                    <div className="text-3xl dark:text-gray-100">
                                        3543
                                    </div>

                                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">

                                        <span>7% increase</span>

                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                            aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
