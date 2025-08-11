// src/app/logout/page.tsx
"use client";

import Link from "next/link";
import styles from "./logout.module.css";

export default function LogoutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <p className={styles.message}>你已經成功登出</p>
        <Link href="/" className={styles.link}>
          回到首頁
        </Link>
      </div>
    </div>
  );
}
