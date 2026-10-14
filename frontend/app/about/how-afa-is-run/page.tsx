import Image from "next/image";
import Link from "next/link";
import {
  BriefcaseBusiness,
  ClipboardList,
  HeartPulse,
  ShieldCheck,
  Trophy,
  UsersRound,
} from "lucide-react";

import Navbar from "../../../components/navbar";
import SiteFooter from "../../../components/site-footer";

const departments = [
  {
    title: "Business & Administration",
    items: [
      "Director of Administration",
      "Finance Department",
      "Marketing & Communication",
    ],
    icons: [BriefcaseBusiness, ClipboardList, UsersRound],
  },
  {
    title: "Football & Sporting Operations",
    items: ["Sporting Director", "Head Coach", "Coaching Staff"],
    icons: [Trophy, UsersRound, ShieldCheck],
  },
  {
    title: "Medical & Player Welfare",
    items: ["Team Doctor", "Physiotherapist", "Safeguarding & Protection"],
    icons: [HeartPulse, ShieldCheck, UsersRound],
  },
];

export default function HowAfaIsRunPage() {
  return (
    <>
      <Navbar />
      <main className="about-subpage">
        <section className="about-subpage__hero about-subpage__hero--structure">
          <Image
            src="/about-page/how-afa-hero.jpg"
            alt="Aaron's Soccer Academy coach on the pitch"
            fill
            priority
            sizes="100vw"
          />
          <div className="about-subpage__hero-overlay" />
          <div className="about-subpage__hero-content">
            <p>Organisational structure</p>
            <h1>How Aaron&apos;s Soccer Academy is run</h1>
            <span>
              A strong structure ensures smooth operations, proper guidance and
              consistent growth.
            </span>
          </div>
        </section>
        <section
          className="structure-page"
          aria-label="Aaron's Soccer Academy organisational structure"
        >
          <div className="structure-lead">
            <UsersRound aria-hidden="true" />
            <div>
              <h2>Executive &amp; Leadership</h2>
              <strong>President</strong>
              <p>Provides strategic direction and final decisions.</p>
            </div>
          </div>
          {departments.map((department) => (
            <section className="department" key={department.title}>
              <h2>{department.title}</h2>
              <div className="department-grid">
                {department.items.map((item, index) => {
                  const Icon = department.icons[index];
                  return (
                    <article className="department-card" key={item}>
                      <Icon aria-hidden="true" />
                      <h3>{item}</h3>
                      <p>
                        Supports the academy’s development, standards and player
                        experience.
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>
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
