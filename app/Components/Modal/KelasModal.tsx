"use client";
import React, { useState, useEffect } from "react";
import { KelasData } from "@/app/services/kelasService";
import {
  matakuliahService,
  MatakuliahData,
} from "@/app/services/matakuliahService";
import { dosenService } from "@/app/services/dosenService";

interface DosenData {
  id: number;
  name: string;
}

interface KelasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: KelasData) => Promise<void>;
  editData?: KelasData | null;
  mode: "add" | "edit";
}

export default function KelasModal({
  isOpen,
  onClose,
  onSubmit,
  editData,
  mode,
}: KelasModalProps) {
  const [formData, setFormData] = useState<Partial<KelasData>>({
    matakuliah_id: "",
    user_id: "",
    tahun_ajaran: "",
    nama_kelas: "",
  });

  const [matakuliahList, setMatakuliahList] = useState<MatakuliahData[]>([]);
  const [dosenList, setDosenList] = useState<DosenData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const matakuliahData = await matakuliahService.getAllMatakuliah();
      const dosenData = await dosenService.getAllDosen();

      setMatakuliahList(matakuliahData);
      setDosenList(dosenData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mode === "edit" && editData) {
      setFormData({
        id: editData.id || "",
        matakuliah_id: editData.matakuliah_id || "",
        user_id: editData.user_id || "",
        tahun_ajaran: editData.tahun_ajaran || "",
        nama_kelas: editData.nama_kelas || "",
      });
    } else {
      setFormData({
        matakuliah_id: "",
        user_id: "",
        tahun_ajaran: "",
        nama_kelas: "",
      });
    }
  }, [mode, editData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as KelasData);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-medium text-lg">
          {mode === "add" ? "Tambah Kelas" : "Edit Kelas"}
          {formData.nama_kelas && ` - ${formData.nama_kelas}`}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-2 mt-4">
          <div className="form-control">
            <label className="label">
              <span className="text-sm">Matakuliah</span>
            </label>
            <select
              name="matakuliah_id"
              value={formData.matakuliah_id}
              onChange={handleChange}
              className="select select-bordered focus-within:outline-none focus-within:border-[#084279] w-full"
              required
              disabled={loading}
            >
              <option value="">Pilih Matakuliah</option>
              {matakuliahList.map((mk) => (
                <option key={mk.id} value={mk.id}>
                  {mk.kode_matakuliah} - {mk.nama_matakuliah}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="text-sm">Dosen Pengampu</span>
            </label>
            <select
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              className="select select-bordered focus-within:outline-none focus-within:border-[#084279] w-full"
              required
              disabled={loading}
            >
              <option value="">Pilih Dosen</option>
              {Array.isArray(dosenList) &&
                dosenList.map((dosen) => (
                  <option key={dosen.id} value={dosen.id}>
                    {dosen.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="text-sm">Tahun Ajaran</span>
            </label>
            <input
              type="text"
              name="tahun_ajaran"
              value={formData.tahun_ajaran}
              onChange={handleChange}
              className="input input-bordered focus-within:outline-none focus-within:border-[#084279] w-full"
              placeholder="2024-2025"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="text-sm">Nama Kelas</span>
            </label>
            <input
              type="text"
              name="nama_kelas"
              value={formData.nama_kelas}
              onChange={handleChange}
              className="input input-bordered focus-within:outline-none focus-within:border-[#084279] w-full"
              placeholder="Pemrograman Web A"
              required
            />
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Batal
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Loading..." : mode === "add" ? "Tambah" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
