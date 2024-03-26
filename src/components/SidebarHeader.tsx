import { SiAffinityphoto, SiBento, SiOpenaigym } from "react-icons/si";

function SidebarHeader() {
  return (
    <>
      <div className="mb-4 flex items-center gap-4 px-4">
        <SiBento className="h-10 w-10 text-xl text-secondary" />
        <h2 className="text-xl font-extrabold text-secondary">GPT App</h2>
      </div>
    </>
  );
}

export default SidebarHeader;
