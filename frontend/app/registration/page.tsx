import Navbar from "../../components/navbar";
import RegistrationForm from "../../components/registration-form";
import SiteFooter from "../../components/site-footer";

export default function RegistrationPage() {
  return (
    <>
      <Navbar />
      <main className="registration-page">
        <section className="registration-hero">
          <div>
            <p className="eyebrow">Join Aaron&apos;s Soccer Academy</p>
            <h1>Registration form</h1>
            <p>
              Start your player&apos;s journey with Aaron&apos;s Soccer Academy.
            </p>
          </div>
        </section>
        <RegistrationForm />
      </main>
      <SiteFooter />
    </>
  );
}
