import http from "../services/httpService";

const apiUrl = process.env.REACT_APP_API_URI;
const commentUrl = apiUrl + "/comments";

export async function saveComment(comment) {
  return await http.post(commentUrl, comment);
}

export async function getComments() {
  return await http.get(commentUrl);
}

export async function deleteComment(id) {
  await http.delete(commentUrl + `/${id}`);
}
