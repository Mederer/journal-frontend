export function setToken(token: string) {
  if (typeof window !== "undefined") {
    return localStorage.setItem("token", token);
  }
  return null;
}

export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
}

export function removeToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
}

export async function validateToken() {
  const token = getToken();

  if (!token) {
    return undefined;
  }

  const res = await fetch("http://localhost:5000/auth/validate_token", {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const jsonRes = await res.json();
    const { id, firstname, lastname, email } = jsonRes.user;
    return { id, firstname, lastname, email };
  }
  return undefined;
}
