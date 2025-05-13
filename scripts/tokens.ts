import { encode, verify } from "@hig/jwt";

export async function generateToken() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  date.setHours(18, 0, 0, 0);
  const exp = Math.floor(date.getTime() / 1000);

  const payload = {
    id: `${year}${String(month + 1).padStart(2, "0")}${
      String(day).padStart(2, "0")
    }`,
    exp,
  };

  return await encode(payload, Deno.env.get("JWT_SECRET")!);
}

export async function verifyToken(token: string) {
  const result = await verify(token, Deno.env.get("JWT_SECRET")!);
  return result;
}
