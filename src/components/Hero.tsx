import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import grid from "/public/grid.png";

interface HeroProps {
  imgData: StaticImageData;
  imgAlt: string;
  title: string;
  blurDataUrl: string;
}

export default function Hero(props: HeroProps) {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 -z-10">
        <Image
          src={props.imgData}
          alt={props.imgAlt}
          fill
          style={{ objectFit: "cover" }}
          blurDataURL={props.blurDataUrl}
          placeholder="blur"
        />

        <div className="absolute inset-0 ">
          <Image src={grid} alt="Grid" fill className="object-cover opacity-80" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-700/30"></div>
      </div>

      <section className="z-0 flex flex-col items-center justify-center lg:p-4">
        <div className="flex max-w-[90%] flex-col items-center justify-center gap-4 pt-[20rem] text-center md:pt-[18rem] lg:pt-[25rem] xl:pt-[25rem]  ">
          <h1 className=" inline-block bg-gradient-to-r from-slate-600 via-slate-500 to-slate-400 bg-clip-text text-7xl font-extrabold text-transparent lg:text-9xl">
            {props.title}
          </h1>
          <p className="rounded-lg p-2 text-xl font-bold text-slate-600 lg:text-2xl">
            Explore the power of AI in your next trip
          </p>
          <Link
            href="/chat"
            className="btn glass btn-outline rounded-lg bg-gradient-to-r from-primary to-secondary text-3xl hover:text-slate-600"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
