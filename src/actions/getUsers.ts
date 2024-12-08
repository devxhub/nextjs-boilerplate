async function getUsers() {
  return fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json());
}

export { getUsers };
