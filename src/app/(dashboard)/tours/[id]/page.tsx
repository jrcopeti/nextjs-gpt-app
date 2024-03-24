import TourInfo from "@/components/TourInfo";
import { ToursListProps } from "@/components/ToursList";
import { getSingleTour } from "@/utils/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

async function SingleTourPage({ params }: { params: { id: string } }) {
  const tour = await getSingleTour(params.id) as ToursListProps

  if (!tour) {
    redirect("/tours");
  }
  return (
    <div>
      <Link href="/tours" className="btn btn-secondary mb-12">Back</Link>
      <TourInfo tour={tour}/>
    </div>
  );
}

export default SingleTourPage;
