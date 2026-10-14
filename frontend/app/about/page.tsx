import Image from "next/image";
import { Eye, Star, Target } from "lucide-react";

import Navbar from "../../components/navbar";
import SiteFooter from "../../components/site-footer";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To develop well-rounded young people through quality football education and life skills, preparing them for a brighter future on and off the pitch.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "To be a leading youth football academy in Nigeria, producing disciplined, skilled and responsible individuals who make a positive impact in their communities and beyond.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="about-page">
        <section
          className="about-page__hero"
          aria-labelledby="about-page-title"
        >
          <Image
            src="/about-page/about-hero.jpg"
            alt="Aaron's Soccer Academy players training together"
            fill
            priority
            sizes="100vw"
          />
          <div className="about-page__hero-overlay" />
          <div className="about-page__hero-content">
            <p className="about-page__eyebrow">
              About Aaron&apos;s Soccer Academy
            </p>
            <h1 id="about-page-title">Our mission, vision &amp; values</h1>
            <span className="about-page__accent" />
          </div>
        </section>

        <section
          className="about-page__values"
          aria-label="Our mission, vision and values"
        >
          <div className="about-page__image about-page__image--values">
            <Image
              src="/about-page/about-mission.jpg"
              alt="Coach guiding a young Aaron's Soccer Academy player"
              fill
              sizes="(max-width: 800px) 100vw, 52vw"
            />
          </div>
          <div className="about-page__values-content">
            {values.map(({ icon: Icon, title, text }) => (
              <article className="about-value" key={title}>
                <Icon
                  aria-hidden="true"
                  className="about-value__icon"
                  size={42}
                  strokeWidth={1.8}
                />
                <div>
                  <h2>{title}</h2>
                  <p>{text}</p>
                </div>
              </article>
            ))}
            <article className="about-value">
              <Star
                aria-hidden="true"
                className="about-value__icon"
                size={42}
                strokeWidth={1.8}
              />
              <div>
                <h2>Our Values</h2>
                <ul>
                  <li>Discipline</li>
                  <li>Respect</li>
                  <li>Teamwork</li>
                  <li>Excellence</li>
                  <li>Integrity</li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section
          className="about-page__story"
          aria-labelledby="about-story-title"
        >
          <div className="about-page__story-content">
            <p className="about-page__eyebrow">Our story</p>
            <h2 id="about-story-title">The Aaron&apos;s journey</h2>
            <p>
              Aaron&apos;s Soccer Academy was founded under the Aaron&apos;s
              Development Foundation with the belief that football can do more
              than create athletes it can build character, confidence and
              opportunity for young people.
            </p>
            <p>
              Since our inception, we have been committed to providing
              high-quality coaching, education and mentorship for children and
              teenagers, helping them grow into disciplined, skilled and
              responsible individuals.
            </p>
          </div>
          <div className="about-page__image about-page__image--story">
            <Image
              src="/about-page/about-journey.jpg"
              alt="Aaron's Soccer Academy players standing together on the pitch"
              fill
              sizes="(max-width: 800px) 100vw, 52vw"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
