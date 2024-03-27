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
        subtitle= "Explore the world with the help of AI"
        linkText= "Get Started"
      />
    </div>
  );
}

export default Homepage;
