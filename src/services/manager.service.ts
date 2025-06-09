import axios from "axios";

const API_URL = "http://localhost:5297/api/Manager";

export class ManagerService {
  async getAllManagers() {
    const res = await axios.get(API_URL);
    return res.data;
  }

  async getManagerById(id: number) {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  }

  async addManager(manager: any) {
    const res = await axios.post(API_URL, manager);
    return res.data;
  }

  async updateManager(id: number, manager: any) {
    const res = await axios.put(`${API_URL}/${id}`, manager);
    return res.data;
  }

  async deleteManager(id: number) {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  }
}