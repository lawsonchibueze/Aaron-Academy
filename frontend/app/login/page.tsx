"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { getSession, signIn, signOut } from "../../lib/auth-client";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (searchParams.get("registered") === "1") toast.success("Account created. You can now log in.");
    if (error === "not-admin") toast.error("You are not an admin.");
    if (error === "auth-required") toast.error("Please log in to continue.");
    if (error || searchParams.get("registered")) router.replace("/login");
  }, [searchParams]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(event.currentTarget);

    try {
      const session = await signIn(String(form.get("email")), String(form.get("password")));
      if (session?.user?.role !== "ADMIN") {
        await signOut();
        toast.error("You are not an admin.");
        return;
      }
      toast.success("Logged in successfully.");
      router.push("/admin");
      router.refresh();
    } catch (submissionError) {
      const message = submissionError instanceof Error ? submissionError.message : "Unable to log in";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-page__card" aria-labelledby="login-title">
        <div className="login-page__form-wrap">
          <Link className="login-page__back" href="/">
            ← Back to Home
          </Link>
          <p className="login-page__eyebrow">Aaron&apos;s Soccer Academy</p>
          <h2 id="login-title">Log in to your account</h2>
          <p className="login-page__intro">
            Access and manage the registration responeses 
          </p>
          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </label>
            <label>
              Password
              <div className="login-form__password">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>
            <div className="login-form__options">
              <label className="login-form__remember">
                <input type="checkbox" name="remember" /> Remember me
              </label>
              <Link href="/contact">Forgot password?</Link>
            </div>
            {error && <p role="alert">{error}</p>}
            <button className="login-form__submit" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
          <p className="login-page__signup">
            Need an account? <Link href="/register">Create one</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
