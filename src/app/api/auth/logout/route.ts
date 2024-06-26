import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();
  const force = res.force as boolean | undefined;
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `access_token=; Path=/; HttpOnly; SameSite=Lax; Secure`
  );
  headers.append(
    "Set-Cookie",
    `refresh_token=; Path=/; HttpOnly; SameSite=Lax; Secure`
  );
  if (force) {
    return Response.json(
      {
        message: "Buộc đăng xuất thành công",
      },
      {
        status: 200,
        headers: headers,
      }
    );
  }
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");
  if (!accessToken) {
    return Response.json(
      { message: "Không nhận được access token" },
      {
        status: 401,
      }
    );
  } else {
    return Response.json(
      {
        message: "Đăng xuất thành công",
      },
      {
        status: 200,
        headers: headers,
      }
    );
  }
}
