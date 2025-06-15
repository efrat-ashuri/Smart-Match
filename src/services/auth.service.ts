export const login = async (name: string, password: string, role: string) => {
  const response = await fetch("/api/login/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password, role }),
  });

  if (!response.ok) throw new Error("Login failed");
  return response.text();
};


// const url = 'Login'

// export const login = async (userName: string, password: string) => {
//     const response = await axios.post<string>(url + '/login', { userName, password })
//     return response.data
// }

// export const signUp = async () => {

// }


// export const login = async (name: string, password: string): Promise<string> => {
//   const response = await fetch("http://localhost:3001/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name, password }),
//   });

//   if (!response.ok) {
//     throw new Error("Login failed");
//   }

//   const data = await response.json();
//   return data.token;
// };
