import Hero from "@/components/Hero";
import imageHero from "/public/homepage-hero.jpg";


function Homepage() {
  return (
    <div>
      <Hero
        imgData={imageHero}
        imgAlt="hero-image"
        title="GPT APP"
        path = "public/homepage-hero.jpg"
        subtitle= "A Chat-GPT like app with a tour guide"
        linkText= "Get Started"
      />
    </div>
  );
}

export default Homepage;
