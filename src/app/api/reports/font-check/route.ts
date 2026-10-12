import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const FONT_DIR = path.join(process.cwd(), "src", "assets", "fonts");
const FILES = [
  "NotoSans-Regular.ttf",
  "NotoSans-Bold.ttf",
  "NotoSansDevanagari-Regular.ttf",
  "NotoSansDevanagari-Bold.ttf",
];

export async function GET() {
  const files = FILES.map((name) => {
    const file = path.join(FONT_DIR, name);
    return { name, bytes: fs.existsSync(file) ? fs.statSync(file).size : null };
  });
  return NextResponse.json({ ok: files.every((f) => f.bytes), files });
}
