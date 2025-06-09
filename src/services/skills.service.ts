import axios from "axios";

const API_URL = "http://localhost:5297/api/Skill";

export class SkillService {
  async getAllSkills() {
    const res = await axios.get(API_URL);
    return res.data;
  }

  async getSkillById(id: number) {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  }

  async addSkill(skill: any) {
    const res = await axios.post(API_URL, skill);
    return res.data;
  }

  async updateSkill(id: number, skill: any) {
    const res = await axios.put(`${API_URL}/${id}`, skill);
    return res.data;
  }

  async deleteSkill(id: number) {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  }
}