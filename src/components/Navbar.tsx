"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaSearch, FaBell, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node))
        setShowSearch(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node))
        setShowNotif(false);
      if (userRef.current && !userRef.current.contains(e.target as Node))
        setShowUser(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    "[推薦通知] 新專輯《戀夏時光》已上架!!",
    "[系統通知]：系統已更新至最新版",
    "[留言通知]：小綠留言給你：「太讚了！」",
  ];

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        {/* 左側 */}
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            🎧 NLive
          </Link>
          <nav className={styles.navLinks}>
            <Link href="/">首頁</Link>
            <Link href="/categories">分類</Link>
            <Link href="/favorites">收藏</Link>
          </nav>
        </div>

        {/* 右側 */}
        <div className={styles.right}>
          {/* 搜尋 */}
          <div className={styles.iconWrapper} ref={searchRef}>
            <FaSearch
              className={styles.icon}
              onClick={() => {
                setShowSearch((v) => !v);
                setShowNotif(false);
                setShowUser(false);
              }}
            />
            {showSearch && (
              <div className={styles.searchBox}>
                <input
                  type="text"
                  placeholder="搜尋專輯、歌手…"
                  className={styles.searchInput}
                  autoFocus
                />
              </div>
            )}
          </div>

          {/* 通知 */}
          <div className={styles.iconWrapper} ref={notifRef}>
            <FaBell
              className={styles.icon}
              onClick={() => {
                setShowNotif((v) => !v);
                setShowSearch(false);
                setShowUser(false);
              }}
            />
            {showNotif && (
              <div className={styles.dropdown}>
                {notifications.map((msg, i) => (
                  <div key={i} className={styles.dropdownItem}>
                    {msg}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 使用者 */}
          <div className={styles.iconWrapper} ref={userRef}>
            <FaUserCircle
              className={styles.icon}
              onClick={() => {
                setShowUser((v) => !v);
                setShowSearch(false);
                setShowNotif(false);
              }}
            />
            {showUser && (
              <div className={styles.dropdown}>
                <Link
                  href="/profile"
                  className={`${styles.dropdownItem} ${styles.profileItem}`}
                >
                  <FaUserCircle className={styles.profileIcon} />
                  <span>個人資料</span>
                </Link>
                <Link
                  href="/logout"
                  className={`${styles.dropdownItem} ${styles.profileItem}`}
                >
                  <FaSignOutAlt className={styles.profileIcon} />
                  <span>登出</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
