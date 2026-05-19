import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const categories = [
    "All",
    "Electronics",
    "Clothing",
    "Food",
    "Books",
];

const CategoryNav = ({ setCategory }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Select Category");

    const handleSelect = (cat) => {
        setSelected(cat);
        setIsOpen(false);

        if (cat === "All") {
            setCategory("");
        } else {
            setCategory(cat);
        }
    };

    return (
        <div className="relative w-64 z-50">

            {/* Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-2 border rounded-lg bg-white shadow-sm hover:shadow-md transition"
            >
                <span className="text-sm font-semibold text-gray-700">
                    {selected}
                </span>

                <ChevronDown size={18} />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-[999] overflow-hidden">          {categories.map((cat, index) => (
                    <div
                        key={index}
                        onClick={() => handleSelect(cat)}
                        className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 transition"
                    >
                        {cat}
                    </div>
                ))}
                </div>
            )}
        </div>
    );
};

export default CategoryNav;