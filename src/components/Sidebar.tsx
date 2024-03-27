import NavLinks from "./NavLinks";
import SidebarHeader from "./SidebarHeader";
import MemberProfile from "./MemberProfile";
import ThemeToggle from "./ThemeToggle";
import gradient from "/public/gradient.png";
import Image from "next/image";

function Sidebar() {
  return (
    <div className="overflow-hidden relative grid min-h-full w-80 grid-rows-[auto,auto,1fr,auto] bg-base-200  px-4 py-12 ">
  

      <SidebarHeader />
      <ThemeToggle />
      <NavLinks />
      <MemberProfile />
    </div>
  );
}

export default Sidebar;
