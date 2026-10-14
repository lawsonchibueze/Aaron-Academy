"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  { image: "/hero/slide-1.jpg", alt: "Young player completing a football drill" },
  { image: "/hero/slide-2.jpg", alt: "Young player training on the academy pitch" },
  { image: "/hero/slide-3.jpg", alt: "Coach guiding a young football player" },
  { image: "/hero/slide-4.jpg", alt: "Young player running during football training" },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(interval);
  }, []);

  const showPrevious = () =>
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  const showNext = () =>
    setActiveSlide((current) => (current + 1) % slides.length);

  return (
    <section className="hero" aria-label="Aaron's Soccer Academy">
      <div className="hero__slides">
        {slides.map((slide, index) => (
          <Image
            key={slide.image}
            className={`hero__slide ${index === activeSlide ? "hero__slide--active" : ""}`}
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
          />
        ))}
      </div>
      <div className="hero__overlay" />
      <div className="hero__content">
        <p className="eyebrow">Aarons Football Academy</p>
        <h1>
          <span>Building</span>
          <span>Tomorrow&apos;s</span>
          <span className="hero__title-accent">Football Stars</span>
        </h1>
        <p className="hero__copy">
          Football skills. Character. Discipline. Opportunity.
        </p>
        <div className="hero__details">
          <span>
            <Users size={17} /> Ages 6–16
          </span>
          <span>
            <MapPin size={17} /> Enugu, Nigeria
          </span>
        </div>
        <div className="hero__actions">
          <Link className="hero__button" href="/registration">
            Register a Player <ArrowRight size={17} />
          </Link>
        </div>
      </div>
      <div className="hero__controls" aria-label="Hero slideshow controls">
        <button type="button" onClick={showPrevious} aria-label="Previous slide">
          <ChevronLeft size={20} />
        </button>
        <div className="hero__dots">
          {slides.map((slide, index) => (
            <button
              key={slide.image}
              className={index === activeSlide ? "hero__dot hero__dot--active" : "hero__dot"}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeSlide ? "true" : undefined}
            />
          ))}
        </div>
        <button type="button" onClick={showNext} aria-label="Next slide">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
