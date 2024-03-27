import { SiAffinityphoto, SiBento, SiOpenaigym } from "react-icons/si";

function SidebarHeader() {
  return (
    <>
      <div className="mb-4 flex items-center gap-4 px-4">
        <SiBento className="h-10 w-10 text-base-content " />
        <h2 className=" inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-2xl font-bold text-transparent  ">
          GPT app
        </h2>
      </div>
    </>
  );
}

export default SidebarHeader;
