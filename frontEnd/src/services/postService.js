import http from "../services/httpService";

const apiUrl = process.env.REACT_APP_API_URI;
const postUrl = apiUrl + "/posts";

export async function savePost(fd) {
  return http.post(postUrl, fd);
}

export async function getPosts() {
  return http.get(postUrl);
}

export async function deletePost(id) {
  return http.delete(postUrl + `/${id}`);
}
