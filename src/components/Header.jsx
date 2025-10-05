import Vector from "../assets/svg/Vector.svg";
import bell from "../assets/svg/bell-01.svg";
import { User } from "lucide-react";

const Header = () => {
  return (
    <div className="flex flex-row items-center py-4 gap-4 h-[90px] bg-[#F8F8F8] border-b border-[#DBDBDB] shadow-[0px_6px_12px_rgba(28,0,66,0.02)] box-border w-full px-6">
     
      <div className="flex flex-col justify-center items-start gap-1 flex-1">
        <div className="font-['Space_Grotesk'] text-sm text-[#4A4A4A]">
          Good morning !
        </div>
        <div className="font-['Space_Grotesk'] font-bold text-2xl text-[#131313]">
          Tylor Greak
        </div>
      </div>

      {/* Notification Bell Icon */}
      <div className="flex justify-center items-center p-3 w-16 h-16 border border-[#DBDBDB] rounded-lg">
        <img src={bell} alt="Notification Bell" className="w-6 h-6" />
      </div>

      {/* Profile Section with Avatar */}
      <div className="flex items-center py-1 px-2 gap-2 h-16 border border-[#DBDBDB] rounded-lg">
        {/* Avatar */}
        <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center overflow-hidden">
       
          <User size={28} className="text-white" />
         
        </div>
        
        {/* Dropdown Arrow */}
        <img src={Vector} alt="Dropdown Arrow" className="w-4 h-4" />
      </div>
    </div>
  );
};

export default Header;