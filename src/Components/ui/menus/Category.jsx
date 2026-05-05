import React, { useState } from "react";
import { ChevronDown, Tv, Shirt, Utensils, BookOpen } from "lucide-react";

const categories = [
  { name: "All", icon: null },
  { name: "Electronics", icon: <Tv size={18} /> },
  { name: "Clothing", icon: <Shirt size={18} /> },
  { name: "Food", icon: <Utensils size={18} /> },
  { name: "Books", icon: <BookOpen size={18} /> },
];

const Category = ({ setCategory }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("All");

  const handleSelect = (cat) => {
    setSelected(cat.name);
    setOpen(false);
    setCategory(cat.name === "All" ? "" : cat.name);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-semibold"
      >
        {selected}
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute mt-2 w-44 bg-white border rounded-lg shadow-lg z-50">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => handleSelect(cat)}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {cat.icon}
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;