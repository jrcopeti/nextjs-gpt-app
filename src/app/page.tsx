// import Link from "next/link";
// const url =
//   "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

import Hero from "@/components/Hero"
import imageHero from "/public/homepage-hero.jpg"
console.log(imageHero)

// function HomePage() {
//   return (
//     <div
//       className="hero min-h-screen"
//       style={{
//         backgroundImage: `url(${url})`,
//       }}
//     >
//       <div className="hero-overlay "></div>
//       <div className="hero-content text-center text-neutral-content">
//         <div className="max-w-md p-6 rounded-lg shadow-lg">
//           <h1 className="mb-5 text-9xl font-bold">GPT App</h1>
//           <p className="mb-5 text-xl font-bold">
//             Explore the power of AI in your next trip
//           </p>
//           <Link href="/chat" className=" btn btn-neutral text-3xl text-neutral-content rounded-lg">
//             Get Started
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;



function Homepage() {
  return (
    <div>
      <Hero imgData={imageHero} imgAlt="hero-image" title="GPT APP" blurDataUrl="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhomepage-hero.e6fc286a.jpg&w=8&q=70"/>

    </div>
  )
}

export default Homepage
