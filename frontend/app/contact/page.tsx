"use client";

import Image from "next/image";
import { Clock3, Mail, MapPin, Phone, Send } from "lucide-react";
import { FormEvent, useState } from "react";

import Navbar from "../../components/navbar";
import SiteFooter from "../../components/site-footer";
import { apiRequest } from "../../lib/api-client";

const whatsappNumber = "2348137906587";

export default function ContactPage() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setLoading(true);
    setStatus("");
    try {
      await apiRequest("/contacts", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      setStatus("Your message was saved. WhatsApp is opening now.");
    } catch {
      setStatus("We could not save the message, but WhatsApp will still open.");
    } finally {
      setLoading(false);
    }
    const text = `Hello Aaron's Soccer Academy, my name is ${form.get("name")}. ${message}`;
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <>
      <Navbar />
      <main className="contact-page">
        <section className="contact-page__hero">
          <Image
            src="/contact-page/contact-hero.jpg"
            alt="Player training at Aaron's Soccer Academy"
            fill
            priority
            sizes="100vw"
          />
          <div className="contact-page__hero-overlay" />
          <div className="contact-page__hero-content">
            <p>Contact us</p>
            <h1>Get in touch</h1>
            <span>
              We&apos;d love to hear from you. Reach out for enquiries,
              partnerships or more information about Aaron&apos;s Soccer
              Academy.
            </span>
          </div>
        </section>

        <section className="contact-page__content">
          <article className="contact-info-card">
            <p className="contact-page__eyebrow">Contact information</p>
            <h2>We&apos;re here to help</h2>
            <div className="contact-detail">
              <MapPin />
              <div>
                <strong>Address</strong>
                <span>17th Ibusa Avenue, Independence Layout, Enugu</span>
              </div>
            </div>
            <div className="contact-detail">
              <Phone />
              <div>
                <strong>Phone</strong>
                <a href={`tel:+${whatsappNumber}`}>+234 813 790 6587</a>
              </div>
            </div>
            <div className="contact-detail">
              <Mail />
              <div>
                <strong>Email</strong>
                <a href="mailto:aaronsdevelopmentfoundation@gmail.com">
                  aaronsdevelopmentfoundation@gmail.com
                </a>
              </div>
            </div>
            <div className="contact-detail">
              <Clock3 />
              <div>
                <strong>Opening hours</strong>
                <span>Monday – Saturday, 8:00 AM – 5:00 PM</span>
              </div>
            </div>
          </article>

          <article className="contact-form-card">
            <p className="contact-page__eyebrow">Send us a message</p>
            <h2>Let&apos;s start a conversation</h2>
            <form onSubmit={sendMessage}>
              <div className="contact-form__row">
                <label>
                  Name
                  <input name="name" required placeholder="Your name" />
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <label>
                Subject
                <input name="subject" required placeholder="How can we help?" />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  required
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Write your message here..."
                  rows={5}
                />
              </label>
              <button type="submit">
                {loading ? "Saving..." : "Send Message"} <Send size={16} aria-hidden="true" />
              </button>
              {status && <p role="status">{status}</p>}
            </form>
          </article>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
