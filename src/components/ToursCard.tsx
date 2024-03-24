import Link from "next/link";

interface ToursListProps {
  id: number;
  city: string;
  country: string;
  title: string;
  description: string;
  stops: string[];
}

function ToursCard({ tour }: { tour: ToursListProps }) {
  const { id, city, country, title } = tour;
  return (
    <Link
      href={`/tours/${id}`}
      className="card-compact card rounded-xl bg-base-200"
    >
      <div className="card-body items-center text-center">
        <h2 className="card-title text-center capitalize">
          {city}, {country}
        </h2>
      </div>
    </Link>
  );
}

export default ToursCard;
