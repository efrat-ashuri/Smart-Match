import axios from "axios";

const API_URL = "http://localhost:5297/api/Job";

export class JobService {
  async getAllJobs() {
    const res = await axios.get(API_URL);
    return res.data;
  }

  async getJobById(id: number) {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  }

  async addJob(job: any) {
    const res = await axios.post(API_URL, job);
    return res.data;
  }

  async updateJob(id: number, job: any) {
    const res = await axios.put(`${API_URL}/${id}`, job);
    return res.data;
  }

  async deleteJob(id: number) {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  }
}