import ToursCard from "./ToursCard";
import { TourProps } from "@/utils/types";
import { BiMessageSquareError } from "react-icons/bi";

function ToursList({ tours }: { tours: TourProps[] }) {
  if (tours.length === 0)
    return (
      <h4 className="text-xl flex gap-4 items-center">
        {" "}
        <span className='text-5xl'>
          <BiMessageSquareError />
        </span>
        No tours found{" "}
      </h4>
    );

  return (
    <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
      {tours.map((tour) => {
        return <ToursCard key={tour.id} tour={tour} />;
      })}
    </div>
  );
}

export default ToursList;
