import Sidebar from "@/components/Sidebar";
import { FaBarsStaggered } from "react-icons/fa6";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input type="checkbox" id="my-drawer-2" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-2"
          className="drawer-button lg:hidden flex justify-end p-4"
        >
          <FaBarsStaggered className="w-8 h-8 text-secondary z-40" />
        </label>
        <div className="bg-base-100 px-8 py-12 min-h-dvh">{children}</div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <Sidebar />
      </div>
    </div>
  );
};

export default layout;
