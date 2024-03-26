import Sidebar from "@/components/Sidebar";
import { FaBarsStaggered } from "react-icons/fa6";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input type="checkbox" id="my-drawer-2" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-2"
          className="drawer-button absolute top-2 right-4 lg:hidden"
        >
          <FaBarsStaggered className="z-40 h-8 w-8 text-primary" />
        </label>
        <div className="min-h-screen bg-base-200  px-8 py-12">{children}</div>
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
