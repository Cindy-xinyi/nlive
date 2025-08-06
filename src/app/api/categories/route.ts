// src/app/api/categories/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const categories = [
    { id: "流行精選", name: "流行精選" },
    { id: "抒情推薦", name: "抒情推薦" },
    { id: "輕快推薦", name: "輕快推薦" },
    { id: "放鬆音樂", name: "放鬆音樂" },
    { id: "健身節拍", name: "健身節拍" },
    { id: "夜晚放鬆", name: "夜晚放鬆" },
  ];
  return NextResponse.json(categories);
}
