import TourInfo from "@/components/TourInfo";
import { getSingleTour } from "@/utils/actions";

import Image from "next/image";
import Link from "next/link";

import axios from "axios";
import { redirect } from "next/navigation";
import { TourProps } from "@/utils/types";
import { IoArrowBack } from "react-icons/io5";
import { getPlaiceholder } from "plaiceholder";
import toast from "react-hot-toast";

const url = `https://api.unsplash.com/search/photos?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}&query=`;
const blurDataUrl =
  "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhomepage-hero.e6fc286a.jpg&w=8&q=70";

async function SingleTourPage({ params }: { params: { id: string } }) {
  const tour = (await getSingleTour(params.id)) as TourProps;

  if (!tour) {
    redirect("/tours");
  }

  let tourImage = "";
  let base64 = "";

  try {
    const { data } = await axios.get(`${url}${tour.city}`);

    tourImage = data?.results[0]?.urls?.raw;

    const response = await axios.get(tourImage, {
      responseType: "arraybuffer",
    });

    const buffer = Buffer.from(response.data, "binary");
    const plaiceholderRes = await getPlaiceholder(buffer);
    base64 = plaiceholderRes.base64;
    console.log(base64)
  } catch (error) {
    console.log(error);
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
            blurDataURL={base64}
          />
        </div>
      )}
      <TourInfo tour={tour} />
    </div>
  );
}

export default SingleTourPage;
