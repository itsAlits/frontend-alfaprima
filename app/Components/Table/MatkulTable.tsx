import React from "react";

interface TableProps {
  data: any[];
  canEdit?: boolean;
  onEdit?: (id: string, data: any) => void;
  onDelete?: (id: string, data: any) => void;
}

export default function Table({
  data,
  canEdit = false,
  onEdit,
  onDelete,
}: TableProps) {
  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr className="text-[#084279]">
              <th>Kode Matakuliah</th>
              <th>Nama Matakuliah</th>
              <th>SKS Matakuliah</th>
              <th>Semester</th>
              {canEdit && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item?.id || index}>
                  <td>{item?.kode_matakuliah || "-"}</td>
                  <td>{item?.nama_matakuliah || "-"}</td>
                  <td>{item?.sks || "-"}</td>
                  <td>{item?.semester || "-"}</td>
                  {canEdit && (
                    <td>
                      <div className="flex gap-2">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => onEdit?.(item.id, item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm"
                          onClick={() => onDelete?.(item.id, item)}
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
                <td colSpan={canEdit ? 5 : 4} className="text-center">
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
