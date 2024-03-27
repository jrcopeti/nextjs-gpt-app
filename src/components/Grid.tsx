import Image from "next/image";
import grid from "/public/grid.png";

function Grid() {
  return (
    <div className="absolute left-0 top-0 max-w-full">
      <Image
        className="w-full"
        src={grid}
        width={550}
        height={550}
        alt="Grid"
      />
    </div>
  );
}

export default Grid;
