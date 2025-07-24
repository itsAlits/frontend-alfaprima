"use client";

import { Menu, Power } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Nav({
  onMenuToggle,
  isSidebarOpen,
}: {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}) {
  interface ProfileData {
    name: string;
    role: {
      name: string;
      [key: string]: any;
    };
  }

  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setProfileData(JSON.parse(localStorage.getItem("user") || "{}"));
    }
    profile();
  }, []);

  async function profile() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      setProfileData(response.data.data.user);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  async function logout() {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <nav
      id="nav"
      className={`bg-[#0b59a1] ${
        isSidebarOpen ? "ps-64" : "ps-4"
      } text-white py-4 transition-all fixed top-0 w-full duration-300`}
    >
      <div>
        <div className="flex justify-between items-center pe-4">
          <button
            className="text-white hover:text-gray-300 cursor-pointer"
            onClick={onMenuToggle}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center">
            <h1 className="text-sm ms-2">
              {profileData?.name}
              {profileData?.role.name && ` (${profileData.role.name})`}
            </h1>
            <button
              className="ms-4 p-2 border rounded curspor-pointer bg-[#0b59a1] text-white hover:text-gray-300"
              onClick={logout}
            >
              <Power className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
