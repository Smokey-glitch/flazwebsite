import { NextRequest, NextResponse } from "next/server";

// Completes the GitHub OAuth flow for Decap CMS. Exchanges the code for a
// token server-side, then runs Decap's documented postMessage handshake so
// the admin window (public/admin) picks up the token from this popup.
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const cookieState = request.cookies.get("decap_oauth_state")?.value;

  if (!code || !state || !cookieState || state !== cookieState) {
    return htmlError("Invalid or missing OAuth state");
  }

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return htmlError("OAuth is not configured");
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: new URL("/api/callback", request.nextUrl.origin).toString(),
    }),
  });
  const tokenJson = await tokenRes.json();

  if (!tokenRes.ok || tokenJson.error || !tokenJson.access_token) {
    return htmlError(tokenJson.error_description ?? "GitHub token exchange failed");
  }

  const payload = JSON.stringify({ token: tokenJson.access_token, provider: "github" }).replace(
    /</g,
    "\\u003c"
  );

  const html = `<!doctype html><html><body><script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(
      'authorization:github:success:${payload}',
      e.origin
    );
    window.removeEventListener('message', receiveMessage, false);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script></body></html>`;

  const response = new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
  response.cookies.delete("decap_oauth_state");
  return response;
}

function htmlError(message: string) {
  return new NextResponse(`<p>Auth error: ${message}</p>`, {
    status: 400,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
