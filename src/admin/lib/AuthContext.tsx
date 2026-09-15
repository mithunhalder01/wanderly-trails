import { createContext, useContext, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";

export interface AdminUser {
  email: string;
  name: string;
  role: "owner" | "editor";
}

interface MeResponse {
  authDisabled: boolean;
  user: AdminUser;
}

interface AuthContextValue {
  user: AdminUser;
  authDisabled: boolean;
  isOwner: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/** Layout ke andar: login ho chuka hai tabhi yeh render hota hai (AdminApp gate karta hai). */
export function AuthProvider({ me, children }: { me: MeResponse; children: ReactNode }) {
  const qc = useQueryClient();
  const logout = async () => {
    await api.post("/api/admin/auth/logout");
    qc.clear();
    window.location.href = "/admin";
  };
  return (
    <AuthContext.Provider value={{ user: me.user, authDisabled: me.authDisabled, isOwner: me.user.role === "owner", logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export function useMe() {
  return useQuery({
    queryKey: ["admin", "me"],
    queryFn: () => api.get<MeResponse>("/api/admin/auth/me"),
    retry: false,
    staleTime: 60_000,
  });
}
