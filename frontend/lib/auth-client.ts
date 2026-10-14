type AuthResponse<T> = {
  data?: T;
  error?: { message?: string };
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

export type AuthSession = {
  user: AuthUser;
  session: {
    id: string;
    expiresAt: string;
  };
};

async function authRequest<T>(path: string, init?: RequestInit) {
  const response = await fetch(`/api/auth${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const payload = (await response.json().catch(() => ({}))) as AuthResponse<T>;
  if (!response.ok || payload.error) {
    throw new Error(payload.error?.message ?? "Authentication request failed");
  }

  return payload.data ?? (payload as T);
}

export function signIn(email: string, password: string) {
  return authRequest<AuthSession>("/sign-in/email", {
    method: "POST",
    body: JSON.stringify({ email, password, callbackURL: "/admin" }),
  });
}

export function signUp(name: string, email: string, password: string) {
  return authRequest<AuthSession>("/sign-up/email", {
    method: "POST",
    body: JSON.stringify({ name, email, password, callbackURL: "/login?registered=1" }),
  });
}

export function signOut() {
  return authRequest<void>("/sign-out", { method: "POST", body: "{}" });
}

export function getSession() {
  return authRequest<AuthSession | null>("/get-session", { method: "GET" });
}
