export const login = async (name: string, password: string, role: string) => {
  const response = await fetch("/api/login/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      password,
      role // שימוש ב-role שהתקבל כפרמטר
    }),
  });
  
  if (!response.ok) throw new Error("Login failed");
  const data = await response.json();
  
  // שמירת סוג המשתמש ב-localStorage
  localStorage.setItem('userRole', role);
  
  return data;
};