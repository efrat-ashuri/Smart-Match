import axios from "axios";
import { getSession } from "../auth/auth.utils";
const API_URL = "http://localhost:5297/api/Candidate";

export class CandidateService {
  async getAllCandidates() {
    const res = await axios.get(API_URL);
    return res.data;
  }

  async getCandidateById(id: number) {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  }



async addCandidate(candidate: any) {
  const token = getSession();
  const res = await axios.post(API_URL, candidate, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
}
  async updateCandidate(id: number, candidate: any) {
    const res = await axios.put(`${API_URL}/${id}`, candidate);
    return res.data;
  }

  async deleteCandidate(id: number) {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  }
}