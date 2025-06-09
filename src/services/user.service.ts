import axios from "axios";

const API_URL = "http://localhost:5297/api/Login";

export class UserService {
  async getAllUsers() {
    const res = await axios.get(API_URL);
    return res.data;
  }

  async getUserById(id: number) {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  }

  async addUser(user: any) {
    const res = await axios.post(API_URL, user);
    return res.data;
  }

  async login(userLogin: { name: string; password: string }) {
    const res = await axios.post(`${API_URL}/login`, userLogin, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  }

  async updateUser(id: number, user: any) {
    const res = await axios.put(`${API_URL}/${id}`, user);
    return res.data;
  }

  async deleteUser(id: number) {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  }
}
