"use client";

import { useAuth } from "@/components/auth";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  if (role && user.role !== role) {
    if (typeof window !== "undefined") {
      window.location.href = "/unauthorized";
    }
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
