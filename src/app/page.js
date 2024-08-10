"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const location = usePathname();
  const router = useRouter();

  useEffect(() => {
    location === "/" && router.push("/login");
  }, [location]);

  return <></>;
}
