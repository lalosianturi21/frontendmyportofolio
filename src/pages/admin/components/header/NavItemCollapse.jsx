import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const NavItemCollapse = ({ title, children, icon, name, activeNavName, setActiveNavName }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (activeNavName !== name) {
      setIsOpen(false);
    }
  }, [activeNavName, name]);

  return (
    <div className="navitemcollapse rounded-lg transition-all duration-300">
      <button
        className={`w-full flex items-center justify-between text-left text-lg px-4 py-3 rounded-lg 
        ${name === activeNavName ? "bg-purple-500 text-white" : "text-white bg-purple-600 hover:bg-orange-500"}`}
        onClick={() => {
          setActiveNavName(name);
          setIsOpen(!isOpen);
        }}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium">{title}</span>
        </div>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      {isOpen && (
        <div className="mt-2 bg-white rounded-lg shadow-md p-3 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default NavItemCollapse;
