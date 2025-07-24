"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function EditProfile() {
  interface ProfileData {
    id: number;
    name: string;
    email: string;
    nim_nip: string;
    phone_number: string;
    address: string;
    birth_date: string;
    gender: string;
    religion: string;
    profile_picture: string;
  }

  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setProfileData(response.data.data.user);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  async function updateProfile() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8000/api/users/${profileData?.id}`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Profile updated:", response.data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  }

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    if (profileData) {
      setProfileData({ ...profileData, [field]: value });
    }
  };

  return (
    <div className="mt-4 p-4 border-t-3 border-t-[#084279] border border-base-300">
      <ToastContainer />
      <div className="flex gap-3">
        <div className="w-full">
          <label htmlFor="" className="text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            className="input input-bordered focus-within:outline-none focus-within:border-[#084279] w-full mt-1"
            placeholder="Enter your name"
            value={profileData?.name || ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <div className="w-full">
          <label htmlFor="" className="text-sm font-medium">
            Email
          </label>
          <input
            type="text"
            className="input input-bordered focus-within:outline-none focus-within:border-[#084279] w-full mt-1"
            placeholder="Enter your email"
            value={profileData?.email || ""}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-3 mt-3">
        <div className="w-full">
          <label htmlFor="" className="text-sm font-medium">
            Phone Number
          </label>
          <input
            type="text"
            className="input input-bordered focus-within:outline-none focus-within:border-[#084279] w-full mt-1"
            placeholder="Enter your phone number"
            value={profileData?.phone_number || ""}
            onChange={(e) => handleInputChange("phone_number", e.target.value)}
          />
        </div>
        <div className="w-full">
          <label htmlFor="" className="text-sm font-medium">
            Address
          </label>
          <input
            type="text"
            className="input input-bordered focus-within:outline-none focus-within:border-[#084279] w-full mt-1"
            placeholder="Enter your address"
            value={profileData?.address || ""}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-3 mt-3">
        <div className="w-full">
          <label htmlFor="" className="text-sm font-medium">
            Gender
          </label>
          <input
            type="text"
            className="input input-bordered focus-within:outline-none focus-within:border-[#084279] w-full mt-1"
            placeholder="Enter your gender"
            value={profileData?.gender || ""}
            onChange={(e) => handleInputChange("gender", e.target.value)}
          />
        </div>
        <div className="w-full">
          <label htmlFor="" className="text-sm font-medium block">
            Religion
          </label>
          <select
            name="religion"
            className="select mt-2 focus-within:outline-none focus-within:border-[#084279] w-full"
            value={profileData?.religion || ""}
            onChange={(e) => handleInputChange("religion", e.target.value)}
          >
            <option value="">{profileData?.religion}</option>
            <option value="Islam">Islam</option>
            <option value="Kristen">Kristen</option>
            <option value="Katolik">Katolik</option>
            <option value="Hindu">Hindu</option>
            <option value="Buddha">Buddha</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>
      </div>
      <div className="mt-3">
        <div className="w-full">
          <label htmlFor="" className="text-sm font-medium">
            Image_Url
          </label>
          <input
            type="text"
            className="input input-bordered focus-within:outline-none focus-within:border-[#084279] w-full mt-1"
            placeholder="Enter your image URL"
            value={profileData?.profile_picture || ""}
            onChange={(e) =>
              handleInputChange("profile_picture", e.target.value)
            }
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={updateProfile}
          className="btn rounded bg-[#084279] text-white hover:bg-[#063760] px-6"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
