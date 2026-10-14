import Image from "next/image";

export default function SponsorBanner() {
  return (
    <section className="sponsor-section" aria-labelledby="sponsor-title">
      <div className="sponsor-banner">
        <div className="sponsor-banner__image">
          <Image
            src="/sponsorship/support-next-generation.png"
            alt="Aaron's Soccer Academy players standing together on the pitch"
            fill
            sizes="(max-width: 800px) 100vw, 35vw"
          />
        </div>
        <div className="sponsor-banner__content">
          <p className="eyebrow">Sponsorship</p>
          <h2 id="sponsor-title">Support the next generation</h2>
          <p>
            Partner with Aaron&apos;s Soccer Academy and help provide better
            training, facilities and opportunities for young talents in Enugu
            and beyond.
          </p>
        </div>
      </div>
    </section>
  );
}
