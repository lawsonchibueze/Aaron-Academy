"use client";

import {
  ChevronRight,
  ClipboardList,
  Contact,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Moon,
  Search,
  Settings,
  ShieldCheck,
  Sun,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "../../lib/auth-client";

type View = "dashboard" | "registrations" | "contacts" | "settings";

const registrations = [
  { name: "Chukwuemeka Obi", category: "A", date: "09/10/2026", parent: "Mrs. Obi", email: "obi.parent@example.com", phone: "08123456789", status: "New" },
  { name: "Emeka Nwosu", category: "B", date: "08/10/2026", parent: "Mr. Nwosu", email: "nwosu.parent@example.com", phone: "08034567891", status: "New" },
  { name: "Daniel Okoro", category: "A", date: "07/10/2026", parent: "Mrs. Okoro", email: "okoro.parent@example.com", phone: "07045678912", status: "Reviewed" },
  { name: "David Henry", category: "C", date: "06/10/2026", parent: "Mr. Henry", email: "henry.parent@example.com", phone: "09056789123", status: "New" },
  { name: "Samuel Peter", category: "B", date: "05/10/2026", parent: "Mrs. Peter", email: "peter.parent@example.com", phone: "08167891234", status: "Reviewed" },
];

const navItems: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "registrations", label: "Registrations", icon: ClipboardList },
  { id: "contacts", label: "Contact messages", icon: Contact },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const changeView = (view: View) => {
    setActiveView(view);
    setSidebarOpen(false);
  };

  return (
    <main className="admin-dashboard">
      <button
        className="admin-dashboard__mobile-menu"
        type="button"
        onClick={() => setSidebarOpen((open) => !open)}
        aria-label={sidebarOpen ? "Close dashboard menu" : "Open dashboard menu"}
      >
        {sidebarOpen ? <X size={21} /> : <Menu size={21} />}
      </button>

      <aside className={`admin-sidebar ${sidebarOpen ? "admin-sidebar--open" : ""}`}>
        <div className="admin-sidebar__brand">
          <div className="admin-sidebar__logo">A</div>
          <div>
            <strong>Admin</strong>
            <span>Aaron&apos;s Soccer Academy</span>
          </div>
        </div>
        <nav className="admin-sidebar__nav" aria-label="Dashboard navigation">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              className={activeView === id ? "admin-nav-item admin-nav-item--active" : "admin-nav-item"}
              key={id}
              type="button"
              onClick={() => changeView(id)}
            >
              <Icon size={17} />
              {label}
              {activeView === id && <ChevronRight className="admin-nav-item__arrow" size={15} />}
            </button>
          ))}
        </nav>
        <button className="admin-sidebar__logout" type="button" onClick={async () => { try { await signOut(); toast.success("You have been logged out."); router.push("/login"); router.refresh(); } catch { toast.error("Unable to log out. Please try again."); } }}>
          <LogOut size={16} />
          Logout
        </button>
      </aside>

      <section className="admin-dashboard__content">
        <header className="admin-topbar">
          <div>
            <p className="admin-topbar__eyebrow">Welcome back, Admin</p>
            <h1>{activeView === "dashboard" ? "Dashboard" : activeView === "registrations" ? "Player Registrations" : activeView === "contacts" ? "Contact Messages" : "Settings"}</h1>
          </div>
          <div className="admin-topbar__actions">
            <Link className="admin-home-button" href="/">Back to Home</Link>
            <button className="admin-theme-button" type="button" onClick={() => setDarkMode((mode) => !mode)} aria-label={darkMode ? "Use light mode" : "Use dark mode"}>
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <div className="admin-topbar__profile">
              <span>Admin</span>
              <span className="admin-topbar__avatar"><UserRound size={16} /></span>
            </div>
          </div>
        </header>

        {activeView === "dashboard" && (
          <DashboardHome onViewRegistrations={() => changeView("registrations")} />
        )}
        {activeView === "registrations" && <RegistrationsView />}
        {activeView === "contacts" && <ContactsView />}
        {activeView === "settings" && <SettingsView />}
      </section>
    </main>
  );
}

