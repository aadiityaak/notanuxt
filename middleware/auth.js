export default function ({ $axios, redirect }) {
  const token = localStorage.getItem("token");

  if (token) {
    $axios.setToken(token);
  } else {
    redirect("/login");
  }
}
