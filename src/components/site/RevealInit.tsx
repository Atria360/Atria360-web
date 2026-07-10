"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Activates .reveal-item elements as they scroll into view.
export default function RevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".reveal-item").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add("is-revealed");
      } else {
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
