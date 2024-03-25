import { SiOpenaigym } from "react-icons/si";
import ThemeToggle from "./ThemeToggle";

function SidebarHeader() {
  return (
    <>
    <div className="flex items-center mb-4 gap-4 px-4">
      <SiOpenaigym className="w-10 h-10 text-xl text-secondary" />
      <h2 className="text-xl font-extrabold text-secondary">GPT App</h2>

    </div>

    </>
  );
}

export default SidebarHeader;
