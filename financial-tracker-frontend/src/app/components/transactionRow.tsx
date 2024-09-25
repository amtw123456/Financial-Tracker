type TransactionRowProps = {
    date: string;
    description: string;
    category: string;
    amount: number;
    isCheck: boolean; // Add this line
    onCheckToggle: () => void; // Function to handle checkbox toggle
};


import { FaHouse } from "react-icons/fa6"; // house
import { FaHandHoldingWater } from "react-icons/fa"; // utilities
import { FaMoneyBills } from "react-icons/fa6"; // debts bills
import { GiClothes } from "react-icons/gi"; // clothes
import { FaCarSide } from "react-icons/fa"; // transportation
import { MdHealthAndSafety } from "react-icons/md"; // healthcare
import { IoFastFood } from "react-icons/io5"; // food
import { MdShoppingCart } from "react-icons/md"; // shopping cart
import { HiDotsCircleHorizontal } from "react-icons/hi"; // others
import { FaShieldAlt } from "react-icons/fa"; // insurance

const iconMap: { [key: string]: JSX.Element } = {
    House: (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
            <FaHouse className="text-blue-500" />
        </div>
    ),
    Utilities: (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-100">
            <FaHandHoldingWater className="text-yellow-600" />
        </div>
    ),
    Bills: (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-100">
            <FaMoneyBills className="text-purple-600" />
        </div>
    ),
    Clothes: (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-100">
            <GiClothes className="text-amber-600" />
        </div>
    ),
    Transportation: (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100">
            <FaCarSide className="text-orange-600" />
        </div>
    ),
    Healthcare: (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-100">
            <MdHealthAndSafety className="text-sky-600" />
        </div>
    ),
    Food: (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100">
            <IoFastFood className="text-green-600" />
        </div>
    ),
    Shopping: (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100">
            <MdShoppingCart className="text-red-600" />
        </div>
    ),
    Others: (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-100">
            <HiDotsCircleHorizontal className="text-cyan-600" />
        </div>
    ),
    Insurance: (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-100">
            <FaShieldAlt className="text-pink-600" />
        </div>
    ),

};

// <div className="h-8"><li className="marker:text-blue-500 marker:text-5xl"></li></div>
// <div className="h-8"><li className="marker:text-green-500 marker:text-5xl"></li></div>
// <div className="h-8"><li className="marker:text-yellow-500 marker:text-5xl"></li></div>
// <div className="h-8"><li className="marker:text-purple-500 marker:text-5xl"></li></div>
// <div className="h-8"><li className="marker:text-red-500 marker:text-5xl"></li></div>
// <div className="h-8"><li className="marker:text-orange-500 marker:text-5xl"></li></div>
// <div className="h-8"><li className="marker:text-pink-500 marker:text-5xl"></li></div>
// <div className="h-8"><li className="marker:text-blue-800 marker:text-5xl"></li></div>
// <div className="h-8"><li className="marker:text-yellow-800 marker:text-5xl"></li></div>
// <div className="h-8"><li className="marker:text-blue-200 marker:text-5xl"></li></div>

export default function TransactionRow({ date, description, category, amount, isCheck, onCheckToggle }: TransactionRowProps) {
    return (
        <div className="flex flex-row border-b w-full items-center">
            <div className="flex flex-row w-full">
                <span className="text-lg font-medium border-r ml-2 py-1">
                    <input type="checkbox" className="mr-2" checked={isCheck} onChange={onCheckToggle}
                    />
                </span>
                <span className="w-1/5 text-lg font-medium border-r ml-2 py-1 flex items-center ">
                    {date.substring(0, 10)}
                </span>


                <div className="w-1/5 text-lg font-medium border-r ml-2 flex flex-row items-center py-1">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full mr-2">
                        {iconMap[category] || <HiDotsCircleHorizontal className="text-gray-600" />}
                    </span>
                    {category}
                </div>

                <span className="w-2/5 text-lg font-medium border-r ml-2 py-1 flex items-center">{description}</span>

                <span className="w-1/5 text-lg font-medium ml-2 py-1 flex items-center">{amount.toFixed(2)}</span>
            </div>

        </div>
    );
}
