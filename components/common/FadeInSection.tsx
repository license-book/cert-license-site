"use client";

import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function FadeInSection({
  children,
  className = "",
  delay = 0,
}: Props) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    // 목차 hash 이동으로 이미 화면 안에 들어온 섹션은 즉시 노출합니다.
    const rect = element.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        // 공부전략처럼 모바일에서 화면보다 훨씬 긴 섹션은 높은 threshold를
        // 충족하지 못해 계속 opacity-0 상태로 남을 수 있습니다.
        // 아주 작은 교차만 발생해도 바로 노출되도록 합니다.
        threshold: 0.01,
        rootMargin: "80px 0px 80px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={[
        "transition-all duration-700 ease-out",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-5 opacity-0",
        className,
      ].join(" ")}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
