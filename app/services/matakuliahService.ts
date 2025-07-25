import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface MatakuliahData {
  id?: string;
  kode_matakuliah: string;
  nama_matakuliah: string;
  sks: string;
  semester: string;
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

export const matakuliahService = {
  async getAllMatakuliah(): Promise<MatakuliahData[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/matakuliah`, {
        headers: getAuthHeaders(),
      });

      return Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];
    } catch (error: any) {
      console.error("Error fetching matakuliah:", error);
      if (error.response?.status === 401) {
        throw new Error("Unauthenticated. Please login again.");
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch matakuliah data"
      );
    }
  },

  async createMatakuliah(
    matakuliahData: Omit<MatakuliahData, "id">
  ): Promise<void> {
    try {
      await axios.post(`${API_BASE_URL}/matakuliah`, matakuliahData, {
        headers: getAuthHeaders(),
      });
    } catch (error: any) {
      console.error("Error creating matakuliah:", error);
      if (error.response?.status === 401) {
        throw new Error("Unauthenticated. Please login again.");
      }
      throw new Error(
        error.response?.data?.message || "Failed to create matakuliah"
      );
    }
  },

  async updateMatakuliah(
    id: string,
    matakuliahData: Partial<MatakuliahData>
  ): Promise<void> {
    try {
      await axios.put(`${API_BASE_URL}/matakuliah/${id}`, matakuliahData, {
        headers: getAuthHeaders(),
      });
    } catch (error: any) {
      console.error("Error updating matakuliah:", error);
      if (error.response?.status === 401) {
        throw new Error("Unauthenticated. Please login again.");
      }
      throw new Error(
        error.response?.data?.message || "Failed to update matakuliah"
      );
    }
  },

  async deleteMatakuliah(id: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/matakuliah/${id}`, {
        headers: getAuthHeaders(),
      });
    } catch (error: any) {
      console.error("Error deleting matakuliah:", error);
      if (error.response?.status === 401) {
        throw new Error("Unauthenticated. Please login again.");
      }
      throw new Error(
        error.response?.data?.message || "Failed to delete matakuliah"
      );
    }
  },
};
