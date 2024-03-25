import ToursCard from "./ToursCard";
import { TourProps } from "@/utils/types";

function ToursList({ tours }: { tours: TourProps[] }) {
  if (tours.length === 0) return <h4 className="text-lg">No tours found...</h4>;

  return (
    <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">
      {tours.map((tour) => {
        return <ToursCard key={tour.id} tour={tour} />;
      })}
    </div>
  );
}

export default ToursList;
