import Link from "next/link";
import { TourProps } from "@/utils/types";
import Image from "next/image";

function ToursCard({ tour }: { tour: TourProps }) {
  const { id, city, country, countryFlag } = tour;
  return (
    <Link
      href={`/tours/${id}`}
      className="card card-compact rounded-xl bg-primary-content shadow-lg transition duration-300 ease-in-out hover:-translate-y-2 "
    >
      <div className="card-body items-center text-center w-full">
        <h2 className="card-title text-center capitalize">
          {city}, {country}
        </h2>
        <Image
          src={countryFlag}
          alt={country}
          width={32}
          height={32}
          className="rounded-md "
        />
      </div>
    </Link>
  );
}

export default ToursCard;
