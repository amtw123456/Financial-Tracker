import { DatePicker } from "@nextui-org/react";
import { data } from "./donutData";
import { DonutChart } from "./donutChart";

export default function Dashboard() {
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="hidden md:flex flex-col w-64 bg-gray-800">
                <div className="flex items-center justify-center h-16 bg-gray-900">
                    <span className="text-white font-bold uppercase">Financial Tracker</span>
                </div>
                <div className="flex flex-col flex-1 overflow-y-auto">
                    <nav className="flex-1 px-2 py-4 bg-gray-800">
                        <ul className="flex flex-col gap-2 max-w-[280px] mx-2">
                            <li>
                                <details className="group">
                                    <summary
                                        className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
                                        <span className="flex gap-2">
                                            <img className="w-6 h-6 rounded-lg"
                                                src="https://lh3.googleusercontent.com/a/AGNmyxbSlMgTRzE3_SMIxpDAhpNad-_CN5_tmph1NQ1KhA=s96-c"
                                                alt="" />

                                            <span className="text-white">
                                                Prajwal Hallale
                                            </span>
                                        </span>
                                        <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
                                            width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                            </path>
                                        </svg>
                                    </summary>

                                    <article className="px-4 pb-4">
                                        <ul className="flex flex-col gap-4 pl-2 mt-4">

                                            <li className="flex gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                    stroke="currentColor" className="w-6 h-6 text-white">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z">
                                                    </path>
                                                </svg>

                                                <a className="text-white">
                                                    Dashboard
                                                </a>
                                            </li>


                                            <li className="flex gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                    stroke="currentColor" className="w-6 h-6 text-white">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z">
                                                    </path>
                                                </svg>

                                                <a className="text-white">
                                                    Study Lists
                                                </a>
                                            </li>


                                            <li className="flex gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                    stroke="currentColor" className="w-6 h-6 text-white">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z">
                                                    </path>
                                                </svg>


                                                <a className="text-white">
                                                    Your contribution
                                                </a>
                                            </li>


                                            <li className="flex gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                    stroke="currentColor" className="w-6 h-6 text-white">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z">
                                                    </path>
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                                                    </path>
                                                </svg>


                                                <a className="text-white">
                                                    Settings
                                                </a>
                                            </li>


                                            <form action="http://127.0.0.1:8000/auth/logout" method="POST">
                                                <input type="hidden" name="_token" value="ymEkCLBFpgkdaSbidUArRsdHbER5DkT6ByS3eJYb" />
                                                <button type="submit" className="text-white text-sm px-2 py-1 hover:bg-red-200 rounded-md">
                                                    Log Out
                                                </button>
                                            </form>

                                        </ul>

                                    </article>

                                </details>
                            </li>

                            <li>
                                <details className="group">

                                    <summary
                                        className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">

                                        <span className="flex gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                stroke="currentColor" className="w-6 h-6 text-white">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>

                                            <span className="text-white">
                                                Recent Documents
                                            </span>
                                        </span>
                                        <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
                                            width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                            </path>
                                        </svg>
                                    </summary>

                                    <article className="px-4 pb-4">
                                        <ul className="flex flex-col gap-1 pl-2">
                                            <li><a href="" className="text-white">Document title</a></li>
                                            <li><a href="" className="text-white">Document title</a></li>
                                            <li><a href="" className="text-white">Document title</a></li>
                                        </ul>
                                    </article>

                                </details>
                            </li>

                            <li>
                                <details className="group">

                                    <summary
                                        className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">

                                        <span className="flex gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                stroke="currentColor" className="w-6 h-6 text-white">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                                            </svg>
                                            <span className="text-white">
                                                Popular courses
                                            </span>
                                        </span>
                                        <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
                                            width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                            </path>
                                        </svg>

                                    </summary>

                                    <article className="px-4 pb-4">
                                        <ul className="flex flex-col gap-1 pl-2">
                                            <li><a href="" className="text-white">Course title</a></li>
                                            <li><a href="" className="text-white">Course title</a></li>
                                            <li><a href="" className="text-white">Course title</a></li>
                                        </ul>
                                    </article>

                                </details>
                            </li>

                        </ul>
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
                            Transactions
                        </a>
                        <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Analytics
                        </a>
                        <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            About
                        </a>
                    </nav>
                </div>
            </div>

            <div className="flex flex-col flex-1 overflow-y-auto">
                <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
                    {/* <div className="flex items-center px-4">
                        <button className="text-gray-500 focus:outline-none focus:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <input className="mx-4 w-full border rounded-md px-4 py-2" type="text" placeholder="Search" />
                    </div> */}
                    <div className="pl-5">
                        Dashboard
                    </div>
                    <div className="flex items-center space-x-5 pr-5">
                        <div className="relative inline-block text-left">
                            <DatePicker
                                className="max-w-[284px]"
                                granularity="day"
                                labelPlacement={"outside-left"}
                                label={"Start Date"}

                            // value={date}
                            // onChange={setDate}
                            />
                            {/* <div className="group relative cursor-pointer py-2">
                            <div className="flex items-center justify-between space-x-5 bg-white px-4">
                                <div>
                                    <button type="button" className="flex rounded-full text-sm text-white focus:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-900" id="user-menu-button">
                                        <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=320&amp;h=320&amp;q=80" alt="" />
                                    </button>
                                </div>
                            </div>
                            <div className="absolute z-50 right-0 mt-2 hidden w-48 max-w-screen-sm bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:block">
                                <a className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black">
                                    Sunday
                                </a>
                                <a className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black">
                                    Monday
                                </a>
                                <a className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black">
                                    Tuesday
                                </a>
                            </div>
                        </div> */}
                        </div>
                        <div>to</div>
                        <div>
                            <DatePicker
                                className="max-w-[284px]"
                                granularity="day"
                                labelPlacement={"outside-left"}
                                label={"End Date"}

                            // value={date}
                            // onChange={setDate}
                            />
                        </div>
                    </div>

                </div>

                <div className="p-4">
                    {/* <h1 className="text-2xl font-bold">Welcome to my dashboard!</h1>
                    <p className="mt-2 text-gray-600">This is an example dashboard using Tailwind CSS.</p> */}
                    <div className="">
                        <div className="grid gap-4 lg:gap-8 md:grid-cols-5 p-8 pt-1">
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
                        <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800 max-w-full mx-8">
                            <div className="flex-col">
                                <div>Total Expenses</div>
                                <div>Jun 1 - Nov 30</div>
                                <div className="flex flex-row pt-6">
                                    <div className="flex-1 flex items-center justify-center">
                                        <DonutChart data={data} width={400} height={400} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-row">
                                            <div className="w-20">
                                                <ul className="list-disc pl-24">
                                                    <div className="h-8"><li className="marker:text-blue-500 marker:text-5xl"></li></div>
                                                    <div className="h-8"><li className="marker:text-green-500 marker:text-5xl"></li></div>
                                                    <div className="h-8"><li className="marker:text-yellow-500 marker:text-5xl"></li></div>
                                                    <div className="h-8"><li className="marker:text-purple-500 marker:text-5xl"></li></div>
                                                    <div className="h-8"><li className="marker:text-red-500 marker:text-5xl"></li></div>
                                                    <div className="h-8"><li className="marker:text-orange-500 marker:text-5xl"></li></div>
                                                    <div className="h-8"><li className="marker:text-pink-500 marker:text-5xl"></li></div>
                                                    <div className="h-8"><li className="marker:text-blue-800 marker:text-5xl"></li></div>
                                                    <div className="h-8"><li className="marker:text-yellow-800 marker:text-5xl"></li></div>
                                                    <div className="h-8"><li className="marker:text-blue-200 marker:text-5xl"></li></div>
                                                </ul>
                                            </div>
                                            <div>
                                                <ul className="list-disc w-36 border-1">
                                                    <div className="h-8 pl-1 pt-3">Mortage / Rent</div>
                                                    <div className="h-8 pl-1 pt-3">Food</div>
                                                    <div className="h-8 pl-1 pt-3">Utilities</div>
                                                    <div className="h-8 pl-1 pt-3">Bills</div>
                                                    <div className="h-8 pl-1 pt-3">Shopping</div>
                                                    <div className="h-8 pl-1 pt-3">Transportation</div>
                                                    <div className="h-8 pl-1 pt-3">Insurance</div>
                                                    <div className="h-8 pl-1 pt-3">Health Care</div>
                                                    <div className="h-8 pl-1 pt-3">Clothing</div>
                                                    <div className="h-8 pl-1 pt-3">Others</div>
                                                </ul>
                                            </div>
                                            <div>
                                                <ul className="list-disc w-24 border-1">
                                                    <div className="h-8 pl-1 pt-3"> $ 7521</div>
                                                    <div className="h-8 pl-1 pt-3"> $ 18345</div>
                                                    <div className="h-8 pl-1 pt-3"> $ 4079</div>
                                                    <div className="h-8 pl-1 pt-3"> $ 2190</div>
                                                    <div className="h-8 pl-1 pt-3"> $ 5643</div>
                                                    <div className="h-8 pl-1 pt-3"> $ 12367</div>
                                                    <div className="h-8 pl-1 pt-3"> $ 3452</div>
                                                    <div className="h-8 pl-1 pt-3"> $ 4987</div>
                                                    <div className="h-8 pl-1 pt-3"> $ 6578</div>
                                                    <div className="h-8 pl-1 pt-3"> $ 2994</div>
                                                </ul>
                                            </div>
                                            <div className="w-48 border-1">
                                                <div className="h-8 pl-1 pt-3">25%</div>
                                                <div className="h-8 pl-1 pt-3">15%</div>
                                                <div className="h-8 pl-1 pt-3">10%</div>
                                                <div className="h-8 pl-1 pt-3">20%</div>
                                                <div className="h-8 pl-1 pt-3">8%</div>
                                                <div className="h-8 pl-1 pt-3">12%</div>
                                                <div className="h-8 pl-1 pt-3">5%</div>
                                                <div className="h-8 pl-1 pt-3">3%</div>
                                                <div className="h-8 pl-1 pt-3">1%</div>
                                                <div className="h-8 pl-1 pt-3">1%</div>
                                            </div>


                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
}
