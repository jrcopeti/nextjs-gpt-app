type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | object
  | JsonValue[];

export interface ToursListProps {
  id: string;
  city: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  image: string | null;
  stops: JsonValue[];
}

function TourInfo({ tour }: { tour: ToursListProps }) {
  console.log("tour in Tour Info Component", tour);
  const { title, description, stops } = tour;
  console.log(stops);
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
