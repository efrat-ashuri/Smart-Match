
export const managerLogin = async (name:string, password:string, role:string) => {
  const response = await fetch("/api/login/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name,
    password,
    role: "Manager" // או "candidate" לפי הצורך
  }),
});
  if (!response.ok) throw new Error("Login failed");
  return response.text();
};
