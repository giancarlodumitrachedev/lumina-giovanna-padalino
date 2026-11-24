"use client";

import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // In /admin nessun ritardo né animazione di transizione: risposta immediata al clic
  if (pathname?.startsWith("/admin")) {
    return <div className="w-full h-full">{children}</div>;
  }

  return (
    <div className="w-full h-full animate-in fade-in duration-150">
      {children}
    </div>
  );
}
