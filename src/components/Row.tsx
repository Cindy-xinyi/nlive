"use client";

import { useEffect, useRef } from "react";
import AlbumCard from "./AlbumCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./Row.module.css";

type Album = { id: number; title: string; cover: string; category: string };
type Props = { title: string; albums: Album[] };

export default function Row({ title, albums }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 🔁 處理假循環：前後各複製幾張卡
  const cloned = [
    ...albums.slice(-3), // 最後 3 張接到最前面
    ...albums,
    ...albums.slice(0, 3), // 前 3 張接到最後面
  ];

  // 📏 每張卡片寬度含 gap
  const CARD_WIDTH = 220 + 20;

  useEffect(() => {
    // 🚩 初始化時直接滾到真正內容的開始（跳過前面的 clone）
    scrollRef.current?.scrollTo({ left: CARD_WIDTH * 3 });
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const maxScroll = CARD_WIDTH * (albums.length + 3); // total - 3
    const current = scrollRef.current.scrollLeft;

    // ⬅️ 滑到前面的 clone
    if (current <= CARD_WIDTH * 2) {
      scrollRef.current.scrollTo({
        left: CARD_WIDTH * (albums.length + 2),
        behavior: "auto",
      });
    }

    // ➡️ 滑到後面的 clone
    if (current >= maxScroll) {
      scrollRef.current.scrollTo({
        left: CARD_WIDTH * 3,
        behavior: "auto",
      });
    }
  };

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -CARD_WIDTH : CARD_WIDTH,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.rowWrapper}>
      <h2 className={styles.rowTitle}>{title}</h2>

      <button
        onClick={() => scroll("left")}
        className={`${styles.arrowButton} ${styles.arrowLeft}`}
      >
        <FaChevronLeft color="#fff" />
      </button>

      <div
        className={styles.scrollContainer}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {cloned.map((a, idx) => (
          <AlbumCard key={`${a.id}-${idx}`} {...a} />
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className={`${styles.arrowButton} ${styles.arrowRight}`}
      >
        <FaChevronRight color="#fff" />
      </button>
    </div>
  );
}
