import ToursCard from "./ToursCard";
type JsonValue = string | number | boolean | null | { [key: string]: JsonValue } | JsonValue[];

export interface ToursListProps {
  id: string;
  city: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  image: string | null;
  stops: JsonValue
}

function ToursList({ tours }: { tours: ToursListProps[] }) {
  if (tours.length === 0) return <h4 className="text-lg">No tours found...</h4>;

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {tours.map((tour) => {
        return <ToursCard key={tour.id} tour={tour} />;
      })}
    </div>
  );
}

export default ToursList;
