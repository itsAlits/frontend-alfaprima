"use client";
import KelasTable from "@/app/Components/Table/KelasTable";
import KelasModal from "@/app/Components/Modal/KelasModal";
import {
  kelasService,
  KelasData as ServiceKelasData,
} from "@/app/services/kelasService";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Use the service KelasData type throughout this component
type KelasData = ServiceKelasData;

export default function Page() {
  const [kelasData, setKelasData] = useState<KelasData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<KelasData | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setRole(user.role.name);
      }
      fetchKelasData();
      if (!storedUser) {
        window.location.href = "/";
        return;
      }
    } catch (error) {
      console.error("Error checking user:", error);
    }
  }, []);

  const fetchKelasData = async () => {
    try {
      setLoading(true);
      const data = await kelasService.getAllKelas();
      console.log("Fetched Kelas Data:", data);
      setKelasData(data);
    } catch (error) {
      console.error("Error fetching kelas data:", error);
      toast.error("Gagal memuat data kelas!");
      setKelasData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddKelas = () => {
    setModalMode("add");
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleEditKelas = (item: KelasData) => {
    setModalMode("edit");
    setEditData(item);
    setIsModalOpen(true);
  };

  const handleDeleteKelas = async (id: string | number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kelas ini?")) {
      try {
        await kelasService.deleteKelas(String(id));
        toast.success("Kelas berhasil dihapus!");
        await fetchKelasData();
      } catch (error) {
        console.error("Error deleting kelas:", error);
        toast.error("Gagal menghapus kelas!");
      }
    }
  };

  const handleSubmit = async (data: KelasData) => {
    try {
      if (modalMode === "add") {
        await kelasService.createKelas(data);
        toast.success("Kelas berhasil ditambahkan!");
      } else if (editData?.id) {
        await kelasService.updateKelas(editData.id, data);
        toast.success("Kelas berhasil diperbarui!");
      }
      await fetchKelasData();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting kelas:", error);
      toast.error("Gagal menyimpan kelas!");
    }
  };

  return (
    <main>
      <ToastContainer />
      <div className="bg-white p-4 border-t-3 rounded border-[#084279]">
        <div className="flex justify-between items-center">
          <h1 className="text-md">Daftar Kelas</h1>
          {role === "Dosen" ? (
            <button className="btn btn-primary btn-sm" onClick={handleAddKelas}>
              Tambah Kelas
            </button>
          ) : (
            <> </>
          )}
        </div>
      </div>
      <div className="mt-2">
        {loading ? (
          <div className="flex justify-center p-4">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : (
          <KelasTable
            data={kelasData}
            onEdit={handleEditKelas}
            onDelete={handleDeleteKelas}
          />
        )}
      </div>

      <KelasModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        editData={editData}
        mode={modalMode}
      />
    </main>
  );
}
