"use client";

import { useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import styles from "./page.module.css";

export default function ProfilePage() {
  const [avatarPreview, setAvatarPreview] = useState("/avatars/default.jpg");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.container}>
      <Navbar />

      <div className={styles.banner}>
        <h1 className={styles.title}>個人設定</h1>
      </div>

      <main className={styles.main}>
        <div className={styles.avatarSection}>
          <Image
            src={avatarPreview}
            alt="Avatar"
            width={150}
            height={150}
            className={styles.avatar}
            onClick={handleAvatarClick}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            ref={fileInputRef}
            className={styles.hiddenInput}
          />
        </div>

        <div className={styles.infoSection}>
          <h2 className={styles.sectionTitle}>我的帳戶</h2>
          <p className={styles.sectionContent}>用戶名稱：MeowUser123</p>
          <p className={styles.sectionContent}>Email：meow@example.com</p>
        </div>

        <div className={styles.infoSection}>
          <h2 className={styles.sectionTitle}>會員資格</h2>
          <p className={styles.sectionContent}>階級：一般會員</p>
          <p className={styles.sectionContent}>共享帳戶：無</p>
        </div>
      </main>
    </div>
  );
}
