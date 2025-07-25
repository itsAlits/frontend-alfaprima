"use client";
import Table from "@/app/Components/Table/MatkulTable";
import MatakuliahModal from "@/app/Components/Modal/MatakuliahModal";
import {
  matakuliahService,
  MatakuliahData,
} from "@/app/services/matakuliahService";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function page() {
  interface User {
    role: {
      name: string;
    };
  }

  const [user, setUser] = useState<User | null>(null);
  const [matakuliahData, setMatakuliahData] = useState<MatakuliahData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editData, setEditData] = useState<MatakuliahData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      fetchMatakuliah();
    } else {
      setUser(null);
      setError("User not found. Please login.");
      setLoading(false);
    }
  }, []);

  async function fetchMatakuliah() {
    try {
      setLoading(true);
      const data = await matakuliahService.getAllMatakuliah();
      setMatakuliahData(data);
      setError(null);
    } catch (error: any) {
      console.error("Error fetching matakuliah:", error);
      setError(error.message || "Failed to fetch data");
      if (error.message?.includes("Unauthenticated")) {
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  }

  async function createMatakuliah(matakuliahData: Omit<MatakuliahData, "id">) {
    try {
      await matakuliahService.createMatakuliah(matakuliahData);
      toast.success("Matakuliah created successfully!");
      fetchMatakuliah();
    } catch (error: any) {
      console.error("Error creating matakuliah:", error);
      toast.error(error.message || "Failed to create matakuliah");
    }
  }

  async function editMatakuliah(
    id: string,
    matakuliahData: Partial<MatakuliahData>
  ) {
    try {
      await matakuliahService.updateMatakuliah(id, matakuliahData);
      toast.success("Matakuliah edited successfully!");
      fetchMatakuliah();
    } catch (error: any) {
      console.error("Error editing matakuliah:", error);
      toast.error(error.message || "Failed to edit matakuliah");
    }
  }

  async function deleteMatakuliah(id: string) {
    try {
      await matakuliahService.deleteMatakuliah(id);
      toast.success("Matakuliah deleted successfully!");
      fetchMatakuliah();
    } catch (error: any) {
      console.error("Error deleting matakuliah:", error);
      toast.error(error.message || "Failed to delete matakuliah");
    }
  }

  const handleAddMatakuliah = () => {
    setModalMode("add");
    setEditData(null);
    setModalOpen(true);
  };

  const handleEditMatakuliah = (id: string, data: any) => {
    setModalMode("edit");
    setEditData(data);
    setModalOpen(true);
  };

  const handleModalSubmit = (data: MatakuliahData) => {
    if (modalMode === "add") {
      createMatakuliah(data);
    } else {
      editMatakuliah(editData?.id || "", data);
    }
  };

  return (
    <main>
      <ToastContainer />
      <div className="bg-white p-4 border-t-3 rounded border-[#084279] flex justify-between items-center">
        <h1 className="text-md">Daftar Matakuliah</h1>
        {user?.role.name === "Dosen" && (
          <button
            className="btn btn-primary btn-sm"
            onClick={handleAddMatakuliah}
          >
            Tambah Matakuliah
          </button>
        )}
      </div>

      <div className="mt-2">
        {loading ? (
          <div className="text-center mt-20">
            <span className="loading loading-spinner"></span>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center mt-10">Error: {error}</div>
        ) : (
          <Table
            data={matakuliahData}
            canEdit={user?.role.name === "Dosen"}
            onEdit={handleEditMatakuliah}
            onDelete={deleteMatakuliah}
          />
        )}
      </div>

      <MatakuliahModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        editData={editData}
        mode={modalMode}
      />
    </main>
  );
}
