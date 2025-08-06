"use client";

import Navbar from "../../components/Navbar";
import Row from "../../components/Row";
import { albums } from "../../data/albums";

const fixedCategories = [
  "流行精選",
  "抒情推薦",
  "輕快推薦",
  "放鬆音樂",
  "健身節拍",
  "夜晚放鬆",
];

export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#000", color: "#fff", padding: "20px 0" }}>
        {fixedCategories.map((category) => (
          <Row
            key={category}
            title={category}
            albums={albums.filter((a) => a.category === category)}
          />
        ))}
      </main>
    </>
  );
}
