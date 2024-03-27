import NavLinks from "./NavLinks";
import SidebarHeader from "./SidebarHeader";
import MemberProfile from "./MemberProfile";
import ThemeToggle from "./ThemeToggle";

function Sidebar() {
  return (
    <div className="relative grid min-h-full w-80 grid-rows-[auto,auto,1fr,auto] overflow-hidden bg-gradient-to-r from-base-300 to-base-100  px-4 py-12 ">
      <SidebarHeader />
      <ThemeToggle />
      <NavLinks />
      <MemberProfile />
    </div>
  );
}

export default Sidebar;
