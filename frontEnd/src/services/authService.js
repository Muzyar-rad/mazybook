import http from "../services/httpService";
import jwtDecode from "jwt-decode";

const apiUrl = process.env.REACT_APP_API_URI;
const loginUrl = apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(user) {
  const { data: jwt } = await http.post(loginUrl, {
    email: user.username,
    password: user.password
  });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt
};
