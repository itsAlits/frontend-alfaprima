import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface DosenData {
  id: number;
  name: string;
  email: string;
  nim_nip: string;
  phone_number: string;
  address: string;
  birth_date: string;
  gender: string;
  religion: string;
}

const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  }
  return null;
};

const getAuthHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const dosenService = {
  async getAllDosen(): Promise<DosenData[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/dosen`, {
        headers: getAuthHeaders(),
      });

      return Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data.user];
    } catch (error: any) {
      console.error("Error fetching dosen:", error);
      if (error.response?.status === 401) {
        throw new Error("Unauthenticated. Please login again.");
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch dosen data"
      );
    }
  },
};
