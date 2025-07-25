import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface KelasData {
  id: number | string;
  nama_kelas: string;
  matakuliah_id?: number | string;
  user_id?: number | string;
  tahun_ajaran?: string;
  matakuliah?: {
    id?: number | string;
    kode_matakuliah?: string;
    nama_matakuliah?: string;
    semester?: number;
    sks?: number;
  };
  user?: {
    id?: number | string;
    name?: string;
  };
}

interface ApiResponse {
  success: boolean;
  data: KelasData[];
  message?: string;
}

class KelasService {
  // Add a getToken helper function
  private getToken(): string {
    try {
      const token = localStorage.getItem("token");
      return token || "";
    } catch (e) {
      console.error("Error accessing localStorage:", e);
      return "";
    }
  }

  private getAuthHeaders() {
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    try {
      const token = localStorage.getItem("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (e) {
      console.error("Error accessing localStorage:", e);
    }

    return headers;
  }

  async getAllKelas(): Promise<KelasData[]> {
    try {
      const token = this.getToken();
      const response = await axios.get(`${API_BASE_URL}/kelas`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log("Kelas API response:", response.data);

      const data = response.data;

      // Handle different API response formats
      if (data && data.success && Array.isArray(data.data)) {
        return data.data; // Return just the data array
      }

      // If the API directly returns an array
      if (Array.isArray(data)) {
        return data;
      }

      // Fallback to empty array
      console.error("Unexpected API response format:", data);
      return [];
    } catch (error: any) {
      console.error("Error in getAllKelas:", error);
      if (error.response?.status === 401) {
        throw new Error("Unauthenticated. Please login again.");
      }
      throw new Error("Failed to fetch kelas data");
    }
  }

  async createKelas(kelasData: Omit<KelasData, "id">): Promise<KelasData> {
    try {
      const token = this.getToken();
      const response = await axios.post(`${API_BASE_URL}/kelas`, kelasData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error creating kelas:", error);
      if (error.response?.status === 401) {
        throw new Error("Unauthenticated. Please login again.");
      }
      throw new Error(
        error.response?.data?.message || "Failed to create kelas"
      );
    }
  }

  async updateKelas(
    id: string | number,
    kelasData: Partial<KelasData>
  ): Promise<KelasData> {
    try {
      const token = this.getToken();
      const response = await axios.put(
        `${API_BASE_URL}/kelas/${id}`,
        kelasData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error updating kelas:", error);
      if (error.response?.status === 401) {
        throw new Error("Unauthenticated. Please login again.");
      }
      throw new Error(
        error.response?.data?.message || "Failed to update kelas"
      );
    }
  }

  async deleteKelas(id: string | number): Promise<void> {
    try {
      const token = this.getToken();
      await axios.delete(`${API_BASE_URL}/kelas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
    } catch (error: any) {
      console.error("Error deleting kelas:", error);
      if (error.response?.status === 401) {
        throw new Error("Unauthenticated. Please login again.");
      }
      throw new Error(
        error.response?.data?.message || "Failed to delete kelas"
      );
    }
  }
}

export const kelasService = new KelasService();
