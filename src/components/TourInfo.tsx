interface Tour {
  city: string;
  country: string;
  title: string;
  description: string;
  stops: string[];
}

function TourInfo({ tour }: { tour: Tour }) {
  console.log("tour in Tour Info Component", tour);
  const { title, description, stops } = tour;
  return (
    <div className="max-w-2xl">
      <h1 className="mb-4 text-4xl font-semibold">{title}</h1>
      <p className="mb-6 leading-loose">{description}</p>
      <ul className=''>
        {stops.map((stop, index) => {
          return (
            <li key={stop} className="mb-4 rounded-xl bg-base-200 p-4">
              <p className='text'>{index + 1}. {stop}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TourInfo;
