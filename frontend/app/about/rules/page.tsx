import Image from "next/image";
import Link from "next/link";
import Navbar from "../../../components/navbar";
import SiteFooter from "../../../components/site-footer";

const ruleGroups = [
  {
    title: "General Rules",
    items: [
      "All players must register and provide valid information.",
      "Attendance is compulsory for all scheduled training and matches.",
      "Players must arrive on time and in proper kit.",
      "Respect coaches, teammates, referees and opponents at all times.",
      "Use of abusive language, fighting or bullying is strictly prohibited.",
    ],
  },
  {
    title: "Players’ Conduct",
    items: [
      "Maintain discipline on and off the pitch.",
      "Follow instructions from coaches and staff.",
      "No use of drugs, alcohol or tobacco.",
      "Represent Aaron’s Soccer Academy with pride and good character.",
    ],
  },
  {
    title: "Punctuality",
    items: [
      "Training sessions start at the scheduled time.",
      "Late arrivals may result in reduced playing time or disciplinary action.",
    ],
  },
  {
    title: "Equipment & Safety",
    items: [
      "Players must wear the official kit or approved training gear.",
      "Bring appropriate footwear, shin guards and water bottle.",
      "No jewellery or dangerous items during training or matches.",
    ],
  },
  {
    title: "Discipline & Sanctions",
    items: [
      "Minor offences may result in a warning.",
      "Repeated offences may lead to suspension or removal from the academy.",
      "Serious misconduct will be handled by the management committee.",
    ],
  },
  {
    title: "Parent / Guardian Responsibilities",
    items: [
      "Ensure your child attends training and matches.",
      "Support the academy’s values and rules.",
      "Communicate with coaches and staff when needed.",
    ],
  },
];

export default function RulesPage() {
  return (
    <>
      <Navbar />
      <main className="about-subpage">
        <section className="about-subpage__hero">
          <Image
            src="/about-page/rules-hero.jpg"
            alt="Training equipment on the Aaron's Soccer Academy pitch"
            fill
            priority
            sizes="100vw"
          />
          <div className="about-subpage__hero-overlay" />
          <div className="about-subpage__hero-content">
            <p>Rules &amp; regulations</p>
            <h1>Play fair. Play safe.</h1>
            <span>
              Our rules ensure a positive, safe and disciplined environment for
              all players, coaches and staff.
            </span>
          </div>
        </section>
        <section className="rules-grid" aria-label="Academy rules">
          {ruleGroups.map((group, index) => (
            <article className="rules-card" key={group.title}>
              <h2>
                <span>{index + 1}.</span> {group.title}
              </h2>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
        <div className="about-subpage__back">
          <Link href="/about">← Back to About Us</Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
