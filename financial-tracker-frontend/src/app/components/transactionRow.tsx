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
    House: <FaHouse className="text-gray-600" />,
    Utilities: <FaHandHoldingWater className="text-gray-600" />,
    Bills: <FaMoneyBills className="text-gray-600" />,
    Clothes: <GiClothes className="text-gray-600" />,
    Transportation: <FaCarSide className="text-gray-600" />,
    Healthcare: <MdHealthAndSafety className="text-gray-600" />,
    Food: <IoFastFood className="text-gray-600" />,
    Shopping: <MdShoppingCart className="text-gray-600" />,
    Others: <HiDotsCircleHorizontal className="text-gray-600" />,
    Insurance: <FaShieldAlt className="text-gray-600" />,
};

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
                        {iconMap[category] || <HiDotsCircleHorizontal className="text-gray-600" />} {/* Default icon */}
                    </span>
                    {category}
                </div>

                <span className="w-2/5 text-lg font-medium border-r ml-2 py-1 flex items-center">{description}</span>

                <span className="w-1/5 text-lg font-medium ml-2 py-1 flex items-center">{amount.toFixed(2)}</span>
            </div>

        </div>
    );
}
