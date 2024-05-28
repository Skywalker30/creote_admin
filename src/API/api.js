import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function verifyLogout({ email }) {
  const response = await api.post("/api/dashboard-logout", { email });

  if (response.data.status) {
    console.log(response.data.message);
    return response.data;
  } else {
    console.log(response.data.message);
  }
}

export default async function verifyLogin({ email, password }) {
  const response = await api.post("/api/dashboard-login", { email, password });

  if (response.data.status) {
    console.log(response.data.message);
    console.log(response.data.data);
    return response.data;
  } else {
    alert(response.data.message);
  }
}
