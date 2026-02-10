"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Sprawdź czy flaga w localStorage istnieje
    const isAuth = localStorage.getItem("admin_authenticated") === "true";

    if (!isAuth) {
      // Jeśli nie ma autoryzacji, wyrzuć do ekranu logowania
      router.push("/admin");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  // Dopóki nie sprawdzimy uprawnień, nie wyświetlamy nic (lub loader)
  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}