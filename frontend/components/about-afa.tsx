import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutAfa() {
  return (
    <section className="about-afa" aria-labelledby="about-afa-title">
      <div className="about-afa__card">
        <div className="about-afa__image">
          <Image
            src="/about/about-afa.jpg"
            alt="Aaron's Soccer Academy coach working with young football players"
            fill
            sizes="(max-width: 800px) 100vw, 55vw"
          />
        </div>
        <div className="about-afa__content">
          <p className="eyebrow">About Aaron Soccer Academy</p>
          <h2 id="about-afa-title">More than just football</h2>
          <p>
            Aaron&apos;s Soccer Academy is a place where young players develop
            their football ability, confidence and character in a safe,
            supportive environment.
          </p>
          <p>
            Through quality coaching, discipline and teamwork, we help every
            player grow on the pitch and in everyday life.
          </p>
          <Link className="about-afa__button" href="/about">
            Learn More About Aaron&apos;s Soccer Academy{" "}
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
