import http from "./httpService";

const apiUrl = process.env.REACT_APP_API_URI;
const registerUrl = apiUrl + "/users";
const deleteUserUrl = id => apiUrl + `/users/${id}`;

export function register(user) {
  return http.post(registerUrl, {
    email: user.username,
    name: user.name,
    password: user.password
  });
}

export function deleteUser(id) {
  http.delete(deleteUserUrl(id));
}

export function getUser() {
  return http.get(registerUrl + "/me");
}