function DashboardHome({ onViewRegistrations }: { onViewRegistrations: () => void }) {
  return (
    <div className="admin-view">
      <div className="admin-stat-grid">
        <StatCard icon={ClipboardList} label="Total Registrations" value="24" tone="blue" />
        <StatCard icon={UsersRound} label="Category A" value="8" tone="purple" />
        <StatCard icon={UsersRound} label="Category B" value="10" tone="orange" />
        <StatCard icon={UsersRound} label="Category C" value="6" tone="green" />
      </div>
      <section className="admin-panel">
        <div className="admin-panel__heading">
          <div>
            <p className="admin-label">Overview</p>
            <h2>Recent registrations</h2>
          </div>
          <button className="admin-text-button" type="button" onClick={onViewRegistrations}>View all <ChevronRight size={15} /></button>
        </div>
        <RegistrationTable compact />
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, tone }: { icon: typeof ClipboardList; label: string; value: string; tone: string }) {
  return <article className={`admin-stat-card admin-stat-card--${tone}`}><span className="admin-stat-card__icon"><Icon size={19} /></span><div><p>{label}</p><strong>{value}</strong></div></article>;
}

function RegistrationsView() {
  return (
    <div className="admin-view">
      <section className="admin-panel">
        <div className="admin-panel__heading admin-panel__heading--stack-mobile">
          <div><p className="admin-label">Player records</p><h2>All registrations</h2></div>
          <div className="admin-table-tools"><label className="admin-search"><Search size={15} /><input aria-label="Search registrations" placeholder="Search by name, phone or category" /></label><button className="admin-filter" type="button">Filter</button></div>
        </div>
        <RegistrationTable />
      </section>
    </div>
  );
}

function ContactsView() {
  return (
    <div className="admin-view">
      <section className="admin-panel">
        <div className="admin-panel__heading">
          <div><p className="admin-label">Inbox</p><h2>Contact messages</h2></div>
          <span className="admin-inbox-count">3 messages</span>
        </div>
        <div className="admin-contact-list">
          {[
            { name: "Ifeoma Eze", email: "ifeoma.eze@example.com", subject: "Training enquiry", message: "I would like to know more about the next training session." },
            { name: "Michael Okafor", email: "michael.okafor@example.com", subject: "Registration question", message: "Please confirm the documents needed to register my son." },
            { name: "Ada Nnamani", email: "ada.nnamani@example.com", subject: "General enquiry", message: "Thank you for the work you are doing with the players." },
          ].map((contact) => (
            <article className="admin-contact-card" key={contact.email}>
              <span className="admin-contact-card__avatar"><UserRound size={18} /></span>
              <div className="admin-contact-card__body"><div className="admin-contact-card__top"><div><h3>{contact.name}</h3><span>{contact.email}</span></div><strong>{contact.subject}</strong></div><p>{contact.message}</p><a className="admin-mail-button" href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}><Mail size={14} /> Respond via email</a></div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function RegistrationTable({ compact = false }: { compact?: boolean }) {
  const rows = compact ? registrations.slice(0, 4) : registrations;
  return <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Player name</th><th>Category</th><th>Registration date</th><th>Parent/Guardian</th><th>Phone</th><th>Status</th><th>Action</th></tr></thead><tbody>{rows.map((registration) => <tr key={registration.name}><td data-label="Player name"><strong>{registration.name}</strong></td><td data-label="Category">{registration.category}</td><td data-label="Registration date">{registration.date}</td><td data-label="Parent/Guardian">{registration.parent}</td><td data-label="Phone">{registration.phone}</td><td data-label="Status"><span className={`admin-status admin-status--${registration.status.toLowerCase()}`}>{registration.status}</span></td><td data-label="Action"><a className="admin-mail-button" href={`mailto:${registration.email}?subject=Your Aaron's Soccer Academy registration`}><Mail size={13} /> Respond via email</a></td></tr>)}</tbody></table></div>;
}

function SettingsView() {
  return <div className="admin-view"><section className="admin-panel admin-settings"><div className="admin-panel__heading"><div><p className="admin-label">Administration</p><h2>Dashboard settings</h2></div></div><div className="admin-settings__grid"><label>Academy name<input defaultValue="Aaron's Soccer Academy" /></label><label>Admin email<input type="email" defaultValue="aaronsdevelopmentfoundation@gmail.com" /></label><label>Registration notifications<select defaultValue="enabled"><option value="enabled">Enabled</option><option value="disabled">Disabled</option></select></label><div className="admin-settings__notice"><ShieldCheck size={20} /><span><strong>Authentication coming later</strong><small>Connect this dashboard to your backend auth service when it is ready.</small></span></div></div><button className="admin-save-button" type="button">Save settings</button></section></div>;
}
