import { useState } from "react";
import admin from "../../assets/svg/clarity_administrator-solid.svg";
import leaf from "../../assets/svg/fi-rr-leaf.svg";
import listCheck from "../../assets/svg/fi-rr-list-check.svg";
import apps from "../../assets/svg/fi-rr-apps.svg";
import flower from "../../assets/svg/fi-rr-flower.svg";
import fileCheck from "../../assets/svg/fi-rr-file-check.svg";
import interactive from "../../assets/svg/fi-rr-interactive.svg";
import lineWidth from "../../assets/svg/fi-rr-line-width.svg";
import megaphone from "../../assets/svg/fi-rr-megaphone.svg";
import search from "../../assets/svg/fi-rr-search.svg";
import settingsSliders from "../../assets/svg/fi-rr-settings-sliders.svg";
import user from "../../assets/svg/fi-rr-user.svg";
import caretRight from "../../assets/svg/fi-rr-caret-right.svg";
import Vector from "../../assets/svg/Vector (1).svg";
import DashboardContent from "../DashboardContent";
import BlogPosts from "../BlogPosts";


const ContentEditorSidebar = ({ activeCollectionType, setActiveCollectionType }) => {
  const collectionTypes = [
    { id: "author", name: "Author" },
    { id: "category", name: "Category" },
    { id: "comment", name: "Comment" },
    { id: "cta", name: "CTA" },
    { id: "post", name: "Post" },
    { id: "tag", name: "Tag" },
    { id: "user", name: "User" },
  ];

  return (
    <div>
      <div className="w-[266px] h-screen bg-[#F4F6F6] border-l border-gray-200 ">
      {/* Search */}
      <div className="relative w-full h-[48px] p-[2px]">
        <div className="absolute right-[8px] top-[8px] w-[36px] h-[36px] bg-white rounded-[8px] flex items-center justify-center cursor-pointer">
          <img src={search} alt="Search Icon" />
        </div>
      </div>

      {/* Content Header */}
      <div className="flex items-center justify-between w-full border-b border-dashed border-[#4A4A4A] px-4 py-0.5">
        <h2 className="font-['Roboto'] font-medium text-[22px] text-[#111111]">
          Content
        </h2>
      </div>

      {/* Collection Types Header */}
      <div className="flex justify-between items-center px-4 py-5">
        <h3 className="font-['Poppins'] font-bold text-[14px] text-[#8C8C8C]">
          COLLECTION TYPES
        </h3>
        <span className="text-[#4A4A4A] text-[16px] cursor-pointer">
          <img src={interactive} alt="interactive Icon" />
        </span>
      </div>

      {/* Collection Section */}
      <div className="flex flex-col gap-[12px] px-2">
        {collectionTypes.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveCollectionType(item.id)}
            className={`flex items-center gap-2 py-3 px-2 rounded-lg cursor-pointer hover:bg-gray-200 ${
              activeCollectionType === item.id ? "bg-[#F9D8FF]" : ""
            }`}
          >
            <span className="text-[12px]">
              <img src={caretRight} alt="caretRight Icon" />
            </span>
            <span className="font-spaceGrotesk text-[16px] text-[#111111] capitalize">
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Single Types */}
      <div className="flex justify-between items-center px-4 py-5 mt-2">
        <h3 className="font-['Poppins'] font-bold text-[14px] text-[#8C8C8C]">
          SINGLE TYPES
        </h3>
        <span className="text-[#4A4A4A] text-[16px] cursor-pointer">
          <img src={fileCheck} alt="file check Icon" />
        </span>
      </div>
    </div>
    </div>
    
  );
};

const ContentManagerDashboard = () => {
  const [activeSidebarMenu, setActiveSidebarMenu] = useState("");
  const [activeCollectionType, setActiveCollectionType] = useState("");

  return (
    
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Main Sidebar */}
      <div className="flex flex-col justify-between w-[291px] bg-white border-r border-gray-200 px-2 py-4">
        <div>
          {/* Header */}
          <div className="flex items-center border-b border-gray-200 pb-4 mb-4 px-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-full mr-3">
              <img src={admin} alt="admin Icon" />
            </div>
            <div>
              <h1 className="text-[28px] font-bold text-[#4A4A4A] leading-none">
                Dashboard
              </h1>
              <p className="text-[20px] text-[#4A4A4A] leading-tight">Blogs</p>
            </div>
          </div>

          {/* Content Manager */}
          <div
            className={`flex items-center gap-3 rounded-lg px-4 py-2 mb-5 cursor-pointer ${
              activeSidebarMenu === "content-manager" ? "bg-[#F9D8FF]" : "hover:bg-gray-100"
            }`}
            onClick={() =>
              setActiveSidebarMenu((prev) =>
                prev === "content-manager" ? "" : "content-manager"
              )
            }
          >
            <div
              className={`flex items-center justify-center w-7 h-7 rounded-lg ${
                activeSidebarMenu === "content-manager" ? "bg-[#CB30E0]" : "bg-gray-300"
              }`}
            >
              <img src={leaf} alt="Leaf Icon" />
            </div>
            <span
              className={`text-[16px] ${
                activeSidebarMenu === "content-manager"
                  ? "text-[#CB30E0] font-medium"
                  : "text-[#4A4A4A]"
              }`}
            >
              Content Manager
            </span>
          </div>

          {/* PLUGINS Section */}
          <div className="px-2">
            <h3 className="text-[12px] text-gray-500 font-bold mb-4">PLUGINS</h3>
            <div className="space-y-4">
              {[
                { icon: listCheck, text: "Content-Type Builder" },
                { icon: apps, text: "Media Library" },
                { icon: lineWidth, text: "Guidelines" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 cursor-pointer">
                  <img src={item.icon} alt={`${item.text} Icon`} className="w-5 h-5" />
                  <span className="text-[#4A4A4A] text-[15px]">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* GENERAL Section */}
          <div className="px-2 mt-8">
            <h3 className="text-[12px] text-gray-500 font-bold mb-4">GENERAL</h3>
            <div className="space-y-4">
              {[
                { icon: settingsSliders, text: "Plugins" },
                { icon: megaphone, text: "Marketplace" },
                { icon: flower, text: "Settings" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 cursor-pointer">
                  <img src={item.icon} alt={`${item.text} Icon`} className="w-5 h-5" />
                  <span className="text-[#4A4A4A] text-[15px]">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom User Section */}
        <div className="flex items-center justify-between px-3 mt-6">
          <div className="flex items-center gap-2">
            <img src={user} alt="User Icon" className="w-6 h-6" />
            <span className="text-[#4A4A4A] text-[15px]">Mansi Canopas</span>
          </div>
          <img src={Vector} alt="Dropdown Arrow" className="w-4 h-4 cursor-pointer" />
        </div>
      </div>

      {/* Content Editor Sidebar */}
      {activeSidebarMenu === "content-manager" && (
        <ContentEditorSidebar
          activeCollectionType={activeCollectionType}
          setActiveCollectionType={setActiveCollectionType}
        />
      )}

      {/* Middle Content */}
      {activeCollectionType === "post" && 
      <div className="my-auto overflow-auto ">
        <BlogPosts/>
      </div>
      }
    </div>
  );
};

export default ContentManagerDashboard;
