import TourInfo from "@/components/TourInfo";
import { getSingleTour } from "@/utils/actions";

import Image from "next/image";
import Link from "next/link";

import axios from "axios";
import { redirect } from "next/navigation";
import { TourProps } from "@/utils/types";

const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

async function SingleTourPage({ params }: { params: { id: string } }) {
  const tour = (await getSingleTour(params.id)) as TourProps;
  console.log("params", params.id);

  console.log("tour", tour);
  if (!tour) {
    redirect("/tours");
  }

  const { data } = await axios.get(`${url}${tour.city}`);
  const tourImage = data?.results[0]?.urls?.raw;
  const blurDataUrl =
    "data:image/jpeg;base64,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KgAogoAKAgoAKCICgAKCCgIKA8oorSCgIKgCKAgoIgoCAAgoogoCCgIKAgoCCgoCggoAKCgoAKACggoICigAogCgigiAoACggoCCgPKKK0goCCgiCgIKgIKAgoqIKAgAAAIKAigKCgIKAAooCgigAoAKKCKCCgogCgAoIoCAogAACgIKA8wCqAAAAgoCCiogoCAAgoCCgIKAgoCCgIoCgKCCgAKKAoAKACgAqACiAKAAAoCAKgAAAAAA84oqoKAgoIgCgigIKAgqCAAIKAgoCCgIoCgKCCgoAAKAAoAKKAogCoAKACgAAKAgAAoIAAAAPOKNCCgIKAgoCAAIoIgoCCoAAAigIoAAKACKCgAKKigAKAAoAKACgiggoACgACiIoAAoIKIIKA84o0IKAgoCCoAAIIoCCgIAAAAAAAoAIAoqooIAACgKAoAKACgAAKCAoAAoAAgCgAAAAAA4CiiCgIKAgAgAAigIKgAAAAgAKAKAAAKCCiKAAKAoACgAoACgAqKgAoAACgIAAAoIKAAA4CiiCoAAIAAAAgqAAAACIKAgoAAqiKAAAAqKAACgAAooAAoAKACoAACooAAgCgAAAAAA4gKAAgigIKAgoCAAAAgoIgqAAACiqgoCKCAAKKigAAKAoCgAAoACggAoAAAoIAAAAAAAA4iiogqAAAAAAAIoCCgIAIAAAAAKoAACoIoCgACgACgACigACoAACgACgACAAAKCKAAAOICoAAAAIoCCgIKgAAAAiCgIKCiKKIKAAIAAooAAAKAAKKAAKCAqKAAAqKIAAAAKAAAAAOIoogqCAAAAAAAAIKAgAAAAAACgAgAACgoAAqKAAAoCgKAAgoAAAKAACiAAAAAAAAOQCgAAigiAAAAAAAAAAIoCAAAAKAAAAAoCgAAAooAAqKAAgoACooAACoogAAAAAAADkAoAAAAAAgqCAAAAAAAACKAigAAAAKAAKAAACoooAAoAKioAAKAAAAqKIAAAAAIAAOQDQAAAAAAAAgqCAAAAAAAAAAoAAAACgAAACiooAKAAgKigAAoAAACoogAAAAAAAg5ANAAAAAAAAAAAioAAAAIACgAAAAACooAAoACgAKigAICooAAKAAAAqKIAAAAAAAA5AKAAAAAAAAAAIAAAAAAAAAAAAAACigACooAAACCgAKigAAoAAACooAAACIAKAAOQCqAAAAACAAAACKAgAAAAAAAAAAAooAAAKgCgICooAAAAKACiKAAAACgAACACAADkA0oAAAAAAAACAqAAAAAAAAAAAAACiKAAAAgoiigAKAIKigAAKigAAAAoigAAACACDkA0oAAAAAAAAAAioAAAAAAAAAAAAACigAACAqAKACiKAqAKAIAAoAACAqCigIgAAADkA00AAAAACAACAKACAAAAoAAAAAAAAAgoigAAKigAAKgCgAoigACKIoACAAAqAKIogADkA00AAAAAAAgKgAAAAAAIAAAAAAAAAAAAKIoAAKAAACiKAACiKIKgCgIAAAAAAAAOYDSgACKAgAAAAAAAAAAACAgACgKAAAAAAAqKAAAqKIAAKgCgAKggoAgqAKIoAAAAAAOYgrSiAKgAAAAAAAAACAAAAAAAAAAAKIAoACoAoAAAKIoACIoigAAoiiAAAAKIAoAAAOQCtAAAAAAAAAgAAAAAAAAAAAAAAAqAKAAAAqAKAgKgCgCCoAoACoAoAgAAAAAAADmArQAAAACAogAAKAAAAAAAAAAAAAAAAAAoAACIoigAAoigACKIoAACoogAAAAAAADkArYAAAAAAAAAAAAAACAogCiAKIAogCgAAICoAoAAAigAKgCgCCoAoAAAgqAKAAAAADkArYAAAAAAAACAogAAKAAAAAAAAAICoAoAgAAqAKAAqAigAKgCgCCoAoAgAAAAAAADmAroAAAAAAgqAAAAAAAAAAAAAAAAIAAAAKAIAAoigAAKiiAACoogAAqAKAIAAAAAA5iCuiiAKIAqAAAAAAAAAAAAIAAIoAIogCgAAAKgCgAKgIoAAAigAACKAAACiKICAKAAADkAroAAAAAAAAAAACggAAAAAAgAAAAAAoiiAACooAAgqAKAAqKIACKIoAAAAgAAAAADmAroAAACgAAICiAAAAAACAAAAAAAAAAAqAKAIAAoigACKIoAAigAACCooAAAAgAAADmArqAACAKgAAAAAAAAAAIAAAAAAAAAAAACoogAAACgCCooAAiiKAAIAAoAgAAAAADkArqAAAAAAAAAAAAAACAoAgAAKgCiAKIogAAACgCAAKIqIAKKAIAAoAgAAqKAAIAAAA5AK6gAAAAAAAAAAIKAAAIAAAAAAAAAAigAAAoioAAgqKAAIoCoAAKiiAACoAoAAAgADkArqAAAAAAAAACiAgAAAAAAAAAAAAAAKiiAACoqAAIKgCgCKIogAoKiiAAAAKAACCKIA5gK6gAAAAAAAAIKAIAAAAAAAAAAAAAACoCKAAqCCgCAAKAIKiiAACoqoAAAAKgIAAAA5gK6gAAAAAAAoioAAAAgAAAAAAAAAAAAACKAAAgoAgACgCCoogAAqCooAAAAAgAAAD//2Q==";

  return (
    <div>
      <Link href="/tours" className="btn btn-secondary btn-sm text-neutral-content mb-12 ">
      &#8678; Back
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
