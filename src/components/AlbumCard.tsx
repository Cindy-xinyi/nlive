"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GiCutDiamond } from "react-icons/gi";
import { FaPlay, FaPause } from "react-icons/fa";
import styles from "./AlbumCard.module.css";

const descriptions: Record<string, string> = {
  流行精選: "快來聽聽時下最流行的歌曲，讓你跟上潮流！",
  抒情推薦: "沉浸在深情旋律中，細細品味每一段回憶。",
  輕快推薦: "活力滿滿、輕快節奏，陪你展開美好一天。",
  放鬆音樂: "讓音樂溫柔包圍你，洗滌疲憊的身心靈。",
  健身節拍: "跟著節奏動起來，為你的運動注入更多動力！",
  夜晚放鬆: "夜深了，讓柔和音樂陪你進入夢鄉。",
};

type Props = {
  id: number;
  title: string;
  cover: string;
  category?: string;
  audio?: string;
};

export default function AlbumCard({
  id,
  title,
  cover,
  category,
  audio,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setIsFavorited(JSON.parse(stored).includes(id));
  }, [id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const stored = localStorage.getItem("favorites");
    let fams: number[] = stored ? JSON.parse(stored) : [];
    if (fams.includes(id)) fams = fams.filter((x) => x !== id);
    else fams.push(id);
    setIsFavorited(fams.includes(id));
    localStorage.setItem("favorites", JSON.stringify(fams));
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audioEl = audioRef.current;
    if (!audioEl) return;
    if (isPlaying) {
      audioEl.pause();
    } else {
      audioEl.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className={`${styles.cardContainer} ${isHovered ? styles.expanded : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPlaying(false);
        audioRef.current?.pause();
      }}
    >
      <div className={styles.imageWrapper}>
        <Image src={cover} alt={title} fill className={styles.albumImage} />

        {isHovered && (
          <>
            <button className={styles.favoriteButton} onClick={toggleFavorite}>
              <GiCutDiamond
                size={20}
                color={isFavorited ? "#ff4d4f" : "#fff"}
              />
            </button>

            {audio && (
              <>
                <button className={styles.playButton} onClick={toggleAudio}>
                  {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                </button>
                <audio ref={audioRef} src={audio} loop />
              </>
            )}
          </>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        {isHovered && (
          <>
            <p className={styles.category}>{category}</p>
            <p className={styles.description}>
              {category && descriptions[category] ? descriptions[category] : ""}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
