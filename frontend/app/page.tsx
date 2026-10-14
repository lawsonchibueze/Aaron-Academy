import Navbar from "../components/navbar";
import Hero from "../components/hero";
import WhyAfa from "../components/why-afa";
import PlayerCategories from "../components/player-categories";
import AboutAfa from "../components/about-afa";
import TrainingVideo from "../components/training-video";
import SiteFooter from "../components/site-footer";
import SponsorBanner from "../components/sponsor-banner";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyAfa />
      <PlayerCategories />
      <AboutAfa />
      <TrainingVideo />
      <SponsorBanner />
      <SiteFooter />
    </>
  );
}
