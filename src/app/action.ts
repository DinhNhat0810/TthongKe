"use server";

import { cookies } from "next/headers";

const access_token = cookies().get("access_token")?.value;

export async function themDonVi(payload: any) {
  "use server";

  const response = await fetch(`https://ca2einv.nacencomm.vn/api/don-vi`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json();

  return result;
}

export async function themtaikhoan(payload: any) {
  "use server";
  const response = await fetch(`https://ca2einv.nacencomm.vn/api/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  return result;
}

export async function daytokhai(payload: any) {
  ("use server");
  const response = await fetch(`https://ca2einv.nacencomm.vn/api/to-khai/ncm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  return result;
}

export async function login(payload: any) {
  ("use server");
  const response = await fetch(
    `https://ca2einv.nacencomm.vn/api/account/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  const result = await response.json();

  return result;
}
