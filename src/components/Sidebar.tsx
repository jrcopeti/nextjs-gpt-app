import NavLinks from "./NavLinks";
import SidebarHeader from "./SidebarHeader";
import MemberProfile from "./MemberProfile";

function Sidebar() {
  return (
    <div className="px-4 w-80 min-h-full bg-base-200 py-12 grid grid-rows-[auto,1fr,auto]">
      {/* 1st row */}
      <SidebarHeader />
      {/* 2nd row */}
      <NavLinks />
      {/* 3rd row */}
      <MemberProfile />
    </div>
  );
}

export default Sidebar;
