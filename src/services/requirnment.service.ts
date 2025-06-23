
import axios from "axios";

const API_URL = "http://localhost:5297/api/Requinment";


export class RequirementService {
  async getAllRequirements() {
    const res = await axios.get(API_URL);
    return res.data;
  }

  async getRequirementById(id: number) {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  }

  async addRequirement(requirement: any) {
    const res = await axios.post(API_URL, requirement);
    return res.data;
  }

  async updateRequirement(id: number, requirement: any) {
    const res = await axios.put(`${API_URL}/${id}`, requirement);
    return res.data;
  }

  async deleteRequirement(id: number) {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  }
}