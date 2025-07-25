import React, { useEffect } from "react";
import { KelasData } from "@/app/services/kelasService";

interface KelasTableProps {
  data: KelasData[];
  onEdit?: (item: KelasData) => void;
  onDelete?: (id: string | number) => void;
}

export default function KelasTable({
  data,
  onEdit,
  onDelete,
}: KelasTableProps) {
  const [currentRole, setCurrentRole] = React.useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentRole(user.role.name);
    }
  }, []);

  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr className="text-[#084279]">
              <th>ID</th>
              <th>Nama Kelas</th>
              <th>Matakuliah</th>
              <th>Dosen Pengampu</th>
              <th>Tahun Ajaran</th>
              {currentRole === "Dosen" && <th>Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item?.id || index}>
                  <td>{item?.id || "-"}</td>
                  <td>{item?.nama_kelas || "-"}</td>
                  <td>{item?.matakuliah?.nama_matakuliah || "-"}</td>
                  <td>{item?.user?.name || "-"}</td>
                  <td>{item?.tahun_ajaran || "-"}</td>
                  {currentRole === "Dosen" && (
                    <td>
                      <div className="flex gap-2">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => onEdit && onEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm"
                          onClick={() => onDelete && onDelete(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
