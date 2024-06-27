"use server";

export async function themDonVi(payload: any) {
  const response = await fetch(`https://ca2einv.nacencomm.vn/api/don-vi`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjZTgxNDNhOS04MGQzLTRkYWMtYjU3Yy00NDRjYTMyMDQ1NjYiLCJpZCI6IjI4MDc4IiwiZnVsbF9uYW1lIjoiQWRtaW4gTkNNIiwidXNlcm5hbWUiOiJhZG1pbiIsImRvbnZpX21hX2R2IjoiMDEwMzkzMDI3OS05OTkiLCJleHAiOjE3MTk3ODUwMTAsImlzcyI6ImhvYWRvbjIwMjRfdGVzdC5uYWNlbmNvbW0udm4iLCJhdWQiOiJob2Fkb24yMDI0X3Rlc3QubmFjZW5jb21tLnZuIn0.u6P3AdqkoVrMKY3obYVAazP9jyhJCiBAZEfH_gSmGgs`,
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  return result;
}

export async function themtaikhoan(payload: any) {
  const response = await fetch(`https://ca2einv.nacencomm.vn/api/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjZTgxNDNhOS04MGQzLTRkYWMtYjU3Yy00NDRjYTMyMDQ1NjYiLCJpZCI6IjI4MDc4IiwiZnVsbF9uYW1lIjoiQWRtaW4gTkNNIiwidXNlcm5hbWUiOiJhZG1pbiIsImRvbnZpX21hX2R2IjoiMDEwMzkzMDI3OS05OTkiLCJleHAiOjE3MTk3ODUwMTAsImlzcyI6ImhvYWRvbjIwMjRfdGVzdC5uYWNlbmNvbW0udm4iLCJhdWQiOiJob2Fkb24yMDI0X3Rlc3QubmFjZW5jb21tLnZuIn0.u6P3AdqkoVrMKY3obYVAazP9jyhJCiBAZEfH_gSmGgs`,
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  return result;
}
