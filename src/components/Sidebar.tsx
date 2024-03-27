import NavLinks from "./NavLinks";
import SidebarHeader from "./SidebarHeader";
import MemberProfile from "./MemberProfile";
import ThemeToggle from "./ThemeToggle";

function Sidebar() {
  return (
    <div className="grid min-h-full w-80 grid-rows-[auto,auto,1fr,auto] bg-gradient-to-r from-base-100 via-base-200 to-base-300 px-4 py-12 ">
      <SidebarHeader />
      <ThemeToggle />
      <NavLinks />
      <MemberProfile />
    </div>
  );
}

export default Sidebar;
