import { NextResponse } from "next/server";
import { getFeaturedRepos } from "@/lib/github";

export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limitParam = Number(searchParams.get("limit"));
  const limit =
    Number.isFinite(limitParam) && limitParam > 0 && limitParam <= 24
      ? limitParam
      : 6;

  const repos = await getFeaturedRepos(limit);
  if (!repos) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub repos" },
      { status: 502 }
    );
  }
  return NextResponse.json(repos, {
    headers: {
      "Cache-Control":
        "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
