import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { FaBarsStaggered } from "react-icons/fa6";
import gradient from "/public/gradient.png";
import grid from "/public/grid.png";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input type="checkbox" id="my-drawer-2" className="drawer-toggle" />

        <div className="drawer-content">
          <label
            htmlFor="my-drawer-2"
            className="drawer-button absolute right-4 top-2 lg:hidden"
          >
            <FaBarsStaggered className="z-40 h-8 w-8 text-primary" />
          </label>

          <div className="min-h-screen bg-base-200 px-8 py-12">{children}</div>
        </div>

        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <Sidebar />
        </div>

        <div className="pointer-events-none fixed -left-[5rem] top-0 h-[56.625rem] w-[56.625rem] opacity-40 mix-blend-color-dodge">
          <Image
            className="absolute left-1 top-1/4 h-[88.5625rem] w-[20rem] max-w-[79.5625rem] -translate-x-1/2 -translate-y-1/2 lg:top-1/2 lg:w-[79.5625rem]"
            src={gradient}
            width={1417}
            height={1417}
            alt="Gradient"
          />
        </div>
      </div>
    </>
  );
};

export default layout;
