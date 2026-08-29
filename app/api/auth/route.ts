import { NextRequest, NextResponse } from "next/server";

// Starts the GitHub OAuth flow for Decap CMS (public/admin). Decap's github
// backend opens a popup to this route (config.yml's auth_endpoint); it must
// redirect to GitHub, which redirects back to /api/callback.
export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return new Response("GITHUB_OAUTH_CLIENT_ID is not set", { status: 500 });
  }

  const state = crypto.randomUUID();
  const redirectUri = new URL("/api/callback", request.nextUrl.origin).toString();

  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", "repo,user");
  authorizeUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set("decap_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });
  return response;
}
