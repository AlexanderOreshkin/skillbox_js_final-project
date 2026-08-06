export async function getData() {
  const response = await fetch("./data/data.json", {
    method: "GET",
    headers: {
      email: "oreshkin.alexander@gmail.com",
    },
  });

  const data = await response.json();
  return data;
}