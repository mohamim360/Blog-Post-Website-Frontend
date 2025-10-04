import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import union from "../assets/svg/Union (2).svg";
import home from "../assets/fi-rr-home.png";
import contentManagement from "../assets/fi-rr-interactive.png";

const Sidebar = () => {
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Home",
      icon: home,
      path: "/",
      isActive: true,
    },
    {
      id: 2,
      name: "Content Management",
      icon: contentManagement,
      path: "/content-manager",
      isActive: false,
    },
  ]);

  const handleClick = (clickedItem) => {
    // Update active state
    const updatedItems = menuItems.map((item) => ({
      ...item,
      isActive: item.id === clickedItem.id,
    }));
    setMenuItems(updatedItems);

    // Navigate
    navigate(clickedItem.path);
  };

  return (
    <div className="flex flex-col w-[300px] h-screen bg-[#F8F8F8]">
      {/* Header */}
      <div className="flex items-center px-5 gap-3 w-full h-[90px]">
        {/* Logo SVG */}
        <img src={union} alt="Logo" />
      </div>

      {/* Menu Items */}
      <div className="flex flex-col w-full">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item)}
            className={`flex items-center px-4 py-6 gap-2 w-full h-14 rounded-lg cursor-pointer transition-colors ${
              item.isActive ? "bg-[#F3EBFF]" : "hover:bg-gray-100"
            }`}
          >
            <div
              className={`flex justify-center items-center w-8 h-8 rounded-lg ${
                item.isActive ? "bg-[#6200EE]" : "bg-transparent"
              }`}
            >
              <img
                src={item.icon}
                alt={item.name}
                className={`w-5 h-5 ${
                  item.isActive ? "filter invert brightness-0" : ""
                }`}
              />
            </div>
            <span
              className={`flex-1 font-['Space_Grotesk'] text-base font-normal leading-6 tracking-[-0.01em] capitalize ${
                item.isActive ? "text-[#6200EE]" : "text-[#4A4A4A]"
              }`}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
