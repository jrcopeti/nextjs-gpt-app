import TourInfo from "@/components/TourInfo";
import { ToursListProps } from "@/components/TourInfo";
import { generateTourImage, getSingleTour } from "@/utils/actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import axios from "axios";

const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

async function SingleTourPage({ params }: { params: { id: string } }) {
  const tour = (await getSingleTour(params.id)) as ToursListProps;

  if (!tour) {
    redirect("/tours");
  }

  // const tourImage = await generateTourImage({
  //   city: tour.city,
  //   country: tour.country,
  // });

  const { data } = await axios.get(`${url}${tour.city}`);
  const tourImage = data?.results[0]?.urls?.raw;

  return (
    <div>
      <Link href="/tours" className="btn btn-secondary mb-12">
        Back
      </Link>
      {tourImage && (
        <div>
          <Image
            src={tourImage}
            width={300}
            height={300}
            alt={tour.title}
            priority
            className="mb-16 h-96 rounded-xl object-cover shadow-xl"
          />
        </div>
      )}
      <TourInfo tour={tour} />
    </div>
  );
}

export default SingleTourPage;
