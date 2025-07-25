import React from "react";

export default function Table({ data }: { data: any[] }) {
  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr className="text-[#084279]">
              <th>NIP</th>
              <th>Nama</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item?.id || index}>
                  <td>{item?.nim_nip || "-"}</td>
                  <td>{item?.name || "-"}</td>
                  <td>{item?.address || "-"}</td>
                  <td>{item?.email || "-"}</td>
                  <td>{item?.phone_number || "-"}</td>
                  <td>{item?.gender || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
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
