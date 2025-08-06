"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import AlbumCard from "../../components/AlbumCard";
import { albums } from "../../data/albums";
import styles from "./page.module.css";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const favoriteAlbums = albums.filter((a) => favorites.includes(a.id));

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        {favoriteAlbums.length === 0 ? (
          <p className={styles.emptyMsg}>目前尚無收藏，快去探索你的最愛！</p>
        ) : (
          <div className={styles.grid}>
            {favoriteAlbums.map((album) => (
              <AlbumCard
                key={album.id}
                id={album.id}
                title={album.title}
                cover={album.cover}
                category={album.category}
                audio={album.audio}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
