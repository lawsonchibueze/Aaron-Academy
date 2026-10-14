import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

const categories = [
  {
    name: "Category A",
    age: "Ages 6 – 9",
    description:
      "Building the foundation through fun, basic skills and a love for the game.",
    image: "/categories/category-1.jpg",
    alt: "Young Aaron's Soccer Academy players standing together on the pitch",
  },
  {
    name: "Category B",
    age: "Ages 10 – 13",
    description: "Developing skills, confidence and game intelligence.",
    image: "/categories/category-2.jpg",
    alt: "Young football players training on the pitch",
  },
  {
    name: "Category C",
    age: "Ages 14 – 16",
    description:
      "Advanced training, competitive matches and preparation for higher opportunities.",
    image: "/categories/category-3.jpg",
    alt: "Older Aaron's Soccer Academy player during football training",
  },
];

export default function PlayerCategories() {
  return (
    <section
      className="player-categories"
      aria-labelledby="player-categories-title"
    >
      <div className="player-categories__heading">
        <div>
          <p className="eyebrow">Our Players</p>
          <h2 id="player-categories-title">
            Meet the Aaron&apos;s Soccer Academy family
          </h2>
        </div>
        <p className="player-categories__intro">
          We train players between 6 and 16 years, grouped into three categories
          to ensure the right coaching, development and game experience.
        </p>
      </div>

      <div className="player-categories__grid">
        {categories.map((category) => (
          <article className="player-category" key={category.name}>
            <div className="player-category__image">
              <Image
                src={category.image}
                alt={category.alt}
                fill
                sizes="(max-width: 800px) 100vw, 33vw"
              />
            </div>
            <div className="player-category__body">
              <Users
                size={17}
                className="player-category__icon"
                aria-hidden="true"
              />
              <p className="player-category__name">{category.name}</p>
              <h3>{category.age}</h3>
              <p className="player-category__description">
                {category.description}
              </p>
              <Link
                href="/registration"
                className="player-category__link"
                aria-label={`Learn more about ${category.name}`}
              >
                <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
