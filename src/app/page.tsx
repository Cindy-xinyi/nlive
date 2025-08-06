"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "./page.module.css";
import Link from "next/link";

export default function HomePage() {
  const animatedRef = useRef<HTMLElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false); // ← 加這個避免 hydration 不一致

  useEffect(() => {
    const el = animatedRef.current;
    if (!el) return;

    const onScroll = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.8) {
        el.classList.add(styles.visible);
        setHasScrolled(true); // ← 只更新一次，避免多餘 re-render
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // 初次執行一次

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>NLive 音樂宇宙</h1>
            <p className={styles.heroSubtitle}>探索你的專屬旋律</p>
            <Link href="/categories" className={styles.heroButton}>
              前往分類
            </Link>
          </div>
        </section>

        {/* ✅ 加條件確保只在 client render 時顯示效果 */}
        <section
          ref={animatedRef}
          className={`${styles.featuresSection} ${
            hasScrolled ? styles.visible : ""
          }`}
        >
          <div className={styles.featureItem}>
            <span>🎧</span>
            <h3>極簡介面</h3>
          </div>
          <div className={styles.featureItem}>
            <span>⚡</span>
            <h3>即時串流</h3>
          </div>
          <div className={styles.featureItem}>
            <span>🔊</span>
            <h3>高品質音效</h3>
          </div>
          <div className={styles.featureItem}>
            <span>💡</span>
            <h3>情緒感知</h3>
          </div>
        </section>

        <section className={styles.gradientSection}></section>
      </main>
    </>
  );
}
