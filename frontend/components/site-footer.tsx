import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Play } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <div className="site-footer__brand">
          <Image
            src="/asa-logo.jpeg"
            alt="Aaron's Soccer Academy crest"
            width={66}
            height={66}
          />
          <div>
            <strong>AARON&apos;S</strong>
            <span>FOOTBALL ACADEMY</span>
            <p>Football. Character. Opportunity.</p>
          </div>
        </div>

        <div className="site-footer__column">
          <h3>Quick Links</h3>
          <Link href="/">Home</Link>
          <Link href="/about">About Aaron&apos;s Soccer Academy</Link>
          <Link href="/sponsorship">Sponsorship</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/login">Login</Link>
        </div>

        <div className="site-footer__column site-footer__contact">
          <h3>Contact Us</h3>
          <a href="mailto:aaronsdevelopmentfoundation@gmail.com">
            <Mail size={17} />
            aaronsdevelopmentfoundation@gmail.com
          </a>
          <p>
            <MapPin size={17} />
            17th Ibusa Avenue
          </p>
        </div>

        <div className="site-footer__column site-footer__social">
          <h3>Follow Us</h3>
          <a
            href="https://youtube.com/@aaronssocceracademy?si=qsip24Ng_GZNujGW"
            target="_blank"
            rel="noreferrer"
            aria-label="Follow Aaron's Soccer Academy on YouTube"
          >
            <Play size={22} />
            YouTube
          </a>
        </div>
      </div>
      <div className="site-footer__bottom">
        © Aaron&apos;s Soccer Academy. All rights reserved.
      </div>
    </footer>
  );
}
