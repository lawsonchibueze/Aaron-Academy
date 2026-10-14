import Navbar from "../../components/navbar";
import SiteFooter from "../../components/site-footer";

export default function SponsorshipPage() {
  return (
    <>
      <Navbar />
      <main className="sponsorship-page sponsorship-page--coming-soon">
        <section className="coming-soon" aria-labelledby="coming-soon-title">
          <p className="eyebrow">Sponsorship</p>
          <h1 id="coming-soon-title">Coming soon</h1>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
