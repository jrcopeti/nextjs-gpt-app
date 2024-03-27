import TourInfo from "@/components/TourInfo";
import { getSingleTour } from "@/utils/actions";

import Image from "next/image";
import Link from "next/link";

import axios from "axios";
import { redirect } from "next/navigation";
import { TourProps } from "@/utils/types";
import { IoArrowBack } from "react-icons/io5";

const url = `https://api.unsplash.com/search/photos?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}&query=`;
const blurDataUrl =
  "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhomepage-hero.e6fc286a.jpg&w=8&q=70";

async function SingleTourPage({ params }: { params: { id: string } }) {
  const tour = (await getSingleTour(params.id)) as TourProps;

  if (!tour) {
    redirect("/tours");
  }
  let tourImage;
  try {
    const { data } = await axios.get(`${url}${tour.city}`);
    tourImage = data?.results[0]?.urls?.raw;
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <Link href="/tours" className="btn btn-primary btn-sm mb-12 ">
        <IoArrowBack size={20} />
      </Link>
      {tourImage && (
        <div>
          <Image
            src={tourImage}
            width={500}
            height={400}
            alt={tour.title}
            priority
            className="mb-16 h-96 rounded-xl object-cover shadow-xl"
            blurDataURL={blurDataUrl}
            placeholder="blur"
          />
        </div>
      )}
      <TourInfo tour={tour} />
    </div>
  );
}

export default SingleTourPage;
