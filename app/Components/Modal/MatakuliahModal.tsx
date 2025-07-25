"use client";
import React, { useState, useEffect } from "react";

interface MatakuliahData {
  id?: string;
  kode_matakuliah: string;
  nama_matakuliah: string;
  sks: string;
  semester: string;
}

interface MatakuliahModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MatakuliahData) => void;
  editData?: MatakuliahData | null;
  mode: "add" | "edit";
}

export default function MatakuliahModal({
  isOpen,
  onClose,
  onSubmit,
  editData,
  mode,
}: MatakuliahModalProps) {
  const [formData, setFormData] = useState<MatakuliahData>({
    kode_matakuliah: "",
    nama_matakuliah: "",
    sks: "",
    semester: "",
  });

  useEffect(() => {
    if (mode === "edit" && editData) {
      setFormData({
        id: editData.id || "",
        kode_matakuliah: editData.kode_matakuliah || "",
        nama_matakuliah: editData.nama_matakuliah || "",
        sks: editData.sks || "",
        semester: editData.semester || "",
      });
    } else {
      setFormData({
        kode_matakuliah: "",
        nama_matakuliah: "",
        sks: "",
        semester: "",
      });
    }
  }, [mode, editData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
          {mode === "add" ? "Tambah Matakuliah" : "Edit Matakuliah"}
          {formData.nama_matakuliah && ` - ${formData.nama_matakuliah}`}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-2 mt-4">
          <div className="form-control">
            <label className="label">
              <span className="text-sm">Kode Matakuliah</span>
            </label>
            <input
              type="text"
              name="kode_matakuliah"
              value={formData.kode_matakuliah}
              onChange={handleChange}
              className="input input-bordered focus-within:outline-none focus-within:border-[#084279] w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="text-sm">Nama Matakuliah</span>
            </label>
            <input
              type="text"
              name="nama_matakuliah"
              value={formData.nama_matakuliah}
              onChange={handleChange}
              className="input input-bordered focus-within:outline-none focus-within:border-[#084279] w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label block">
              <span className="text-sm">SKS</span>
            </label>
            <select
              name="sks"
              value={formData.sks}
              onChange={handleChange}
              className="select w-full focus-within:outline-none focus-within:border-[#084279] select-bordered"
              required
            >
              <option value="">Pilih SKS</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="text-sm">Semester</span>
            </label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="select w-full focus-within:outline-none focus-within:border-[#084279] select-bordered"
              required
            >
              <option value="">Pilih Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem.toString()}>
                  {sem}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              {mode === "add" ? "Tambah" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
