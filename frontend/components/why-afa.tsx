import { CircleDot, Trophy, UsersRound } from "lucide-react";

const benefits = [
  {
    icon: CircleDot,
    title: "Football Development",
    description:
      "Structured coaching and training programmes designed for each age group to help players reach their full potential.",
  },
  {
    icon: UsersRound,
    title: "Character & Teamwork",
    description:
      "We instil discipline, leadership, respect and teamwork that go beyond football.",
  },
  {
    icon: Trophy,
    title: "Competitive Opportunities",
    description:
      "Training, internal matches and external competitions to give players real game experience.",
  },
];

export default function WhyAfa() {
  return (
    <section className="why-afa" aria-labelledby="why-afa-title">
      <div className="why-afa__heading">
        <p className="eyebrow">Why Aaron Soccer Academy</p>
        <h2 id="why-afa-title">A place to grow, on and off the pitch</h2>
      </div>
      <div className="why-afa__cards">
        {benefits.map(({ icon: Icon, title, description }) => (
          <article className="benefit-card" key={title}>
            <Icon
              className="benefit-card__icon"
              size={43}
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
