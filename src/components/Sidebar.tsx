import NavLinks from "./NavLinks";
import SidebarHeader from "./SidebarHeader";
import MemberProfile from "./MemberProfile";
import ThemeToggle from "./ThemeToggle";

function Sidebar() {
  return (
    <div className="px-4 w-80 min-h-full bg-base-200 py-12 grid grid-rows-[auto,auto,1fr,auto] ">
      {/* 1st row */}
      <SidebarHeader />
      <ThemeToggle />
      {/* 2nd row */}
      <NavLinks />
      {/* 3rd row */}
      <MemberProfile />
    </div>
  );
}

export default Sidebar;
