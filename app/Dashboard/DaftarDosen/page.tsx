"use client";
import Table from "@/app/Components/Table/Table";
import { dosenService, DosenData } from "@/app/services/dosenService";
import React, { useEffect, useState } from "react";

export default function page() {
  const [profileData, setProfileData] = useState<DosenData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      setLoading(true);
      const data = await dosenService.getAllDosen();
      setProfileData(data);
      setError(null);
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      setError(error.message || "Failed to fetch data");
      if (error.message?.includes("Unauthenticated")) {
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div className=" bg-white p-4 border-t-3 rounded border-[#084279]">
        <h1 className="text-md ">Daftar Dosen </h1>
      </div>
      <div className="mt-2">
        {loading ? (
          <div className="text-center mt-20">
            <span className="loading loading-spinner"></span>
          </div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <Table data={profileData} />
        )}
      </div>
    </main>
  );
}
