"use client";

import {
  ArrowLeft,
  ChevronRight,
  ClipboardList,
  Contact,
  Eye,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../lib/api-client";
import { getSession, signOut, type AuthSession } from "../../lib/auth-client";

type View = "dashboard" | "registrations" | "registration-details" | "contacts" | "users" | "settings";
type Registration = {
  id: string;
  fullName: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  category: string;
  createdAt: string;
  playerPhone?: string | null;
  parentName: string;
  parentPhone: string;
  occupation?: string | null;
  address: string;
  healthStatus?: string | null;
  indemnityName?: string | null;
  attestationName?: string | null;
  indemnityAccepted?: boolean;
  attestationAccepted?: boolean;
  signature?: string | null;
  signatureDate?: string | null;
  status: string;
};
type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};
type DashboardData = {
  totals: { registrations: number; contacts: number; users: number };
  categories: Record<string, number>;
  recentRegistrations: Registration[];
};
type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string;
};

const navItems: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "registrations", label: "Registrations", icon: ClipboardList },
  { id: "contacts", label: "Contact messages", icon: Contact },
  { id: "users", label: "Users", icon: UsersRound },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
  useEffect(() => {
    (async () => {
      try {
        const currentSession = await getSession();
        if (!currentSession) {
          router.replace("/login?error=auth-required");
          return;
        }
        setSession(currentSession);
      } catch {
        router.replace("/login?error=auth-required");
      }
    })();
  }, [router]);

  const queryOptions = {
    enabled: Boolean(session),
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
  };
  const dashboardQuery = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: () => apiRequest<DashboardData>("/admin/dashboard"),
    ...queryOptions,
  });
  const registrationsQuery = useQuery({
    queryKey: ["admin-registrations"],
    queryFn: () => apiRequest<Registration[]>("/admin/registrations"),
    ...queryOptions,
  });
  const contactsQuery = useQuery({
    queryKey: ["admin-contacts"],
    queryFn: () => apiRequest<ContactMessage[]>("/admin/contacts"),
    ...queryOptions,
  });
  const usersQuery = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => apiRequest<AdminUser[]>("/admin/users"),
    ...queryOptions,
  });

  const changeView = (view: View) => {
    setActiveView(view);
    setSidebarOpen(false);
  };
  const requestLogout = () => {
    setProfileOpen(false);
    setLogoutOpen(true);
  };
  const confirmLogout = async () => {
    setLoggingOut(true);
    try {
      await Promise.race([
        signOut(),
        new Promise<void>((_, reject) => {
          window.setTimeout(() => reject(new Error("Logout request timed out. Please try again.")), 8000);
        }),
      ]);
      setLogoutOpen(false);
      router.push("/login");
      router.refresh();
    } catch (error) {
      setLogoutOpen(false);
      toast.error(error instanceof Error ? error.message : "Unable to log out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };
  const userName = session?.user.name ?? "Admin";
  const title =
    activeView === "dashboard"
      ? "Dashboard"
      : activeView === "registrations"
        ? "Player Registrations"
          : activeView === "registration-details"
            ? "Registration Details"
        : activeView === "contacts"
          ? "Contact Messages"
          : activeView === "users"
            ? "Users"
            : "Settings";

  return (
    <main className="admin-dashboard">
      <button
        className={`admin-dashboard__mobile-menu ${sidebarOpen ? "admin-dashboard__mobile-menu--hidden" : ""}`}
        type="button"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open dashboard menu"
      >
        <Menu size={21} />
      </button>
      <aside
        className={`admin-sidebar ${sidebarOpen ? "admin-sidebar--open" : ""}`}
      >
        <button
          className="admin-sidebar__close"
          type="button"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close dashboard menu"
        >
          <X size={21} />
        </button>
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
              className={
                activeView === id
                  ? "admin-nav-item admin-nav-item--active"
                  : "admin-nav-item"
              }
              key={id}
              type="button"
              onClick={() => changeView(id)}
            >
              <Icon size={17} />
              {label}
              {activeView === id && (
                <ChevronRight className="admin-nav-item__arrow" size={15} />
              )}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar__tools">
          <Link
            className="admin-sidebar__home"
            href="/"
            onClick={() => setSidebarOpen(false)}
          >
            Back to Home
          </Link>
          <button
            className="admin-sidebar__theme"
            type="button"
            onClick={() => setDarkMode((mode) => !mode)}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}{" "}
            {darkMode ? "Light mode" : "Dark mode"}
          </button>
        </div>
        <button
          className="admin-sidebar__logout"
          type="button"
          onClick={requestLogout}
        >
          <LogOut size={16} />
          Logout
        </button>
      </aside>
      <section className="admin-dashboard__content">
        <header className="admin-topbar">
          <div>
            <p className="admin-topbar__eyebrow">Welcome back, {userName}</p>
            <h1>{title}</h1>
          </div>
          <div className="admin-topbar__actions">
            <Link className="admin-home-button" href="/">
              Back to Home
            </Link>
            <button
              className="admin-theme-button"
              type="button"
              onClick={() => setDarkMode((mode) => !mode)}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <div className="admin-profile-menu">
              <button
                className="admin-topbar__profile"
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                aria-expanded={profileOpen}
                aria-haspopup="menu"
              >
                <span>{userName}</span>
                <span className="admin-topbar__avatar">
                  <UserRound size={16} />
                </span>
              </button>
              {profileOpen && (
                <div className="admin-profile-dropdown" role="menu">
                  <div className="admin-profile-dropdown__info">
                    <strong>{userName}</strong>
                    <span>{session?.user.email}</span>
                  </div>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={requestLogout}
                  >
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        {!session ||
        dashboardQuery.isLoading ||
        registrationsQuery.isLoading ||
        contactsQuery.isLoading ||
        usersQuery.isLoading ? (
          <div
            className="page-loader admin-content-loader"
            role="status"
            aria-label="Loading dashboard"
          >
            <div className="page-loader__ball" aria-hidden="true">
              ⚽
            </div>
            <span className="page-loader__text">Loading dashboard...</span>
          </div>
        ) : dashboardQuery.error ? (
          <div className="admin-view">
            <section className="admin-panel">
              <h2>Unable to load dashboard data.</h2>
            </section>
          </div>
        ) : (
          <>
            {activeView === "dashboard" && (
              <DashboardHome
                data={dashboardQuery.data!}
                onViewRegistrations={() => changeView("registrations")}
                onViewDetails={(registration) => { setSelectedRegistration(registration); setActiveView("registration-details"); }}
              />
            )}
            {activeView === "registrations" && (
              <RegistrationsView
                registrations={registrationsQuery.data ?? []}
                onViewDetails={(registration) => { setSelectedRegistration(registration); setActiveView("registration-details"); }}
              />
            )}
            {activeView === "registration-details" && selectedRegistration && (
              <RegistrationDetailsView registration={selectedRegistration} onBack={() => setActiveView("registrations")} />
            )}
            {activeView === "contacts" && (
              <ContactsView contacts={contactsQuery.data ?? []} />
            )}
            {activeView === "users" && (
              <UsersView users={usersQuery.data ?? []} />
            )}
            {activeView === "settings" && (
              <SettingsView session={session} setSession={setSession} onLogout={requestLogout} />
            )}
          </>
        )}
      </section>
      {logoutOpen && <LogoutConfirmModal loading={loggingOut} onCancel={() => setLogoutOpen(false)} onConfirm={confirmLogout} />}
    </main>
  );
}

function DashboardHome({
  data,
  onViewRegistrations,
  onViewDetails,
}: {
  data: DashboardData;
  onViewRegistrations: () => void;
  onViewDetails: (registration: Registration) => void;
}) {
  return (
    <div className="admin-view">
      <div className="admin-stat-grid">
        <StatCard
          icon={ClipboardList}
          label="Total Registrations"
          value={data.totals.registrations}
          tone="blue"
        />
        <StatCard
          icon={UsersRound}
          label="Category A"
          value={data.categories["Category A"] ?? 0}
          tone="purple"
        />
        <StatCard
          icon={UsersRound}
          label="Category B"
          value={data.categories["Category B"] ?? 0}
          tone="orange"
        />
        <StatCard
          icon={UsersRound}
          label="Category C"
          value={data.categories["Category C"] ?? 0}
          tone="green"
        />
      </div>
      <section className="admin-panel">
        <div className="admin-panel__heading">
          <div>
            <p className="admin-label">Overview</p>
            <h2>Recent registrations</h2>
          </div>
          <button
            className="admin-text-button"
            type="button"
            onClick={onViewRegistrations}
          >
            View all <ChevronRight size={15} />
          </button>
        </div>
        <RegistrationTable registrations={data.recentRegistrations} compact onViewDetails={onViewDetails} />
      </section>
    </div>
  );
}
function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof ClipboardList;
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <article className={`admin-stat-card admin-stat-card--${tone}`}>
      <span className="admin-stat-card__icon">
        <Icon size={19} />
      </span>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </article>
  );
}
function RegistrationsView({
  registrations,
  onViewDetails,
}: {
  registrations: Registration[];
  onViewDetails: (registration: Registration) => void;
}) {
  return (
    <div className="admin-view">
      <section className="admin-panel">
        <div className="admin-panel__heading admin-panel__heading--stack-mobile">
          <div>
            <p className="admin-label">Player records</p>
            <h2>All registrations</h2>
          </div>
          <label className="admin-search">
            <Search size={15} />
            <input
              aria-label="Search registrations"
              placeholder="Search registrations"
            />
          </label>
        </div>
        <RegistrationTable registrations={registrations} onViewDetails={onViewDetails} />
      </section>
    </div>
  );
}
function RegistrationTable({
  registrations,
  compact = false,
  onViewDetails,
}: {
  registrations: Registration[];
  compact?: boolean;
  onViewDetails: (registration: Registration) => void;
}) {
  const rows = compact ? registrations.slice(0, 4) : registrations;
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Player name</th>
            <th>Category</th>
            <th>Registration date</th>
            <th>Parent/Guardian</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((registration) => (
              <tr key={registration.id}>
                <td data-label="Player name">
                  <strong>{registration.fullName}</strong>
                </td>
                <td data-label="Category">{registration.category}</td>
                <td data-label="Registration date">
                  {new Date(registration.createdAt).toLocaleDateString()}
                </td>
                <td data-label="Parent/Guardian">{registration.parentName}</td>
                <td data-label="Phone">{registration.parentPhone}</td>
                <td data-label="Status">
                  <span
                    className={`admin-status admin-status--${registration.status.toLowerCase()}`}
                  >
                    {registration.status}
                  </span>
                </td>
                <td data-label="Details">
                  <RegistrationDetailsButton registration={registration} onClick={() => onViewDetails(registration)} />
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RegistrationDetailsButton({ registration, onClick }: { registration: Registration; onClick: () => void }) {
  return (
    <button className="admin-view-details-button" type="button" onClick={onClick}>
      <Eye size={14} /> View
    </button>
  );
}

function RegistrationDetailsView({ registration, onBack }: { registration: Registration; onBack: () => void }) {
  const date = (value?: string | null) => value ? new Date(value).toLocaleDateString() : "Not provided";
  const text = (value?: string | null) => value?.trim() || "Not provided";

  return (
    <div className="admin-view admin-registration-details-view">
      <button className="admin-details-back-button" type="button" onClick={onBack}><ArrowLeft size={15} /> Back to registrations</button>
      <div className="admin-details-page__heading">
        <div><p className="admin-label">Player registration</p><h1>{registration.fullName}</h1><p>Complete registration record and declaration details.</p></div>
        <span className="admin-status admin-status--new"><Eye size={13} /> {registration.status}</span>
      </div>
      <DetailsSection icon={<UserRound size={17} />} title="Player information">
        <Detail label="Full name" value={registration.fullName} /><Detail label="Date of birth" value={date(registration.dateOfBirth)} /><Detail label="Age" value={registration.age} /><Detail label="Gender" value={registration.gender} /><Detail label="Category" value={registration.category} /><Detail label="Player phone" value={text(registration.playerPhone)} />
      </DetailsSection>
      <DetailsSection icon={<UserRound size={17} />} title="Parent / guardian information">
        <Detail label="Name" value={registration.parentName} /><Detail label="Phone" value={registration.parentPhone} /><Detail label="Occupation" value={text(registration.occupation)} /><Detail label="Contact address" value={registration.address} wide /><Detail label="Health status" value={text(registration.healthStatus)} wide />
      </DetailsSection>
      <DetailsSection icon={<ClipboardList size={17} />} title="Indemnity and attestation">
        <Detail label="Indemnity declaration name" value={text(registration.indemnityName)} /><Detail label="Indemnity accepted" value={registration.indemnityAccepted ? "Yes" : "No"} /><Detail label="Attestation declaration name" value={text(registration.attestationName)} /><Detail label="Attestation accepted" value={registration.attestationAccepted ? "Yes" : "No"} />
      </DetailsSection>
      <DetailsSection icon={<ClipboardList size={17} />} title="Signature and record">
        <Detail label="Signature" value={text(registration.signature)} /><Detail label="Signature date" value={date(registration.signatureDate)} /><Detail label="Submitted" value={date(registration.createdAt)} /><Detail label="Status" value={registration.status} />
      </DetailsSection>
    </div>
  );
}

function DetailsSection({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return <section className="admin-details-section"><h2>{icon}{title}</h2><div className="admin-details-grid">{children}</div></section>;
}

function Detail({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return <div className={`admin-detail${wide ? " admin-detail--wide" : ""}`}><span>{label}</span><strong>{value}</strong></div>;
}

function ContactsView({ contacts }: { contacts: ContactMessage[] }) {
  return (
    <div className="admin-view">
      <section className="admin-panel">
        <div className="admin-panel__heading">
          <div>
            <p className="admin-label">Inbox</p>
            <h2>Contact messages</h2>
          </div>
          <span className="admin-inbox-count">{contacts.length} messages</span>
        </div>
        <div className="admin-contact-list">
          {contacts.map((contact) => (
            <article className="admin-contact-card" key={contact.id}>
              <span className="admin-contact-card__avatar">
                <UserRound size={18} />
              </span>
              <div className="admin-contact-card__body">
                <div className="admin-contact-card__top">
                  <div>
                    <h3>{contact.name}</h3>
                    <span>{contact.email}</span>
                  </div>
                  <strong>{contact.subject}</strong>
                </div>
                <p>{contact.message}</p>
                <a
                  className="admin-mail-button"
                  href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}
                >
                  <Mail size={14} /> Respond via email
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
function UsersView({ users }: { users: AdminUser[] }) {
  const queryClient = useQueryClient();
  const roleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: "USER" | "ADMIN" }) =>
      apiRequest<AdminUser>(`/admin/users/${id}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role }),
      }),
    onSuccess: (updated) => {
      queryClient.setQueryData<AdminUser[]>(["admin-users"], (current) =>
        current?.map((user) => (user.id === updated.id ? updated : user)),
      );
      toast.success("User role updated.");
    },
    onError: (error) =>
      toast.error(
        error instanceof Error ? error.message : "Unable to update role.",
      ),
  });
  return (
    <div className="admin-view">
      <section className="admin-panel">
        <div className="admin-panel__heading">
          <div>
            <p className="admin-label">Accounts</p>
            <h2>All users</h2>
          </div>
          <span className="admin-inbox-count">{users.length} users</span>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td data-label="Name">
                    <strong>{user.name}</strong>
                  </td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Joined">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td data-label="Role">
                    <select
                      value={user.role}
                      disabled={roleMutation.isPending}
                      onChange={(event) =>
                        roleMutation.mutate({
                          id: user.id,
                          role: event.target.value as "USER" | "ADMIN",
                        })
                      }
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
function LogoutConfirmModal({
  loading,
  onCancel,
  onConfirm,
}: {
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="admin-logout-modal" style={{ position: "fixed", inset: 0, zIndex: 9999, display: "grid", placeItems: "center", padding: 20, background: "rgba(5, 18, 42, 0.58)" }} role="presentation" onClick={onCancel}>
      <section className="admin-logout-modal__card" style={{ width: "min(390px, 100%)", border: "1px solid #e0e7f1", borderRadius: 12, padding: "28px 24px 22px", background: "white", textAlign: "center", boxShadow: "0 24px 70px rgba(4, 19, 48, 0.28)" }} role="dialog" aria-modal="true" aria-labelledby="logout-title" onClick={(event) => event.stopPropagation()}>
        <div className="admin-logout-modal__icon" style={{ display: "grid", placeItems: "center", width: 42, height: 42, margin: "0 auto 14px", borderRadius: "50%", color: "#f0192d", background: "#fff0f1" }}><LogOut size={20} /></div>
        <h2 id="logout-title" style={{ margin: 0, color: "#132342", fontSize: "1.15rem" }}>Log out?</h2>
        <p style={{ margin: "9px auto 22px", color: "#75849a", fontSize: "0.78rem", lineHeight: 1.5 }}>Are you sure you want to log out of the admin dashboard?</p>
        <div className="admin-logout-modal__actions" style={{ display: "flex", justifyContent: "center", gap: 9 }}>
          <button className="admin-logout-modal__cancel" style={{ minWidth: 105, border: "1px solid #d8e2ee", borderRadius: 6, padding: "10px 13px", color: "#52657f", background: "white", fontSize: "0.7rem", fontWeight: 800, cursor: "pointer" }} type="button" onClick={onCancel} disabled={loading}>Cancel</button>
          <button className="admin-logout-modal__confirm" style={{ minWidth: 105, border: "1px solid #f0192d", borderRadius: 6, padding: "10px 13px", color: "white", background: "#f0192d", fontSize: "0.7rem", fontWeight: 800, cursor: "pointer" }} type="button" onClick={onConfirm} disabled={loading}>{loading ? "Logging out..." : "Yes, log out"}</button>
        </div>
      </section>
    </div>,
    document.body,
  );
}

function SettingsView({
  session,
  setSession,
  onLogout,
}: {
  session: AuthSession | null;
  setSession: (session: AuthSession) => void;
  onLogout: () => void;
}) {
  const [name, setName] = useState(session?.user.name ?? "");
  const [saving, setSaving] = useState(false);
  const saveName = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      const updated = await apiRequest<{ name: string }>("/admin/me", {
        method: "PATCH",
        body: JSON.stringify({ name }),
      });
      setSession({
        ...session!,
        user: { ...session!.user, name: updated.name },
      });
      toast.success("Name updated.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to update name.",
      );
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="admin-view">
      <section className="admin-panel admin-settings">
        <div className="admin-panel__heading">
          <div>
            <p className="admin-label">Administration</p>
            <h2>Account settings</h2>
          </div>
        </div>
        <form className="admin-settings__form" onSubmit={saveName}>
          <label>
            Admin name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
          <p className="admin-settings__email">Email: {session?.user.email}</p>
          <button className="admin-save-button" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save name"}
          </button>
        </form>
        <button
          className="admin-logout-button"
          type="button"
          onClick={onLogout}
        >
          <LogOut size={15} /> Logout
        </button>
      </section>
    </div>
  );
}
