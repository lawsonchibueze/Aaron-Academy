"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { getSession, type AuthSession } from "../lib/auth-client";

const aboutLinks = [
  { label: "About Us", href: "/about" },
  { label: "Rules", href: "/about/rules" },
  { label: "How Aaron's Soccer Academy is run", href: "/about/how-afa-is-run" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(null);
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const savedTheme = window.localStorage.getItem("theme");
    return savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    document.documentElement.classList.toggle("dark", isDark);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDark]);

  useEffect(() => {
    getSession().then(setSession).catch(() => setSession(null));
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        aboutRef.current &&
        !aboutRef.current.contains(event.target as Node)
      ) {
        setIsAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme);
    window.localStorage.setItem("theme", nextTheme ? "dark" : "light");
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setIsAboutOpen(false);
  };

  const handleAboutLinkClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia("(max-width: 800px)").matches) {
      event.preventDefault();
      setIsAboutOpen((open) => !open);
      return;
    }
    closeMobileMenu();
  };

  return (
    <header
      className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}
    >
      <nav className="navbar" aria-label="Primary navigation">
        <Link className="brand" href="/" onClick={closeMobileMenu}>
          <Image
            src="/asa-logo.jpeg"
            alt="Aaron's Soccer Academy crest"
            width={56}
            height={56}
            priority
            className="brand__logo"
          />
          <span className="brand__name">
            <strong>AARON&apos;S</strong>
            <span>SOCCER ACADEMY</span>
          </span>
        </Link>

        <div className={`nav-content ${isMenuOpen ? "nav-content--open" : ""}`}>
          <button
            className="mobile-theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            {isDark ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <div className="nav-links">
            <Link
              className={`nav-link ${pathname === "/" ? "nav-link--active" : ""}`}
              href="/"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <div
              className="nav-dropdown"
              ref={aboutRef}
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <div className="nav-about-trigger">
                <Link
                  className={`nav-link ${pathname.startsWith("/about") ? "nav-link--active" : ""}`}
                  href="/about"
                  onClick={handleAboutLinkClick}
                >
                  About Us
                </Link>
                <button
                  className="nav-about-toggle"
                  type="button"
                  aria-label={`${isAboutOpen ? "Close" : "Open"} About Us submenu`}
                  aria-expanded={isAboutOpen}
                  onClick={() => setIsAboutOpen((open) => !open)}
                >
                  <ChevronDown
                    size={15}
                    aria-hidden="true"
                    className={isAboutOpen ? "rotate-180" : ""}
                  />
                </button>
              </div>
              <div
                className={`dropdown-menu ${isAboutOpen ? "dropdown-menu--open" : ""}`}
              >
                {aboutLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              className={`nav-link ${pathname.startsWith("/sponsorship") ? "nav-link--active" : ""}`}
              href="/sponsorship"
              onClick={closeMobileMenu}
            >
              Sponsorship
            </Link>
            <Link
              className={`nav-link ${pathname.startsWith("/contact") ? "nav-link--active" : ""}`}
              href="/contact"
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
          </div>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link
              className="dashboard-button"
              href="/admin"
              onClick={closeMobileMenu}
              style={{ display: session ? undefined : "none" }}
            >
              Back to Dashboard
            </Link>
            <Link
              className="register-button"
              href="/registration"
              onClick={closeMobileMenu}
            >
              Register Now <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <button
          className="menu-toggle"
          type="button"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>
    </header>
  );
}
