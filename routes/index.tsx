import { Handlers } from "$fresh/server.ts";
import { verifyToken } from "../scripts/tokens.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const t = url.searchParams.get("t");
    if (!t) {
      return new Response("Token is missing", { status: 400 });
    }

    // const result = await verifyToken(t);
    const result = "valid";
    if (result === "valid") {
      return await ctx.render();
    } else {
      return new Response("Invalid or expired token", { status: 401 });
    }
  },

  async POST(req, ctx) {
    const formData = await req.formData();
    const username = formData.get("username");

    return new Response(`Welcome, ${username}!`);
  },
};

export default function HomePage() {
  return (
    <form method="POST">
      <input type="text" name="username" placeholder="Username" />
      <button type="submit">Login</button>
    </form>
  );
}
