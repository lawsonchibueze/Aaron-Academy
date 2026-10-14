"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { signUp } from "../../lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(event.currentTarget);

    try {
      await signUp(String(form.get("name")), String(form.get("email")), String(form.get("password")));
      toast.success("Account created successfully.");
      router.push("/login?registered=1");
      router.refresh();
    } catch (submissionError) {
      const message = submissionError instanceof Error ? submissionError.message : "Unable to create account";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-page__card" aria-labelledby="register-title">
        <div className="login-page__form-wrap">
          <Link className="login-page__back" href="/login">← Back to login</Link>
          <p className="login-page__eyebrow">Aaron&apos;s Soccer Academy</p>
          <h2 id="register-title">Create an account</h2>
          <p className="login-page__intro">New accounts are regular users until manually promoted in the database.</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <label>Name<input name="name" required autoComplete="name" /></label>
            <label>Email address<input name="email" type="email" required autoComplete="email" /></label>
            <label>Password<input name="password" type="password" required minLength={8} autoComplete="new-password" /></label>
            {error && <p role="alert">{error}</p>}
            <button className="login-form__submit" type="submit" disabled={loading}>{loading ? "Creating account..." : "Create account"}</button>
          </form>
        </div>
      </section>
    </main>
  );
}
