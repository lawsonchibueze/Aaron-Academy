"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  ShieldCheck,
} from "lucide-react";
import { apiRequest } from "../lib/api-client";

export default function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    try {
      await apiRequest("/registrations", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      setSubmitted(true);
      formElement.reset();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to submit registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-layout">
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="registration-form__heading">
          <p className="eyebrow">Player information</p>
          <h2>Register your player</h2>
          <p>
            Complete the form below to begin the Aaron&apos;s Soccer Academy
            registration process.
          </p>
        </div>

        <div className="registration-form__grid">
          <label>
            Full Name
            <input name="fullName" required placeholder="Player's full name" />
          </label>
          <label>
            Date of Birth
            <input name="dateOfBirth" required type="date" />
          </label>
          <label>
            Age
            <select name="age" required defaultValue="">
              <option value="" disabled>
                Select age
              </option>
              <option>6–9 years</option>
              <option>10–13 years</option>
              <option>14–16 years</option>
            </select>
          </label>
          <label>
            Gender
            <select name="gender" required defaultValue="">
              <option value="" disabled>
                Select gender
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </label>
          <label>
            Category
            <select name="category" required defaultValue="">
              <option value="" disabled>
                Select category
              </option>
              <option>Category A</option>
              <option>Category B</option>
              <option>Category C</option>
            </select>
          </label>
          <label>
            Player Phone
            <input name="playerPhone" type="tel" placeholder="Phone number" />
          </label>
          <label className="registration-form__field--wide">
            Parent / Guardian Name
            <input
              name="parentName"
              required
              placeholder="Parent or guardian full name"
            />
          </label>
          <label>
            Parent Phone
            <input
              name="parentPhone"
              required
              type="tel"
              placeholder="Parent phone number"
            />
          </label>
          <label>
            Occupation
            <input name="occupation" required placeholder="Parent/guardian occupation" />
          </label>
          <label className="registration-form__field--wide">
            Contact Address
            <textarea
              name="address"
              required
              rows={2}
              placeholder="Residential address"
            />
          </label>
          <label className="registration-form__field--wide">
            Health Status / Medical Notes
            <textarea
              name="healthStatus"
              required
              rows={3}
              placeholder="Share any relevant health information"
            />
          </label>
          <label className="registration-form__field--wide">
            Indemnity declaration name
            <input name="indemnityName" required placeholder="Parent or guardian name" />
          </label>
          <label className="registration-form__field--wide">
            Attestation declaration name
            <input name="attestationName" required placeholder="Parent or guardian name" />
          </label>
          <label>
            Signature
            <input name="signature" required placeholder="Type full name as signature" />
          </label>
          <label>
            Signature date
            <input name="signatureDate" required type="date" />
          </label>
        </div>

        <label className="registration-form__check">
          <input name="indemnityAccepted" type="checkbox" value="true" required />
          <span>
            I/we confirm the health status declaration and understand that the
            academy is not responsible for death, injury, or disability suffered
            directly or indirectly during training or on the field of play.
          </span>
        </label>
        <label className="registration-form__check">
          <input name="attestationAccepted" type="checkbox" value="true" required />
          <span>
            I/we attest to the good behaviour of the child and agree to take
            responsibility for fines, punishment, or penalties and obey the
            academy rules and regulations.
          </span>
        </label>

        {submitted && (
          <p className="registration-form__success">
            <CheckCircle2 size={18} /> Registration details ready for review.
          </p>
        )}
        {error && <p role="alert">{error}</p>}
        <button className="registration-form__submit" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Registration"} <ArrowRight size={17} />
        </button>
      </form>

      <aside className="registration-side">
        <div className="registration-side__content">
          <p className="eyebrow">What happens next?</p>
          <div className="registration-step">
            <ClipboardCheck />
            <div>
              <h3>Submit your form</h3>
              <p>Complete the player and parent information carefully.</p>
            </div>
          </div>
          <div className="registration-step">
            <ShieldCheck />
            <div>
              <h3>Confirmation</h3>
              <p>Our team will review the details and contact you.</p>
            </div>
          </div>
          <div className="registration-step">
            <ShieldCheck />
            <div>
              <h3>Welcome to Aaron&apos;s Soccer Academy</h3>
              <p>Our team will review the completed declaration and onboarding details.</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
