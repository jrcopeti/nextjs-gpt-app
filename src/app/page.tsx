import Hero from "@/components/Hero";
import imageHero from "/public/homepage-hero.jpg";

function Homepage() {
  return (
    <div>
      <Hero
        imgData={imageHero}
        imgAlt="hero-image"
        title="GPT APP"
        blurDataUrl="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhomepage-hero.e6fc286a.jpg&w=8&q=70"
      />
    </div>
  );
}

export default Homepage;
