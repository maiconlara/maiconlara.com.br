import { NextResponse } from "next/server";
import { getGithubStats } from "@/lib/github";

export const revalidate = 3600;

export async function GET() {
  const stats = await getGithubStats();
  if (!stats) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub stats" },
      { status: 502 }
    );
  }
  return NextResponse.json(stats, {
    headers: {
      "Cache-Control":
        "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
