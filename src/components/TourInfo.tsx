import { TourProps } from "@/utils/types";

function TourInfo({ tour }: { tour: TourProps }) {
  const { title, description, stops } = tour;

  return (
    <div className="max-w-2xl">
      <h1 className="mb-4 text-4xl font-semibold">{title}</h1>
      <p className="mb-6 leading-loose">{description}</p>
      <ul className="">
        {stops?.map((stop, index) => {
          return (
            <li key={index} className="mb-4 rounded-xl bg-base-200 p-4">
              <p className="text">
                {index + 1}.{" "}
                {typeof stop === "object" ? JSON.stringify(stop) : stop}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TourInfo;
