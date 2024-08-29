
import Sidebar from "../components/sidebar";
import Header from "../components/header";

export default function Transactions() {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar></Sidebar>
            <div className="flex flex-col flex-1 overflow-y-auto">
                <Header></Header >
            </div>
        </div >
    );
}
